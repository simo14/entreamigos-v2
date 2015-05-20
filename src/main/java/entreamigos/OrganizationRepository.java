package entreamigos;
import org.springframework.data.repository.CrudRepository;

public interface OrganizationRepository extends CrudRepository <Organization, Long> {
	public Iterable<Organization> findByHead(Person head);
}
