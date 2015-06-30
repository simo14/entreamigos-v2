angular.module("webapp").controller("admincontroller", admincontroller);
admincontroller.$inject = ["$resource","$location","$window","$scope","popup","adminservice"];

function admincontroller($resource,$location,$window,$scope,popup,adminservice) {
	var vm = this;
	
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
   	   if(absNewUrl === "/SITIO PARA HACER COSAS DE ADMIN" && adminservice.isLogged){
   		 popup.abrir("LogInCompleted");
   	   }
      });	

    vm.submit = function() {
    	adminservice.login(vm.credentials).then(function (admin) {
    	   	if (!admin.id) {
    	   		popup.abrir("mensajeLogInIncorrect");
    	   	}
    		$location.path("/SITIO PARA HACER COSAS DE ADMIN");
    	});
	};
}