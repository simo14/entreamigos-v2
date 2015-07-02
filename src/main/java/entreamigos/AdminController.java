package entreamigos;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/adminLogin")
public class AdminController {
	
	@Autowired
	private AdministratorService adminService;
	
//------------------------------------------------	

	
	@RequestMapping(method = RequestMethod.POST)
	public Administrator getAdmin(@RequestBody Credentials c, HttpSession session) {
		try{
			long ide = Long.parseLong(c.getUsername());
			String aux = adminService.findOneAdministrator(ide).getPassword();
			if (c.getPassword().equals(aux)){
				session.setAttribute("id", c.getUsername());
				return adminService.findOneAdministrator(ide);
			} else {
				return null;
			}
		}catch(Exception e){return null;}
		
	}
	
}
