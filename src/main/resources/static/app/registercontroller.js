angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","sessionservice","$location","$routeParams","ngDialog"];

function registercontroller (actorservice,sessionservice,$location,$routeParams,ngDialog){
	
	var vm = this;
	vm.persona = {};
	vm.session = sessionservice.sdo;
	vm.upersona = {};
	vm.newOrg = {};
	vm.credentials = {};
	
//My account / controller logic
	if (sessionservice.sdo.isLogged){
		vm.upersona = sessionservice.user.user.$$state.value;
	}
	
//operations	
	
	vm.addPersona = function(persona) {
		
			actorservice.newPersona(persona).then(function (){
			
				vm.newPersona = {};
				
				vm.credentials = {
						username : persona.name, 
						password : 1234
				}
				
			  //login
				sessionservice.login(vm.credentials).then(function (user) {
		    	   	vm.credentials.username = sessionservice.sdo.username;
		    	   	if(sessionservice.sdo.isLogged){
		    	   		vm.open();
		    	   		window.alert("Bienvenido/a "+sessionservice.sdo.username);
		    	   	}
		    	});
			},
			//error
			function (){
				vm.open();
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
	vm.open = function () {
		console.log("deberia aparecer algo")
		ngDialog.open({
			template: "PENE",
			className: 'ngdialog-theme-default',
		});
	}
}