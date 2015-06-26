"use strict";
angular.module("webapp").service("actorservice", actorservice);
actorservice.$inject = [ "$resource", "$timeout" ];

function actorservice($resource, $timeout) {
	var that = this;
	var actors = [];                          
	var PeopleResource = $resource('/people/:id/:action',
			{ id : '@id' },
			{ 	update : { method : "PUT" },
			}
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
			},
			searchByLocation: {
					method: 'GET',
					isArray: true,
					params: {
						action:"filter",
						query: '@query'
					}
			},
			beFriends: {
					method: 'POST',
					params: {
						action:"friends"
					}
			},
			getFriends: {
					method:'GET',
					isArray: true,
					params : {action:"friends"}
			},
			getCrew: {
				method:'GET',
				isArray: true,
				params : {action:"crew"}
			},
			newOrganization: {
				method: 'POST',
				params: {
					action:"org"
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
		searchLocation : searchLocation,
		getActor: getActor,
		beFriends : beFriends,
		newPersona : newPersona,
		newOrg : newOrg,
		updatePersona : updatePersona,
		findFriends : findFriends,
		findCrew : findCrew
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
		that.actors = PeopleSearch.search ({myParam : param});
		return that.actors;
	}
	
	function searchLocation (param) {
		that.actors = PeopleSearch.searchByLocation ({myParam : param});
		return that.actors;
	}
  
	function beFriends (param) {
		PeopleSearch.beFriends(param);
		reload();
		//nuevo.PeopleSearch.save();
	}
	
	function newPersona(newPersona) {
		var answer = new PeopleResource(newPersona).$save(
				//success
				function(post){
					actors.push(post);
					reload();
				},
				//error
				function(error){
					return error;
				});
		return answer;	//We need to return something so that the controller can execute "then"
	}
	
	function newOrg(newOrg) {
		new PeopleSearch.newOrganization(newOrg, function(post) {
			actors.push(post);
			reload();
		});
	}
	
	function updatePersona(persona) {
		new PeopleResource.update(persona, function() {
			reload();
		});
	}
	
	function findFriends(){
		that.friends = PeopleSearch.getFriends (function(){
			return that.friends
		});
		return that.friends;
	}
	
	function findCrew(){
		console.log("pene");
		that.friends = PeopleSearch.getCrew (function(){
			return that.friends
		});
		return that.friends;
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