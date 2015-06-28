"use strict";
angular.module("webapp").controller("friendscontroller", friendscontroller);
friendscontroller.$inject = [ "actorservice", "sessionservice", "$scope", "popup" ];

function friendscontroller(actorservice, sessionservice, $scope,popup) {
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
	vm.session = sessionservice.sdo;
    vm.friends = [];
    
    //Controller logic
	if (vm.session.isLogged){
		if(vm.session.isOrganization){
			vm.friends = actorservice.findCrew();
		}else{
		vm.friends = actorservice.findFriends();
		}
	}
}
    