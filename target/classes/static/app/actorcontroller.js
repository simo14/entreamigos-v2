"use strict";
angular.module("webapp").controller("actorcontroller", actorcontroller);
actorcontroller.$inject = [ "actorservice","ngDialog","sessionservice"];

function actorcontroller(actorservice,ngDialog,sessionservice) {
	var vm = this;
    
    //View model properties
    
    vm.actors = [];
    vm.newActor = {};
    
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
    		vm.open("notLogged");
    		vm.actors = actorservice.getActors();
    	}
    }
    
    vm.open = function (mensaje) {
		ngDialog.open({
			template: mensaje,
			className: 'ngdialog-theme-default',
		});
	}
}