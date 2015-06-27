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
		    	   		vm.open("mensajeLogInCorrect");
		    	   	}
		    	});
			},
			//error
			function (){
				vm.open("mensajeLogInIncorrect");
			}
			);
			$location.path("/gente");
	};
	
	vm.addOrg = function(org) {
		
		actorservice.newOrg(org);
		
			vm.newOrg = {};
			vm.credentials = {
					username : org.name, 
					password : 1234
			}
			sessionservice.login(vm.credentials).then(
					//success
					function (user) {
						vm.session.isOrganization = true;
			    	   	vm.credentials.username = sessionservice.sdo.username;
			    	   	if(sessionservice.sdo.isLogged){
			    	   		vm.open("mensajeLogInCorrect");
			    	   	}
			    	},
					//error
					function (){
			    		vm.open("mensajeLogInIncorrect");
					}
				);
		
		$location.path("/");
	};
	
	vm.modifyPerson = function(){
		actorservice.updatePersona(vm.upersona);
		vm.upersona = {};
		$location.path("/");
	};
	vm.open = function (mensaje) {
		console.log("deberia aparecer algo")
		ngDialog.open({
			template: mensaje,
			className: 'ngdialog-theme-default',
		});
	}
}