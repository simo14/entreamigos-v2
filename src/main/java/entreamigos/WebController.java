package entreamigos;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/events")
public class WebController implements CommandLineRunner {
	@Autowired
	private EventLocationService ELService;
	
	@Autowired
	private ActorService actorService;
	
//------------------------------------------------	
	
	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Happening> pp(){
		return ELService.findAllHappeningsByDate();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Happening> addHappening(@RequestBody Happening happening) {
		/*happening.setId(0);
		Happening newHappening = ELService.save(happening);*/
		ELService.save(happening);
		return new ResponseEntity<>(happening,HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteEvent(@PathVariable long id) {
		ELService.deleteH(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Happening getEvent(@PathVariable long id) {
		return ELService.findOneHappening(id);
	}
	
	@RequestMapping(value = "/filter/{parameter}", method = RequestMethod.GET)
	public Iterable<Happening> filteringPpCategory (@PathVariable String parameter){
		return ELService.findByCategory(parameter);
	}
	
	@RequestMapping(value = "/date/{parameter}", method = RequestMethod.GET)
	public Iterable<Happening> filteringPpDate(@PathVariable Date d){
		return ELService.findByDate(d);
	}
	
	@RequestMapping(value = "/location/{param}", method = RequestMethod.GET)
	public Iterable<Happening> filteringPpLocation(@PathVariable String param){
		return ELService.findByLocation(param);
	}
	
	@RequestMapping(value = "/search/{param}", method = RequestMethod.GET)
	public Iterable<Happening> searching(@PathVariable String param){
		ArrayList <Happening> h=new ArrayList<Happening> ();
		String [] palabras = param.split(" ");
/*We perform a search for each word in the search input. Searchs are made in category, title and location. If an event was already found by one of those, it won't be returned again*/
		for(String palabra:palabras){
			h.addAll(((ArrayList<Happening>) filteringPpLocation(palabra)));
			ArrayList<Happening> aux=((ArrayList<Happening>) filteringPpCategory(palabra));
			for (Happening hap:aux){
				if (!h.contains(hap)){
					h.add(hap);
				}
			}
			ArrayList<Happening> aux2=((ArrayList<Happening>) ELService.findByTitle(palabra));
			for (Happening hap:aux2){
				if (!h.contains(hap)){
					h.add(hap);
				}
			}
		}
		//h.addAll((ArrayList<Happening>) ELService.findByPrize(Integer.parseInt(param))); 	Obviamente si es un string el parse peta
		return h;
	}
	
	@Override
	public void run(String... arg0) throws Exception {
//NOMBRES SIEMPRE EN MINUSCULA TODOS
		Location aux=new Location("madrid","","",null);
		ELService.save(aux);
		Location aux2=new Location("madrid","JAJAJA","",null);
		ELService.save(aux2);
		Person jaime=new Person("jaime","Soy una taza",1, null,null,null,aux2);
		actorService.save(jaime);
		ArrayList<Person> a=new ArrayList<Person>();
		a.add(jaime);
		Person marta=new Person("marta","Una tetera",2, null,null,a,aux);
		actorService.save(marta);
		ArrayList<Person> b=new ArrayList<Person>();
		b.add(marta);
		jaime.setFriends(b);
		actorService.save(jaime);
		ArrayList<Actor> atendees=new ArrayList<Actor>();
		atendees.add(jaime);
		Happening h1=new Happening("A la playa amigotes",atendees,aux,new Date(),"Día de sol y cervezas en las mejores playas españolas.",null,0,"playa");
		Happening h2=new Happening("A la guay montaña",null,aux2,new Date(14318),"Montañismo mágico y especial",null,300,"montaña");
		ELService.save(h1);
		ELService.save(h2);
	}
}
