angular.module("webapp").controller("admincontroller", admincontroller);
admincontroller.$inject = ["$resource","$location","$window","$scope","popup","adminservice","ppservice","actorservice"];

function admincontroller($resource,$location,$window,$scope,popup,adminservice,ppservice,actorservice) {
	var vm = this;
	
	vm.people = actorservice.getActors();
	vm.events = ppservice.getEvents();
	vm.evento = {};
	vm.persona = {};
	
	vm.credentials = {
			id: '',
			password: ''
		};		
		
	vm.session = sessionservice.sdo;
		
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   adminservice.isLogged = false;
 		   sessionservice.credentials.username = "";
 		   adminservice.logout();
 		   popup.abrir("done");
 	   }
 	});
    
    
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
   	   if(absNewUrl === "http://localhost:8080/#/adminpanel" && adminservice.sdo.isLogged){
   		 popup.abrir("LogInCompleted");
   	   }
      });	

    vm.eliminarPersona = function(persona) {
    	console.log(persona.name);
	};
	vm.eliminarEvento = function(evento) {
		console.log(evento.title);
	};
	
	vm.submit = function() {
    	adminservice.login(vm.credentials).then(function (admin) {
    	   	if (!admin.id) {
    	   		popup.abrir("mensajeLogInIncorrect");
    	   	}
    		$location.path("/adminpanel");
    	});
	}
}