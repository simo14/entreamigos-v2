"use strict";
angular.module("webapp").controller("eventdetailcontroller", eventdetailcontroller);
eventdetailcontroller.$inject = [ "ppservice","$location","$routeParams" ];

function eventdetailcontroller(ppservice,$location,$routeParams) {
	var vm = this;
	
	//View model properties
    vm.event = {}
    
    //Controller's logic
    vm.event = ppservice.getEvent($routeParams.id)
    
    //Controller's actions
	vm.join = function () {
		vm.sessionId = ppservice.join($routeParams.id);
		if(vm.sessionId!==0){
			alert("¡Te has inscrito con éxito!");
		}else {
			alert("Por favor, inicia sesión antes de inscribirte.");
		}
    }
}


