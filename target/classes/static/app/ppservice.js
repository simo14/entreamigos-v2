"use strict";
angular.module("webapp").service("ppservice", ppservice);
ppservice.$inject = [ "$resource", "$timeout" ];

function ppservice($resource, $timeout) {
	var that = this;
	var events = [];                          //Events = happenings
	var sessionId = 0;
	var EventResource = $resource('/events/:id/:action',      //en vez de /event/:id para ser coherente con REST ponemos raíz
			{ id : '@id' },
			{ 
				update : { method : "PUT" },
				join : { method : "POST", params: { action:"join"}}
			}
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
			},
			 'searchByCategory': {
					method: 'GET',
					isArray: true,
					params: {
						action:"filter",
						query: '@query'
					}
			},
			 'searchByDate': {
					method: 'GET',
					isArray: true,
					params: {
						action:"date",
						query: '@query'
					}
			},
			'searchByLocation' : {
					method: 'GET',
					isArray : true,
					params: {
						action:"date"
					}
			}
			}
	);

	function autoreload(){
	    reload();
	    $timeout(autoreload, 5000);
	}
	
	autoreload();
	
	return {
		reload : reload,
		getEvents : getEvents,
		getEvent:getEvent,
		join : join,
		search : search,
		searchCategory : searchCategory,
		newEvent : newEvent,
		searchDate : searchDate,
		searchByPrize : searchByPrize
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
		var event = EventResource.get({ id: param });
		return event;
	}
	
	function join (param) {
		that.sessionId = EventResource.join({ id : param });
		return that.sessionId;
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
	
	function searchDate (param) {
		that.events = EventSearch.searchByDate({myParam : param});
		return that.events;
	}
	
	function searchByPrize (param) {
		that.events = EventSearch.searchByCategory ({myParam : param});			//No es lo más bonito que hemos visto pero es porque he reutilizado el método.
		return that.events;
	}
	
	function searchByDistance (param) {
		that.events = EventSearch.searchByLocation({myParam : param});
		return that.events;
	}
	
	
	function newEvent (param) {		
		new EventResource(param).$save(function(post) {
			that.events.push(post);
			reload();
		});
	}

  
 /*   
	this.getEvents = function(){
		this.events = EventResource.query();
		console.log(this.events);
		return this.events;
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