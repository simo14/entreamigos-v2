angular.module("webapp").controller("personcontroller", personcontroller)

eventcontroller.$inject = ["actorservice", "$routeParams"];

function personcontroller(actorservice, $routeParams) {

	var vm = this;
	
	//View model properties
	
	vm.actor = {};
	vm.sessionId = 0;
		
	//Controller logic
	
	vm.actor = actorservice.getActor($routeParams.id);


	//Controller actions
	vm.beFriends = function () {
		actorService.beFriends($routeParams.id);
		alert("¡Añadido!");
	}
};