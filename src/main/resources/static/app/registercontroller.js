angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","sessionservice","$location","$routeParams"];

function registercontroller (actorservice,sessionservice,$location,$routeParams){
	var vm = this;
	vm.persona = {};
	vm.upersona = {};
	vm.newOrg = {};
	
	vm.addPersona = function(persona) {
		
		if (!sessionservice.sdo.isLogged) {
			actorservice.newPersona(persona).then(function (){
			
				vm.newPersona = {};
				
				var credentials = [persona.username, 1234];
				
			  //login
				sessionservice.login(credentials).then(function (user) {
		    	   	vm.credentials.username = user.name;
		    	   	if(user.isLogged){
		    	   		window.alert("Bienvenido/a "+user.name);
		    	   	}
		    	});
			},
			//error
			function (){
				window.alert("No ha sido posible el registro, su nombre de usuario ya existe.");
			}
			);
		}else {
			window.alert("Por favor, cierre sesión antes de registrarse.");
		}
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