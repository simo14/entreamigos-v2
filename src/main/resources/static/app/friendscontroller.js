"use strict";
angular.module("webapp").controller("friendscontroller", friendscontroller);
friendscontroller.$inject = [ "actorservice", "sessionservice" ];

function friendscontroller(actorservice, sessionservice) {
	var vm = this;
    
    //View model properties 
	vm.session = sessionservice.sdo;
    vm.friends = [];
    
    //Controller logic
	if (vm.session.isLogged){
		vm.friends = actorservice.findFriends();
	}
}
    