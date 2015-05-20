package entreamigos;
import org.springframework.data.repository.CrudRepository;

public interface LocationRepository extends CrudRepository <Location, Long> {
	public Iterable<Location>findByNeighborhoodContaining(String sw);	//Suggestions while typing location
	public Iterable<Location> findByNeighborhood(String sw);
}
