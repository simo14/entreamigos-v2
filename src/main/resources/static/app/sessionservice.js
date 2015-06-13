/*angular.module("webapp").factory('sessionservice', [function() {
	var that = this;
	
	var PeopleResource = $resource('/people/login',
			{ loginRequest : { method : "POST" }}
		);
	
	var sdo = {
	    isLogged: false,
	    username: ''
	 };
	
	function login(credentials){
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
}]);*/