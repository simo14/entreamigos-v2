package entreamigos;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/people")
public class ActorsController {

	@Autowired
	private ActorService actorService;
	@Autowired
	private RatingService ratingService;
	
//------------------------------------------------
	
	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Actor> people (){
		return actorService.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Person> addActor (@RequestBody Person person) {
		/*happening.setId(0);
		Happening newHappening = ELService.save(happening);*/
		actorService.save(person);
		return new ResponseEntity<>(person,HttpStatus.CREATED);
	}
	
	@RequestMapping (value="/{id}", method = RequestMethod.GET)
	public Actor getActor (@PathVariable long id){
		return actorService.findOne(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Long> deleteActor(@PathVariable long id) {
		actorService.delete(id);
		return new ResponseEntity<>(id,HttpStatus.OK);
	}
	
	@RequestMapping(value = "/login/{name}", method = RequestMethod.GET)
	public void login(HttpSession session,@PathVariable String name){
		ArrayList<Actor> a = (ArrayList<Actor>)actorService.findByName(name);
		Actor b = a.get(0);
		session.setAttribute("userId",b.getId());
		session.setAttribute("isLogged", true);
	}
	
//FRIENDSSSSSSS
	
	@RequestMapping(value="/friends", method = RequestMethod.GET)
	public Iterable<Person> friendsP (HttpSession session){
		String prueba = session.getAttribute("userId")+"0";
		Long idpersona = (Long.parseLong(prueba, 10))/10;
		Person aux = (Person) actorService.findOne(idpersona);
		return aux.getFriends();
	}
	
	@RequestMapping(value="/friends", method = RequestMethod.POST)		//sin probar porq postman es tonto
	public ResponseEntity<Person> addFriend (@RequestBody long idPerson, HttpSession session) {
		
		String prueba = session.getAttribute("userId")+"0";
		Long idpersona = (Long.parseLong(prueba, 10))/10;
		System.out.println(idpersona);
		
		Person aux = (Person) actorService.findOne(idpersona);
		Person amigo = (Person)actorService.findOne(idPerson);
		aux.getFriends().add(amigo);
		actorService.save(aux);
		amigo.getFriends().add(aux);	//It has to be bidirectional
		actorService.save(amigo);
		return new ResponseEntity<>(amigo,HttpStatus.OK);
	}
	
//No existe un people/friends/{id} get porque clickar en un amigo hace una petición get a people/{id}
	
	@RequestMapping(value="/friends/{id}", method = RequestMethod.DELETE)				//funciona!
	public ResponseEntity<Long> deleteFriend (@PathVariable long id, HttpSession session) {
		Person aux = (Person) actorService.findOne(Long.parseLong((String)session.getAttribute("userId")));
		Person amigoADeletear = (Person) actorService.findOne(id);
		aux.getFriends().remove(amigoADeletear);
		actorService.save(aux);
		amigoADeletear.getFriends().remove(aux);
		actorService.save(amigoADeletear);
		return new ResponseEntity<>(id,HttpStatus.OK);
	}
	
//The following method sets a person's valoration
	
	@RequestMapping(value = "/{id}/{rating}", method = RequestMethod.POST)
	public ResponseEntity<Actor> addRating (@PathVariable long id, @PathVariable Rating rating){
		Actor aux = actorService.findOne(id);
		ratingService.save(rating);
		aux.setRating(rating);
		actorService.save(aux);
		return new ResponseEntity<>(aux,HttpStatus.OK);
	}
	
//Filtering people
//We only define a requestmapping method if there is a straight funcionality in the interface. If not, it is included in the search input, and thus invoked by it through actorService
	@RequestMapping(value = "/filter/{location}")
	public Iterable<Actor> filterByLocation (@PathVariable String location){
		return actorService.findByDefaultLocationNeighborhood(location);
	}
	
	@RequestMapping(value = "/search/{param}", method = RequestMethod.GET)
	public Iterable<Actor> searching(@PathVariable String param){
		ArrayList <Actor> a= new ArrayList<Actor> ();
		String [] palabras = param.split(" ");
/*We perform a search for each word in the search input. Searchs are made in category, title and location. If an event was already found by one of those, it won't be returned again*/
		for(String palabra:palabras){
			a.addAll(((ArrayList<Actor>) actorService.findByName(palabra)));
			ArrayList<Actor> aux=((ArrayList<Actor>) filterByLocation(palabra));
			for (Actor hap:aux){
				if (!a.contains(hap)){
					a.add(hap);
				}
			}
			Object o = palabra;
			if(o instanceof Integer){
				ArrayList<Actor> aux2=((ArrayList<Actor>) actorService.findByMood(Integer.parseInt(palabra)));
				for (Actor act:aux2){
					if (!a.contains(act)){
						a.add(act);
					}
				}
			}
		}
		//h.addAll((ArrayList<Happening>) ELService.findByPrize(Integer.parseInt(param))); 	Obviamente si es un string el parse peta
		return a;
	}
}
