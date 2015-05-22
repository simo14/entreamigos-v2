package entreamigos;

import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpSession;

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
	
	@Autowired
	private RatingRepository ratingRep;
	
//------------------------------------------------	

	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Happening> pp(HttpSession session){
		return ELService.findAllHappeningsByDate();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Happening> addHappening(@RequestBody Happening happening) {
		/*happening.setId(0);
		Happening newHappening = ELService.save(happening);*/
		ELService.save(happening.getLocation());
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
	
//Participar en el evento
	@RequestMapping(value="/{id}/join", method = RequestMethod.POST)
	public long joinHappening(@PathVariable long id, HttpSession session){
		if(session.getAttribute("isLogged")!=null && (boolean) session.getAttribute("isLogged")){
			Happening h = getEvent(id);
			h.getAttendees().add(actorService.findOne((long)session.getAttribute("userId")));
			ELService.save(h);
			return (long)session.getAttribute("userId");
		}
		else return 0;
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
		Person raul=new Person("raul","Una cuchara",4, null,null,a,aux);
		actorService.save(raul);
		Rating r = new Rating(3);
		ratingRep.save(r);
		jaime.setRating(r);
		actorService.save(jaime);
		
		Location aux3=new Location("valencia","","",null);
		ELService.save(aux);
		Person uhu=new Person("Paola","Livin la vida loca",2, null,null,null,aux3);
		actorService.save(uhu);
		
		aux3=new Location("valencia","","",null);
		ELService.save(aux);
		uhu=new Person("Brian","Romani Ite Domun",4, null,null,null,aux3);
		actorService.save(uhu);
		
		aux3=new Location("valencia","","",null);
		ELService.save(aux);
		uhu=new Person("Pedro","Picapiedra",2, null,null,null,aux3);
		actorService.save(uhu);
		
		aux3=new Location("valencia","","",null);
		ELService.save(aux);
		uhu=new Person("Fodo","Me gusta andar y las cosas brillantes",2, null,null,null,aux3);
		actorService.save(uhu);
		
		aux3=new Location("logroño","","",null);
		ELService.save(aux);
		uhu=new Person("xXQuixoteXx","De la mancha district, dude",1, null,null,null,aux3);
		actorService.save(uhu);
		
		ArrayList<Actor> atendees=new ArrayList<Actor>();
		atendees.add(jaime);
		Happening h1=new Happening("Playa el viernes",atendees,aux,new Date(),"Día de sol y cervezas en las mejores playas españolas.",jaime,0,"playa");
		ELService.save(h1);
		h1=new Happening("A la guay montaña",atendees,aux2,new Date(14318),"Montañismo mágico y especial",null,300,"montaña");
		ELService.save(h1);
		h1=new Happening("Copas??",atendees,aux2,new Date(14318),"Y lo que surja",null,300,"fiesta");
		ELService.save(h1);
		h1=new Happening("Visitamos el museo",atendees,aux2,new Date(14318),"Nobody expects the spanish inquisition",null,300,"cultural");
		ELService.save(h1);
		h1=new Happening("Dia de piscina",atendees,aux2,new Date(14318),"Traed cremita",null,300,"deportes");
		ELService.save(h1);
	}
}
