angular.module("webapp").controller("personcontroller", personcontroller)

personcontroller.$inject = ["actorservice", "sessionservice","$routeParams","$location"];

function personcontroller(actorservice, sessionservice, $routeParams,$location) {

	var vm = this;
	
	//View model properties
	
	vm.actor = {};
	vm.friends = [];
	vm.sessionId = 0;
		
	//Controller logic
	
	vm.actor = actorservice.getActor($routeParams.id);


	//Controller actions
	vm.beFriends = function () {
		if(sessionservice.sdo.isLogged && !sessionservice.sdo.isOrganization){
			actorservice.beFriends($routeParams.id);
			vm.open("done");
			$location.path("/amigos");
		}else{
			vm.open("notLogged");
		}
	}
	vm.friends = function (param) {
		vm.actors = actorservice.findFriends(param);
    }
	
	vm.open = function (mensaje) {
		ngDialog.open({
			template: mensaje,
			className: 'ngdialog-theme-default',
		});
	}
};