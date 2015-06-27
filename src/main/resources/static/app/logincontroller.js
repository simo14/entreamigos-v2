angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.$inject = ["$resource","$location","$window","sessionservice","$scope"];

function logincontroller($resource,$location,$window,sessionservice,$scope) {
	var vm = this;
		
	vm.credentials = {
		username: '',
		password: ''
	};
	
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
  	   if(absNewUrl === "http://localhost:8080/#/" && sessionservice.sdo.isLogged){
  		   sessionservice.message = "Bienvenido/a "+sessionservice.sdo.username;
  	   }
     });
	
	vm.session = sessionservice.sdo;
	
    vm.submit = function() {
    	sessionservice.login(vm.credentials).then(function (user) {
    	   	vm.credentials.username = user.name;
    	   	if(!sessionservice.sdo.isLogged){
    	   		$window.alert("Usuario o contraseña incorrecto");
    	   	}
    		$location.path("/");
    	});
	};
}