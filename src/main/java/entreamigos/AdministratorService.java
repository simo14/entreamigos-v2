package entreamigos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {
	@Autowired
	private AdministratorRepository adRep;
}
