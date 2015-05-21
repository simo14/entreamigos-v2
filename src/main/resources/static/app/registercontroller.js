angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","$location"];

function registercontroller (actorservice,$location){
	var vm = this;
	vm.persona = {};
	vm.newOrg = {};
	
	
	vm.addPersona = function(persona) {
		console.log("pene1");
		
		actorservice.newPersona(persona);
		
		vm.newPersona = {};
		
		$location.path("/gente");
	};
}