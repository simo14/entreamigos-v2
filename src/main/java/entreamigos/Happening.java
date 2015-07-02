package entreamigos;

import java.util.List;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;


@Entity
public class Happening {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private String title;
	
	@ManyToMany(fetch = FetchType.LAZY,cascade =  CascadeType.DETACH)
	private List<Actor> attendees;
	
	@ManyToOne
	private Location location;
	
	private Date date;

	@Size(max = 2000)
	private String description;
	
	@ManyToOne
	private Actor organizer;
	
	private int prize;
	
	private String category;
	
//Constructors
	public Happening(){}
	
	public Happening(String title,List<Actor> attendees, Location location, Date date,
			 String description, Actor organizer, int prize, String category) {
		this.attendees = attendees;
		this.location = location;
		this.date = date;
		this.title = title;
		this.description = description;
		this.organizer = organizer;
		this.prize = prize;
		this.category = category;
	}
	
	
//Getters and setters
	public void setId(long id){
		this.id=id;
	}
	
	public long getId(){
		return this.id;
	}
	
	public List<Actor> getAttendees() {
		return attendees;
	}

	public void setAttendees(List<Actor> attendees) {
		this.attendees = attendees;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Actor getOrganizer() {
		return organizer;
	}

	public void setOrganizer(Actor organizer) {
		this.organizer = organizer;
	}
	
	public String getCategory(){
		return category;
	}
	
	public void setCategory(String category){
		this.category=category;
	}

	public int getPrize() {
		return prize;
	}

	public void setPrize(int prize) {
		this.prize = prize;
	}
}
