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
@RequestMapping("/adminLogin")
public class AdminController implements CommandLineRunner {
	@Autowired
	private EventLocationService ELService;
	
	@Autowired
	private ActorService actorService;
	
	@Autowired
	private AdministratorService adminService;
	
//------------------------------------------------	

	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Happening> pp(HttpSession session){
		return ELService.findAllHappeningsByDate();
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Happening> addHappening(HttpSession session, @RequestBody Happening happening) {
		/*happening.setId(0);
		Happening newHappening = ELService.save(happening);*/
		String prueba = session.getAttribute("userId")+"0";
		Long idpersona = (Long.parseLong(prueba, 10))/10;	
		Actor p = actorService.findOne(idpersona);
		if(p!=null){
			happening.setOrganizer(p);
		}
		ELService.save(happening.getLocation());
		ELService.save(happening);
		return new ResponseEntity<>(happening,HttpStatus.CREATED);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteEvent(@PathVariable long id) {
		ELService.deleteH(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Administrator getAdmin(@PathVariable long id) {
		return adminService.findOneAdministrator(id);
	}
	
}
