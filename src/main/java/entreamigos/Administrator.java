package entreamigos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Administrator{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private boolean[] rights;	//A true in each field is an ability to perform certain action
	
	public Administrator(){
		super();
		this.rights=new boolean[5];
	}
	public Administrator(boolean[] rights){

		this.rights=rights;
	}
	
	public boolean[] getRights(){
		return rights;
	}
	
	public void setRights(boolean[] b){
		this.rights=b;
	}
}
