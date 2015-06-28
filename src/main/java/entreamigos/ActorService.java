package entreamigos;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service		//Services abstract concrete implementation of entities. They may be local or DB, available services will be the same from the controller's POV
public class ActorService {
	@Autowired 
	private ActorRepository aRep;
	
	@Autowired
	private PersonRepository aPer;
	
	@Autowired
	private OrganizationRepository aOrg;
	
	@Autowired
	private LocationRepository lRep;
	
//-----------------------------------------------	
	
	public Iterable<Actor> findAll(){
		return aRep.findAll();
	}
	
	public Actor save(Actor actor){
			lRep.save(actor.getDefaultLocation());
			return aRep.save(actor);
	}
	
	public void delete(Actor actor){
		aRep.delete(actor);
	}
	
	public void delete(long id){
		aRep.delete(id);
	}
	
	public Actor findOne(long idActor){
		return aRep.findOne(idActor);
	}
	
	public Iterable<Actor> findByNameContains(String name){
		return aRep.findByNameContains(name);
	}
	
	public Iterable<Actor> findByName(String name){
		return aRep.findByName(name);
	}
	
	public Iterable<Actor> findByRating(Rating rating){
		return aRep.findByRating(rating);
	}
	
	public Iterable<Actor> findByDefaultLocation(Location location){
		return aRep.findByDefaultLocation(location);
	}
	
	public Iterable<Actor> findByDefaultLocationNeighborhood(String location){
		return aRep.findByDefaultLocationNeighborhood(location);
	}
	
	public Iterable<Person> findFriends(long idActor){
		return aPer.findOne(idActor).getFriends();
	}
	
	public Iterable<Organization> findByHead(Person head){
		return aOrg.findByHead(head);
	}
	
	public Iterable<Person> findByOrganization(long idOrganization){	//findByOrganization
		Organization o=aOrg.findOne(idOrganization);
		ArrayList<Person> aux=(ArrayList<Person>)o.getCrew();
		aux.add(o.getHead());
		return aux;
	}
	
	public Iterable<Actor> findByMood(int mood){
		return aRep.findByMood(mood);
	}
	
	public String findPrinciples(long idOrganization){
		return aOrg.findOne(idOrganization).getPrinciples();
	}
	
	public Iterable<Actor> findByHappening(Happening happening){
		return aRep.findByHappening(happening);
	}
}
