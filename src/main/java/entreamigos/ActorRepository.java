package entreamigos;
import org.springframework.data.repository.CrudRepository;

public interface ActorRepository extends CrudRepository <Actor, Long> {
	public Iterable<Actor> findByName(String name);
	public Iterable<Actor> findByRating(Rating rating);
	public Iterable<Actor> findByDefaultLocation(Location location);
	public Iterable<Actor> findByMood(int mood);
	public Iterable<Actor> findByDefaultLocationNeighborhood(String s);
}
