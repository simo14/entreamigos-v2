angular.module("webapp").controller("ppcontroller", ppcontroller);
ppcontroller.$inject = [ "ppservice","$location","$routeParams","$scope","sessionservice","ngDialog" ];

function ppcontroller(ppservice,$location,$routeParams,$scope,sessionservice,ngDialog) {
	var vm = this;
    
    //View model properties
    
    vm.events = [];
    vm.hasLoggedOut = false;
    vm.newEvent = {};
    vm.session = sessionservice.sdo;
    vm.message = sessionservice.message;

    vm.searchparam="";
    
    vm.DateSearch={};
    
    //Controller logic
    vm.events = ppservice.getEvents();
    
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
    	   if(absNewUrl === "http://localhost:8080/#/logout"){
    		   sessionservice.sdo.isLogged = false;
    		   sessionservice.sdo.username = "";
    		   sessionservice.logout();
    		   vm.open("done");
    	   }
    	});


   
    //Controller actions
   /* vm.viewEvent = function(event) {
 
		$location.path("/event");
	};
    */
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
    		vm.open("notLogged");
    		vm.events = ppservice.getEvents();
    	}
    }
    
    vm.addEvent = function(evt) {
    	if(sessionservice.sdo.isLogged){
			ppservice.newEvent(evt).then(function(){
			
				vm.newEvent= {};
				
				$location.path("/");
			},function(){});
    	}
	};
	
	vm.open = function (mensaje) {
		console.log("deberia aparecer algo")
		ngDialog.open({
			template: mensaje,
			className: 'ngdialog-theme-default',
		});
	}

	
	/*
	  vm.search = ppservice.search({
    	   query: vm.searchparam  
    	}, function(result){}); */
}
