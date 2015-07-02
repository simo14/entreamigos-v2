"use strict";
angular.module("webapp").controller("eventdetailcontroller", eventdetailcontroller);
eventdetailcontroller.$inject = [ "ppservice","sessionservice","$location","$routeParams","ngDialog","$scope","popup" ];

function eventdetailcontroller(ppservice,sessionservice,$location,$routeParams,ngDialog,$scope,popup) {
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
			popup.abrir("done");
		}else {
			popup.abrir("notLogged");
		}
		$location.path("/");
    }
}


