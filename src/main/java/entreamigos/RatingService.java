package entreamigos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RatingService {
	@Autowired 
	RatingRepository rep;
	
	
	public Iterable<Rating> findAll(){
		return rep.findAll();
	}
	
	public Rating save(Rating rating){
		return rep.save(rating);
	}
	
	public void delete(Rating rating){
		rep.delete(rating);
	}
	
	public Rating findOne(long idRating){
		return rep.findOne(idRating);
	}
}
