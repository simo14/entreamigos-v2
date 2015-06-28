"use strict";
angular.module("webapp").controller("actorcontroller", actorcontroller);
actorcontroller.$inject = [ "actorservice","ngDialog","sessionservice","$scope", "popup"];

function actorcontroller(actorservice,ngDialog,sessionservice,$scope, popup) {
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
    		popup.abrir("notLogged");
    		vm.actors = actorservice.getActors();
    	}
    }
}