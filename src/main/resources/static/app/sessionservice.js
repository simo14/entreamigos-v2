
angular.module("webapp").factory('sessionservice', sessionservice);
sessionservice.$inject = [ "$resource" ];

function sessionservice($resource) {
	var that = this;
	
	var PeopleResource = $resource('/people/login');
	var LogoutResource = $resource('/people/logout');
	
	var sdo = {
	    isLogged: false,
	    username: '',
	    isOrganization: false
	 };
	
	var user = {
			user:{}
	};
	
	var message = "";
	
	function login (credentials){
		//var user = new PeopleResource(credentials).loginRequest
		user.user = new PeopleResource(credentials).$save(function( value ){
		        	if(value){
		        		sdo.username = value.name;
			        	sdo.isLogged = true;
			        	return value;
		        	}
		        	else{
		        		sdo.isLogged = false;
		        	}
		        });
		return user.user;
	};
	
	function logout(){
		LogoutResource.get();
	}
	
  return {
	  sdo : sdo,
	  user : user,
	  login : login,
	  logout : logout,
	  message : message
  }
};