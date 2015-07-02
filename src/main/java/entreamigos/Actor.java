package entreamigos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)	//Tabla para comunes y tablas hijas con info concreta.
public abstract class Actor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)	//Ponía Type.TABLE: http://stackoverflow.com/questions/916169/cannot-use-identity-column-key-generation-with-union-subclass-table-per-clas
	private long id;
	protected String name;
	
	protected String bio;
	
	protected int mood;
	
	@ManyToMany(cascade =  CascadeType.DETACH)
	protected List<Happening> happenings;
	
	@ManyToOne
	protected Rating rating;
	
	@ManyToOne
	protected Location defaultLocation;
	
	public Actor(){}
	public Actor(String name, String bio, int mood, List<Happening> happenings, Rating rating, Location defaultLocation){
		this.name=name;
		this.bio=bio;
		this.mood=mood;
		this.happenings=happenings;
		this.rating=rating;
		this.defaultLocation=defaultLocation;
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public int getMood() {
		return mood;
	}
	public void setMood(int mood) {
		this.mood = mood;
	}
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Happening> getHappenings() {
		return happenings;
	}

	public void setHappenings(List<Happening> happenings) {
		this.happenings = happenings;
	}

	public Rating getRating() {
		return rating;
	}

	public void setRating(Rating rating) {
		this.rating = rating;
	}
	public Location getDefaultLocation(){
		return this.defaultLocation;
	}
	public void setDefaultLocation(Location defaultLocation){
		this.defaultLocation=defaultLocation;
	}
}
