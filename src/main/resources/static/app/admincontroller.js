angular.module("webapp").controller("admincontroller", admincontroller);
admincontroller.$inject = ["$resource","$location","$window","sessionservice","$scope","popup","adminservice"];

function admincontroller($resource,$location,$window,sessionservice,$scope,popup,adminservice) {
	var vm = this;
	
	vm.credentials = {
			id: '',
			password: ''
		};
		
		
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
    	sessionservice.login(vm.credentials).then(function (user) {
    	   	vm.credentials.username = user.name;
    	   	if(!sessionservice.sdo.isLogged){
    	   		popup.abrir("mensajeLogInIncorrect");
    	   	}
    		$location.path("/");
    	});
	};
}