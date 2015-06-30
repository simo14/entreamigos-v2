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
	
	private String password;
	
	public Administrator(){
		this.rights=new boolean[5];
	}
	
	public Administrator(String password){

		for(int i=0;i<5;i++){
			this.rights[i] = true;
		}
		this.password=password;
	}
	
	public boolean[] getRights(){
		return rights;
	}
	
	public void setRights(boolean[] b){
		this.rights=b;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
