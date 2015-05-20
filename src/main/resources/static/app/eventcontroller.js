angular.module("webapp").controller("eventcontroller", eventcontroller);

eventcontroller.$inject = ["ppservice", "$routeParams", "$location"];

function eventcontroller(ppservice, $routeParams, $location) {

	var vm = this;
	
	//View model properties
	
	vm.event = {};
		
	//Controller logic
	
	vm.event = ppservice.getEvent($routeParams.id);

	//Controller actions
	
};
