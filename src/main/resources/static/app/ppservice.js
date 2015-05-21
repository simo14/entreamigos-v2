"use strict";
angular.module("webapp").service("ppservice", ppservice);
ppservice.$inject = [ "$resource", "$timeout" ];

function ppservice($resource, $timeout) {
	var that = this;
	var events = [];                          //Events = happenings
	var EventResource = $resource('/events/:id',      //en vez de /event/:id para ser coherente con REST ponemos raíz
			{ id : '@id' },
			{ update : { method : "PUT" }}
		);
	
	var EventSearch = $resource('events/:action/:myParam',
			{ myParam : '@myParam' },
			{ 'search': {
		            method: 'GET',
		            isArray: true,	
		            params: {
		                action:"search",
		            	query: '@query'
		            }
			}
			,
			 'searchByCategory': {
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
		getEvents : getEvents,
		getEvent : getEvent,
		search : search,
		searchCategory : searchCategory
	}

	function reload(){
		var promise = EventResource.query(function(newevents){
			events.length = 0;
			events.push.apply(events, newevents);
		}).$promise;
		return promise;
	}
	
	function getEvents() {
		return events;
	}
	
	function getEvent (param) {
		var event = EventResource.get({ id: param }, function() {
		    return event
		  });
		return event;
	}
	

//OJO!!!! antes asignábamos that.events en la función éxito de la query search, pero eso devolvía con el return un array antes de rellenarlo. El truco de $resource es hacerlos como están ahora, asignando una variable y devolviendo esa variable
	function search (param) {
		that.events = EventSearch.search ({myParam : param});
		return that.events;
	}
	
	function searchCategory (param) {
		that.events = EventSearch.searchByCategory ({myParam : param});
		return that.events;
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