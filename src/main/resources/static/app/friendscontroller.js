"use strict";
angular.module("webapp").controller("friendscontroller", friendscontroller);
friendscontroller.$inject = [ "actorservice", "sessionservice", "$scope", "popup","$routeParams","$location" ];

function friendscontroller(actorservice, sessionservice, $scope,popup,$routeParams,$location) {
	var vm = this;
    
    //View model properties 
	vm.session = sessionservice.sdo;
    vm.friends = [];
	vm.actor = {};
	vm.friends = [];
	vm.sessionId = 0;
		
	//Controller logic
	if(!($location.path() === "/amigos")){
		vm.actor = actorservice.getActor($routeParams.id);
	}
    
    //Controller logic
	if (vm.session.isLogged){
			if(vm.session.isOrganization){
				vm.friends = actorservice.findCrew();
			}else{
				vm.friends = actorservice.findFriends();
			}
	}
	
	vm.beFriends = function () {
		if(sessionservice.sdo.isLogged){
			var yaesamigo = false;
			vm.friends.forEach(function (amigo){
				if(amigo.id == $routeParams.id){
					yaesamigo = true
				}
			});
			if(!yaesamigo){
				actorservice.beFriends($routeParams.id);
				popup.abrir("done");
				$location.path("/redirect/friends");
			}else{
				popup.abrir("error");
			}
		}else{
			popup.abrir("notLogged");
		}
	}
}
    