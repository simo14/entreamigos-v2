angular.module("webapp").controller("admincontroller", admincontroller);
admincontroller.$inject = ["$resource","$location","$window","sessionservice","$scope","popup","adminservice"];

function admincontroller($resource,$location,$window,sessionservice,$scope,popup,adminservice) {
	var vm = this;
	
	vm.credentials = {
			id: '',
			password: ''
		};
	
	vm.request = {
			id: '',
			password: ''
	}
		
		
	vm.session = sessionservice.sdo;
		
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   sessionservice.sdo.isLogged = false;
 		   sessionservice.sdo.isAdmin = false;
 		   sessionservice.sdo.username = "";
 		   sessionservice.logout();
 		   popup.abrir("done");
 	   }
 	});
    
    
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
   	   if(absNewUrl === "http://localhost:8080/#/" && sessionservice.sdo.isLogged){
   		 popup.abrir("LogInCompleted");
   	   }
      });	

    vm.submit = function() {
    	sessionservice.login(vm.credentials).then(function (admin) {
    	   	vm.request.id = admin.id;
    	   	vm.request.password = admin.password;
    	   	if(request.password === credentials.password){
    	   		sessionservice.sdo.isLogged=true;
    	   		popup.abrir("mensajeLogInCorrect");
    	   	} else {
    	   		popup.abrir("mensajeLogInIncorrect");
    	   	}
    		$location.path("/SITIO PARA HACER COSAS DE ADMIN");
    	});
	};
}