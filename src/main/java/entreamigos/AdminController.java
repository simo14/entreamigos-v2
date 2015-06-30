package entreamigos;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/adminLogin")
public class AdminController {
	
	@Autowired
	private AdministratorService adminService;
	
//------------------------------------------------	

	
	@RequestMapping(method = RequestMethod.POST)
	public Administrator getAdmin(@RequestParam long id, @RequestBody String pass, HttpSession session) {
		String aux = adminService.findOneAdministrator(id).getPassword();
		if (pass.equals(aux)){
			session.setAttribute("id", id);
			return adminService.findOneAdministrator(id);
		} else {
			return null;
		}
	}
	
}
