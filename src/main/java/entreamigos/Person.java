package entreamigos;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.PrimaryKeyJoinColumn;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@PrimaryKeyJoinColumn(name="ActorId")
public class Person extends Actor{
/*	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;*/
	
	@ManyToMany
	//Avoids infinite loop when asking for friends (bidirectional relation). Instead, friends are return without friend's field, and to see them a get request must be performed with its id
	//http://stackoverflow.com/questions/3325387/infinite-recursion-with-jackson-json-and-hibernate-jpa-issue
	@JsonIgnore							
	private List<Actor> friends;
	
//Constructors
	public Person(){}
	
	public Person(String name, String bio, int mood, Location defaultLocation){
		super(name,bio,1,null,null,defaultLocation);
		this.friends = new ArrayList<Actor>();
	}
	
	public Person(String name, String bio, int mood, List<Happening> happenings, Rating rating,
			List<Actor> friends,Location defaultLocation) {
		super(name,bio,mood,happenings,rating,defaultLocation);
		this.friends = friends;
	}
	
//Getters and setters
	public List<Actor> getFriends() {
		return friends;
	}

	public void setFriends(List<Actor> friends) {
		this.friends = friends;
	}
}
