angular.module("webapp").controller("redirectcontroller", redirectcontroller);
redirectcontroller.$inject = ["$location","$scope","sessionservice"];

function redirectcontroller($location,$scope,sessionservice) {
	var vm = this;

	vm.onload = function () {
		var url = $location.path();
		if(url ==="/redirect/events"){
			$location.path("/");
		}else if (url ==="/redirect/people"){
			$location.path("/gente");
		}else if (url === "/redirect/friends"){
			$location.path("/amigos");
		}    
	};
	vm.onload();
}
