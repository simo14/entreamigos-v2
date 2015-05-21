angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","$location"];

function registercontroller (actorservice,$location){
	var vm = this;
	vm.persona = {};
	vm.upersona = {};
	vm.newOrg = {};
	
	
	vm.addPersona = function(persona) {
		
		actorservice.newPersona(persona);
		
		vm.newPersona = {};
		
		$location.path("/gente");
	};
	
	vm.modifyPerson = function(upersona){
		console.log("h");
		actorservice.updatePersona(upersona);
		vm.upersona = {};
		$location.path("/gente");
	}
	
	vm.addOrg = function(org) {
		
		actorservice.newOrg(org);
		
		vm.newOrg = {};
		
		$location.path("/gente");
	};
}