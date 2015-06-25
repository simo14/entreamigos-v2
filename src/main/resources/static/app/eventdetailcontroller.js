"use strict";
angular.module("webapp").controller("eventdetailcontroller", eventdetailcontroller);
eventdetailcontroller.$inject = [ "ppservice","sessionservice","$location","$routeParams" ];

function eventdetailcontroller(ppservice,sessionservice,$location,$routeParams) {
	var vm = this;
	
	//View model properties
    vm.event = {}
    
    //Controller's logic
    vm.event = ppservice.getEvent($routeParams.id);
	vm.session = sessionservice.sdo;
    
    //Controller's actions
	vm.join = function () {
		if(vm.session.isLogged){
			vm.sessionId = ppservice.join($routeParams.id);
			alert("¡Te has inscrito con éxito!");
		}else {
			alert("Por favor, inicia sesión antes de inscribirte.");
		}
		$location.path("/");
    }
}


