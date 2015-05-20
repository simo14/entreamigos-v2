package entreamigos;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String neighborhood;
	private String city;
	private String completeAddress;
	
	@OneToMany
	private List<Happening> happenings;

	
//Constructors
	public Location(){}
	
	public Location(String neighborhood, String city, String completeAddress, List<Happening> happenings) {
		super();
		this.neighborhood = neighborhood;
		this.city = city;
		this.completeAddress = completeAddress;
		this.happenings = happenings;
	}

//Getters and setters
	public String getNeighborhood() {
		return neighborhood;
	}

	public void setNeighborhood(String neighborhood) {
		this.neighborhood = neighborhood;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCompleteAddress() {
		return completeAddress;
	}

	public void setCompleteAddress(String completeAddress) {
		this.completeAddress = completeAddress;
	}

	public List<Happening> getHappenings() {
		return happenings;
	}

	public void setHappenings(List<Happening> happenings) {
		this.happenings = happenings;
	}
	
}
