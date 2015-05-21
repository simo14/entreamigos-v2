"use strict";
angular.module("webapp").controller("actorcontroller", actorcontroller);
actorcontroller.$inject = [ "actorservice" ];

function actorcontroller(actorservice) {
	var vm = this;
    
    //View model properties
    
    vm.actors = [];
    vm.newActor = {};
    
    //Controller logic
    vm.actors = actorservice.getActors();
   
    //Controller actions
    vm.viewEvent = function(event) {
		$location.path("/person");
	};
	
    vm.search = function (param) {
		vm.actors = actorservice.search(param);
    }
}
