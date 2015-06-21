angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.$inject = ["$resource","$location","$window","sessionservice"];

function logincontroller($resource,$location,$window,sessionservice) {
	var vm = this;
		
	vm.credentials = {
		username: '',
		password: ''
	};
	
    vm.submit = function() {
    	sessionservice.login(vm.credentials).then(function (user) {
    	   	vm.credentials.username = user.name;
    	   	if(user.isLogged){
    	   		$window.alert("Bienvenido/a "+user.name);
    	   	}else{
    	   		$window.alert("Usuario o contraseña incorrecto");
    	   	}
    		$location.path("/");
    	});
	};
}