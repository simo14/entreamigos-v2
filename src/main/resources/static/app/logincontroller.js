angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.$inject = ["$resource","$location","$window","sessionservice","$scope","popup"];

function logincontroller($resource,$location,$window,sessionservice,$scope,popup) {
	var vm = this;
	
	vm.credentials = {
			username: '',
			password: ''
		};
		
		
	vm.session = sessionservice.sdo;
		
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   sessionservice.sdo.isLogged = false;
 		   sessionservice.sdo.username = "";
 		   sessionservice.logout();
 		   popup.abrir("done");
 	   }
 	});
    
    
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
   	   if(absNewUrl === "http://localhost:8080/#/" && sessionservice.sdo.isLogged){
   		 popup.abrir("Bienvenido "+sessionservice.sdo.username);
   	   }
      });
    
		

    vm.submit = function() {
    	sessionservice.login(vm.credentials).then(function (user) {
    	   	vm.credentials.username = user.name;
    	   	if(!sessionservice.sdo.isLogged){
    	   		popup.abrir("Usuario o contraseña incorrecto");
    	   	}
    		$location.path("/");
    	});
	};
}