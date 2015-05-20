package entreamigos;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name="ActorId")
public class Organization extends Actor{	//By extending Actor Organization is provided with a name, a list of events, rating and friends
	/*@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;*/
	
	@OneToOne
	private Person head;
	private String principles; //Organization's description or principles
	
	@OneToMany
	private List<Person> crew;
	
//Constructor
	public Organization() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Organization(String name, String bio, int mood, List<Happening> happenings,
			Rating rating, List<Person> friends, Person head, String principles, List<Person> crew, Location defaultLocation) {
		super(name, bio, mood,happenings, rating,defaultLocation);
		// TODO Auto-generated constructor stub
		this.head=head;
		this.principles=principles;
		this.crew=crew;
	}
	
//Getter and setters
	public Person getHead() {
		return head;
	}
	public void setHead(Person head) {
		this.head = head;
	}
	public String getPrinciples() {
		return principles;
	}
	public void setPrinciples(String principles) {
		this.principles = principles;
	}
	
	public List<Person> getCrew(){
		return this.crew;
	}
	public void setCrew(List<Person> crew){
		this.crew=crew;
	}
}
