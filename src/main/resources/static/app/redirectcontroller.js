angular.module("webapp").controller("redirectcontroller", redirectcontroller);
redirectcontroller.$inject = ["$location","$scope","sessionservice"];

function redirectcontroller($location,$scope,sessionservice) {
	var vm = this;
	
    $scope.$on('$locationChangeStart',function(evt, absNewUrl, absOldUrl) {
 	   if(absNewUrl === "http://localhost:8080/#/logout"){
 		   sessionservice.sdo.isLogged = false;
 		   sessionservice.sdo.username = "";
 		   sessionservice.logout();
 		   popup.abrir("done");
 	   }
 	});

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
