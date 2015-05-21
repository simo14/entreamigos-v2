angular.module("webapp").controller("eventcontroller", eventcontroller)

eventcontroller.$inject = ["ppservice", "$routeParams"];

function eventcontroller(ppservice, $routeParams) {

	var vm = this;
	
	//View model properties
	
	vm.event = {};
	vm.sessionId = 0;
		
	//Controller logic
	
	vm.event = ppservice.getEvent(2);


	//Controller actions
	vm.join = function () {
		vm.sessionId = ppservice.join($routeParams.id);
		console.log(vm.sessionId);
		if(vm.sessionId!==0){
			alert("¡Te has inscrito con éxito!");
		}else {
			alert("Por favor, inicia sesión antes de inscribirte.");
		}
	}
}