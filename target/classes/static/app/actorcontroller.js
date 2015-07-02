"use strict";
angular.module("webapp").controller("actorcontroller", actorcontroller);
actorcontroller.$inject = [ "actorservice","ngDialog","sessionservice","$scope", "popup"];

function actorcontroller(actorservice,ngDialog,sessionservice,$scope, popup) {
	var vm = this;
    
    //View model properties
    
    vm.actors = [];
    
    //Controller logic
    vm.actors = actorservice.getActors();
	
    vm.search = function (param) {
		if(param){
			vm.actors = actorservice.search(param);
    	}else{
    		vm.actors = actorservice.getActors();
    	}
    }
    
    vm.searchCategory = function (param) {
    	vm.actors = actorservice.search(param);
    }  
    
    vm.searchDistance = function (param) {
    	if(sessionservice.sdo.isLogged){
    		vm.actors = actorservice.searchLocation(param);
    	}else{
    		popup.abrir("notLogged");
    		vm.actors = actorservice.getActors();
    	}
    }
}