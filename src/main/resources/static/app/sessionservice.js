
angular.module("webapp").factory('sessionservice', sessionservice);
sessionservice.$inject = [ "$resource" ];

function sessionservice($resource) {
	var that = this;
	
	var PeopleResource = $resource('/people/login'//,
			//{ loginRequest : { method : "POST" }}
		);
	
	var sdo = {
	    isLogged: false,
	    username: ''
	 };
	
	function login (credentials){
		//var user = new PeopleResource(credentials).loginRequest
		var user = new PeopleResource(credentials).$save(function( value ){
		        	sdo.username = value.name;
		        	sdo.isLogged = true;
		        	return value;
		        });
		        //error
		return user;
	};
	
  return {
	  sdo : sdo,
	  login : login
  }
};