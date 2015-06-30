"use strict";
angular.module("webapp").service("adminservice", adminservice);
adminservice.$inject = [ "$resource", "$timeout" ];

function adminservice($resource, $timeout) {
	var that = this;
	var sdo = {isLogged : false};
	var credentials = {
			id: "",
			password: ""
	};
	
	var AdminResource = $resource('/adminLogin',
			{ id : '@id' },
			{ update : { method : "GET" },
			}
		);
	
	function logout(){
		LogoutResource.get();
		isLogged = false
	}
	
	function login (credentials){
		var admin = new AdminResource(credentials).$save(function( value ){
		        	if(admin){
		        		credentials.id = value.id;
		        		sdo.isLogged = true;
			        	return value;
		        	}
		        	else{
		        		isLogged = false;
		        	}
		        });
		return admin;
	};
	
	return {
		sdo : sdo,
		login:login
	}
}