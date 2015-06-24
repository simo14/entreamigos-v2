package entreamigos;
import java.util.Date;

import org.springframework.data.repository.CrudRepository;

public interface HappeningRepository extends CrudRepository <Happening, Long> {
	
	//LET JPA MAKE HIS MAGIC *_*_*_*_*
	public Iterable<Happening> findByLocationNeighborhoodContains	(String neighborhood);
	
	public Iterable<Happening> findByDate		(Date date);
	
	public Iterable<Happening> findAllByOrderByDateAsc();
	
	public Iterable<Happening> findByTitleContains		(String title);
	public Iterable<Happening> findByOrganizer	(Actor actor);
	public Iterable<Happening> findByCategory	(String category);
	public Iterable<Happening> findByPrize 		(int prize);
	public Iterable<Happening> findByLocationCity(String city);
}
