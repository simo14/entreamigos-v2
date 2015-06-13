/*angular.module("webapp").controller("logincontroller", logincontroller);
logincontroller.$inject = ["$location","$resource","sessionservice"];

function logincontroller($resource,$location,session) {
	var vm = this;
		
	this.credentials = {
		username: '',
		password: ''
	};
	
    vm.submit = function() {
    	sessionservice.login(credentials).then(function (user) {
    		
    	});
    	alert("Has iniciado sesión");
		$location.path("/");
	};
}*/