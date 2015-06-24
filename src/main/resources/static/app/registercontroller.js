angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","sessionservice","$location","$routeParams"];

function registercontroller (actorservice,sessionservice,$location,$routeParams){
	
	var vm = this;
	vm.persona = {};
	vm.session = sessionservice.sdo;
	vm.upersona = {};
	vm.newOrg = {};
	
//My account / controller logic
	if (sessionservice.sdo.isLogged){
		vm.upersona = sessionservice.user.user.$$state.value;
		console.log(vm.upersona);
	}
	
//operations	
	
	vm.addPersona = function(persona) {
		
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