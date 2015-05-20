package entreamigos;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EventLocationService {
	@Autowired
	private HappeningRepository hRep;
	
	@Autowired
	private LocationRepository lRep;
	
	//-----------------------------------------

	public Iterable<Happening> findAllHappenings (){
		return hRep.findAll();
	}
	
	public Iterable<Happening> findAllHappeningsByDate (){
		return hRep.findAllByOrderByDateAsc();
	}
	
	public Iterable<Location> findAllLocations (){
		return lRep.findAll();
	}
	
	public Location findOneLocation(long locationId){
		return lRep.findOne(locationId);
	}
	
	public Happening findOneHappening(long happeningId){
		return hRep.findOne(happeningId);
	}
	
	public Happening save(Happening happening){
		return hRep.save(happening);
	}
	
	public Location save(Location location){
		return lRep.save(location);
	}
	
	public void deleteH(long id){
		hRep.delete(id);
	}
	
	public void deleteL(Location location){
		lRep.delete(location);
	}
	
	public Iterable<Location> findByNeighborhoodContaining(String sw){
		return lRep.findByNeighborhoodContaining(sw);
	}
	
	public Iterable<Happening> findByLocation	(String location){
		return hRep.findByLocationNeighborhood(location);
	}
	
	public Iterable<Happening> findByDate	(Date date){
		return hRep.findByDate(date);
	}
	
	public Iterable<Happening> findByTitle	(String title){
		return hRep.findByTitleContains(title);
	}
	
	public Iterable<Happening> findByOrganizer	(Actor actor){
		return hRep.findByOrganizer(actor);
	}
	
	public Iterable<Happening> findByPrize	(int prize){
		return hRep.findByPrize(prize);
	}
	
	public Iterable<Happening> findByCategory	(String category){
		return hRep.findByCategory(category);
	}
}
