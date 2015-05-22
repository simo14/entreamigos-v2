"use strict";
angular.module("webapp").controller("ppcontroller", ppcontroller);
ppcontroller.$inject = [ "ppservice","$location","$routeParams" ];

function ppcontroller(ppservice,$location,$routeParams) {
	var vm = this;
    
    //View model properties
    
    vm.events = [];
    vm.newEvent = {};
    vm.event = {}
    vm.searchparam="";
    vm.evento = {}
    
    //Controller logic
    vm.events = ppservice.getEvents();
    vm.event = ppservice.getEvent($routeParams.id)
   
    //Controller actions
    vm.viewEvent = function(event) {
 
		$location.path("/event");
	};
    
    vm.search = function (param) {
    	vm.events = ppservice.search(param);
    }
    
    vm.searchCategory = function (param) {
    	vm.events = ppservice.searchCategory(param);
    }
    
    vm.addEvent = function(evt) {
		
		ppservice.newPersona(evt);
		
		vm.evento= {};
		
		$location.path("/gente");
	};
	function newEvent(newEvt) {
		new EventResource(newEvt).$save(function(post) {
			event.push(post);
			reload();
		});
	}
	/*
	  vm.search = ppservice.search({
    	   query: vm.searchparam  
    	}, function(result){}); */
}
