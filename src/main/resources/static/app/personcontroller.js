angular.module("webapp").controller("personcontroller", personcontroller)

personcontroller.$inject = ["actorservice", "sessionservice","$routeParams","$location","$scope","popup"];

function personcontroller(actorservice, sessionservice, $routeParams,$location,$scope,popup) {

	var vm = this;
	
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   sessionservice.sdo.isLogged = false;
 		   sessionservice.sdo.username = "";
 		   sessionservice.logout();
 		   popup.abrir("done");
 	   }
 	});
    
	
	//View model properties
	
	vm.actor = {};
	vm.friends = [];
	vm.sessionId = 0;
		
	//Controller logic
	
	vm.actor = actorservice.getActor($routeParams.id);


	//Controller actions
	vm.beFriends = function () {
		if(sessionservice.sdo.isLogged){
			actorservice.beFriends($routeParams.id);
			popup.abrir("done");
			$location.path("/redirect/friends");
		}else{
			popup.abrir("notLogged");
		}
	}
	vm.friends = function (param) {
		vm.actors = actorservice.findFriends(param);
    }

};