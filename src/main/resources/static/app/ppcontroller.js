angular.module("webapp").controller("ppcontroller", ppcontroller);
ppcontroller.$inject = [ "ppservice","$location","$routeParams","$scope","sessionservice","popup" ];

function ppcontroller(ppservice,$location,$routeParams,$scope,sessionservice,popup) {
	var vm = this;
    
    //View model properties
    
    vm.events = [];
    vm.hasLoggedOut = false;
    vm.newEvent = {};
    vm.session = sessionservice.sdo;
    vm.message = sessionservice.message;
    vm.event = {};

    vm.searchparam="";
    
    vm.DateSearch={};
    
    //Controller logic
    vm.events = ppservice.getEvents();
    vm.reload = function (param) {
    	$location.path("/redirect/param");
    }
	if(($location.path().includes("/event"))){
	    vm.event = ppservice.getEvent($routeParams.id);
	}
    
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
    	   if(absNewUrl === "http://localhost:8080/#/logout"){
    		   sessionservice.sdo.isLogged = false;
    		   sessionservice.sdo.username = "";
    		   sessionservice.logout();
    		   popup.abrir("done");
    	   }
    	});


   
    //Controller actions
    
	vm.join = function () {
		if(vm.session.isLogged){
			var yaparticipa = false;
			vm.event.attendees.forEach(function (asistente){
				if(asistente.id == sessionservice.user.user.$$state.value.id){		//es el id de la persona logueada
					console.log(asistente.id);
					console.log(sessionservice.user.user.$$state.value.id);
					yaparticipa = true;
				}
				console.log(yaparticipa);
			});

			if(!yaparticipa){
				vm.sessionId = ppservice.join($routeParams.id);			//routeparams.id es el id del evento
				popup.abrir("done");
			}else{
				popup.abrir("error");
			}
		}else {
			popup.abrir("notLogged");
		}
		$location.path("/redirect/events");
    }

    vm.searchDate = function(param){
    	vm.events = ppservice.searchDate(param.getTime());
    }
    
    vm.search = function (param) {
    	if(param){
    		vm.events = ppservice.search(param);
    	}else{
    		vm.events = ppservice.getEvents();
    	}
    }
    
    vm.searchCategory = function (param) {
    	vm.events = ppservice.searchCategory(param);
    }
    
    vm.freeEvents = function (param) {
    	if(param){
    		vm.events = ppservice.searchByPrize(0);
    	}else{
    		vm.events = ppservice.getEvents();
    	}
    }
    
    vm.searchDistance = function (param) {
    	if(sessionservice.sdo.isLogged){
    		vm.events = ppservice.searchByDistance(param);
    	}else{
    		popup.abrir("notLogged");
    		vm.events = ppservice.getEvents();
    	}
    }
    
    vm.addEvent = function(evt) {
    	if(sessionservice.sdo.isLogged){
			ppservice.newEvent(evt);
			vm.newEvent= {};
			$location.path("/redirect/events");
			popup.abrir("done");
    	} else {
    		popup.abrir("notLogged");
    	}
	}
}
