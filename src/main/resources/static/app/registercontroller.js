angular.module("webapp").controller("registercontroller", registercontroller)

registercontroller.$inject = ["actorservice","sessionservice","$location","ngDialog","$scope","popup"];

function registercontroller (actorservice,sessionservice,$location,ngDialog,$scope,popup){
	
	var vm = this;
	vm.persona = {};
	vm.session = sessionservice.sdo;
	vm.upersona = {};
	vm.newOrg = {};
	vm.credentials = {};
	vm.people = actorservice.getActors();
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   sessionservice.sdo.isLogged = false;
 		   sessionservice.sdo.username = "";
 		   sessionservice.logout();
 		  popup.abrir("done");
 	   }
 	});
	
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
		    	   		popup.abrir("mensajeLogInCorrect");
		    	   	}
		    	});
			},
			//error
			function (){
				popup.abrir("mensajeLogInIncorrect");
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
			    	   		popup.abrir("mensajeLogInCorrect");
			    	   	}
			    	},
					//error
					function (){
			    		popup.abrir("mensajeLogInIncorrect");
					}
				);
		
		$location.path("/");
	};
	
	vm.modifyPerson = function(){
		actorservice.updatePersona(vm.upersona);
		vm.upersona = {};
		$location.path("/");
	};
	
	vm.modifyOrg = function(persona){
		actorservice.updateOrg(vm.upersona);
		if(persona){
			actorservice.addHead(persona);		//Actualize in server
			vm.upersona.head = persona;			//Actualize in client
		}
		vm.upersona = {};
		$location.path("/");
	};

}