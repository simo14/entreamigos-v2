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
    	actorservice.eliminar(persona);
    	popup.abrir("done");
    	$location.path("/adminpanel");
	};
	
	vm.eliminarEvento = function(evento) {
		ppservice.eliminar(evento);
		popup.abrir("done");
		$location.path("/adminpanel");
	};
	
	vm.submit = function() {
    	adminservice.login(vm.credentials).then(function (admin) {
    	   	if (!admin.id) {
    	   		popup.abrir("mensajeLogInIncorrect");
    	   	}
    		$location.path("/adminpanel");
    	});
	}
	vm.onload = function () {
		var url = $location.path();
		if((url ==="/adminlogin") && (adminservice.sdo.isLogged)){
			$location.path("/adminpanel");
		}else if ((url ==="/adminpanel") &&  (!adminservice.sdo.isLogged)){
			$location.path("/adminlogin");
		}   
	};
	vm.onload();
}