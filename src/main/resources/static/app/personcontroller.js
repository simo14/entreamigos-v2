angular.module("webapp").controller("personcontroller", personcontroller)

personcontroller.$inject = ["actorservice", "$routeParams"];

function personcontroller(actorservice, $routeParams) {

	var vm = this;
	
	//View model properties
	
	vm.actor = {};
	vm.sessionId = 0;
		
	//Controller logic
	
	vm.actor = actorservice.getActor($routeParams.id);


	//Controller actions
	vm.beFriends = function () {
		actorservice.beFriends($routeParams.id);
		alert("¡Añadido!");
	}
};