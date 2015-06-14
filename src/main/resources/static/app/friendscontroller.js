"use strict";
angular.module("webapp").controller("friendscontroller", friendscontroller);
friendscontroller.$inject = [ "actorservice" ];

function friendscontroller(actorservice) {
	var vm = this;
    
    //View model properties 
    vm.friends =[];
    
    //Controller logic
	vm.friends = actorservice.findFriends();
}
    