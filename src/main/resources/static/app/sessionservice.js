
angular.module("webapp").factory('sessionservice', sessionservice);
sessionservice.$inject = [ "$resource" ];

function sessionservice($resource) {
	var that = this;
	
	var PeopleResource = $resource('/people/login',
			{ loginRequest : { method : "POST" }}
		);
	
	var sdo = {
	    isLogged: false,
	    username: ''
	 };
	
	return {
		login : login,
	}
	
	function login (credentials){
		var user = PeopleResource.loginRequest(credentials)
			 $promise.then(
		        //success
		        function( value ){
		        	that.sdo.username = value.name;
		        	that.sdo.isLogged = true;
		        	return value;
		        },
		        //error
		        function( error ){}
		      );
		return user;
	};
	
  return sdo;
};