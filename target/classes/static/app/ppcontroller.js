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
    
    //Controller logic
    vm.events = ppservice.getEvents();
   
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
    vm.event = {}
    vm.event = ppservice.getEvent(2)
	/*
	  vm.search = ppservice.search({
    	   query: vm.searchparam  
    	}, function(result){}); */
}
