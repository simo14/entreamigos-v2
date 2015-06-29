"use strict";
angular.module("webapp").service("adminservice", adminservice);
adminservice.$inject = [ "$resource", "$timeout" ];

function adminservice($resource, $timeout) {
	var that = this;
	var admins = [];                          
	var AdminResource = $resource('/admin/:id/:action',
			{ id : '@id' },
			{ 	update : { method : "PUT" },
			}
		);
	
	var AdminSearch = $resource('admin/:action/:myParam',
			{ myParam : '@myParam' },
			{ search: {
		            method: 'GET',
		            isArray: true,	
		            params: {
		                action:"search",
		            	query: '@query'
		            }
			},
			searchById: {
					method: 'GET',
					isArray: true,
					params: {
						action:"id",
						query: '@query'
					}
			}
		}
			
			});


function autoreload(){
    reload();
    $timeout(autoreload, 500000);
}
	
	autoreload();
	
	return {
		reload : reload,
		getActors : getActors,
		search : search,
		searchById : searchById
	}
	

	function reload(){
		var promise = AdminResource.query(function(newActors){
			actors.length = 0;
			actors.push.apply(actors, newActors);
		}).$promise;
		return promise;
	}
	
	function getAdmin() {
		return admins;
	}
	
	function getAdmin (param) {
		var admin = PeopleResource.get({ id: param }, function() {
		    return admin
		  });
		return admin;
	}
}