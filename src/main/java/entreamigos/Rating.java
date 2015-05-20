package entreamigos;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Rating {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	private static int MIN=0;
	private static int MAX=5;
	private int rating;
	
//Constructor
	public Rating(){}
	
	public Rating(int n){
		setRating(n);
	}
	
	public void setRating(int n){
		if(MIN<=n && MAX>=n){
			this.rating=n;
		}else if (MIN>n){
			rating=MIN;
		}else if(MAX<n){
			rating=MAX;
		}
	}
	
	public int getRating(){
		return rating;
	}
}
