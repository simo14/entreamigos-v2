angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","sessionservice","$location","$routeParams"];

function registercontroller (actorservice,sessionservice,$location,$routeParams){
	var vm = this;
	vm.persona = {};
	vm.upersona = {};
	vm.newOrg = {};
	
	vm.addPersona = function(persona) {
		
		actorservice.newPersona(persona);
		
		vm.newPersona = {};
		
		$location.path("/gente");
	};
	
	vm.addOrg = function(org) {
		
		actorservice.newOrg(org);
		
		vm.newOrg = {};
		
		$location.path("/");
	};
	
	vm.modifyPerson = function(){
		actorservice.updatePersona(vm.upersona);
		vm.upersona = {};
		$location.path("/");
	};
}