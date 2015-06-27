"use strict";
angular.module("webapp").controller("eventdetailcontroller", eventdetailcontroller);
eventdetailcontroller.$inject = [ "ppservice","sessionservice","$location","$routeParams","ngDialog" ];

function eventdetailcontroller(ppservice,sessionservice,$location,$routeParams,ngDialog) {
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
			vm.open("done");
		}else {
			vm.open("notLogged");
		}
		$location.path("/");
    }
	vm.open = function (mensaje) {
		console.log("deberia aparecer algo")
		ngDialog.open({
			template: mensaje,
			className: 'ngdialog-theme-default',
		});
	}
}


