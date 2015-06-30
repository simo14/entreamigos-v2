
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
		user.user = new PeopleResource(credentials).$save(function( value ){
		        	if(value.bio){
		        		sdo.username = value.name;
			        	sdo.isLogged = true;
			        	if(value.principles){
			        		sdo.isOrganization = true;
			        	}
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
		sdo.isLogged = false;
		sdo.isOrganization = false
	}
	
  return {
	  sdo : sdo,
	  user : user,
	  login : login,
	  logout : logout,
	  message : message
  }
};