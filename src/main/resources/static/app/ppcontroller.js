"use strict";
angular.module("webapp").controller("ppcontroller", ppcontroller);
ppcontroller.$inject = [ "ppservice","$location","$routeParams" ];

function ppcontroller(ppservice,$location,$routeParams) {
	var vm = this;
    
    //View model properties
    
    vm.events = [];
    vm.newEvent = {};

    vm.searchparam="";
    
    vm.DateSearch={};
    
    //Controller logic
    vm.events = ppservice.getEvents();
   
    //Controller actions
   /* vm.viewEvent = function(event) {
 
		$location.path("/event");
	};
    */
    vm.searchDate = function(param){
    	vm.events = ppservice.searchDate(param.getTime());
    }
    
    vm.search = function (param) {
    	vm.events = ppservice.search(param);
    }
    
    vm.searchCategory = function (param) {
    	vm.events = ppservice.searchCategory(param);
    }
    
    vm.freeEvents = function (param) {
    	vm.events = ppservice.searchByPrize(0);
    }
    
    vm.addEvent = function(evt) {
		
		ppservice.newEvent(evt).then(function(){
		
			vm.newEvent= {};
			
			$location.path("/");
		})
	};

	
	/*
	  vm.search = ppservice.search({
    	   query: vm.searchparam  
    	}, function(result){}); */
}
