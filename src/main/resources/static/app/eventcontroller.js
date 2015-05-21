"use strict";
angular.module("webapp").controller("eventcontroller", eventcontroller);
ppcontroller.$inject = [ "ppservice","$location","$routeParams" ];

function eventcontroller(ppservice,$location,$routeParams) {
	var vm = this;
    
    //View model properties
	vm.event = {};
    vm.events = [];
    vm.newEvent = {};
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
    vm.event = ppservice.getEvent ($routeParam);
	/*
	  vm.search = ppservice.search({
    	   query: vm.searchparam  
    	}, function(result){}); */
}
