"use strict";
angular.module("webapp").service("actorservice", actorservice);
actorservice.$inject = [ "$resource", "$timeout" ];

function actorservice($resource, $timeout) {
	var that = this;
	var actors = [];                          
	var PeopleResource = $resource('/people/:id',
			{ id : '@id' },
			{ update : { method : "PUT" }}
		);
	
	var PeopleSearch = $resource('people/:action/:myParam',
			{ myParam : '@myParam' },
			{ search: {
		            method: 'GET',
		            isArray: true,	
		            params: {
		                action:"search",
		            	query: '@query'
		            }
			}
			},
			{ searchByLocation: {
					method: 'GET',
					isArray: true,
					params: {
						action:"filter",
						query: '@query'
					}
			}}
	);


function autoreload(){
    reload();
    $timeout(autoreload, 500000);
}
	
	autoreload();
	
	return {
		reload : reload,
		getActors : getActors,
		search : search,
		searchLocation : searchLocation,
		getActor: getActor
	}
	

	function reload(){
		var promise = PeopleResource.query(function(newActors){
			actors.length = 0;
			actors.push.apply(actors, newActors);
		}).$promise;
		return promise;
	}
	
	function getActors() {
		return actors;
	}
	
	function getActor (param) {
		var actor = PeopleResource.get({ id: param }, function() {
		    return actor
		  });
		return actor;
	}
	
	function search (param) {
		PeopleSearch.search ({myParam : param}, function(data){
			that.actors = data;
		});
		console.log(that.actors);
		return that.actors;

	}
	
	function searchLocation (param) {
		PeopleSearch.searchByLocation ({myParam : param}, function(data){
			that.actors = data;
		});
		return that.actors;
	}
  
 /*   
	this.getEvents = function(){
		this.events = EventResource.query();
		console.log(this.events);
		return this.events;
	}
    
	this.newEvent = function(newEvent) {		
		new EventResource(newEvent).$save(function(event) {
			that.Events.push(event);
		});
	}
    
	this.updateEvent = function(updatedEvent) {
		updatedPost.$update();
	}
    
	this.deleteEvent = function(event) {
		post.$remove(function() {
			that.events.splice(that.posts.indexOf(post), 1);
		});
	}	*/
}