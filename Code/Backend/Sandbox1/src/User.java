import java.util.*;
import java.io.*;

//user can message other people
//Message class will be needed
//user can search Events

public class User{

    private String firstName;
    private String middleName;
    private String lastName;
    private String email;

    private String city;
    private String state;
    private int zipCode;

    private ArrayList<String> sports;
    private ArrayList<Event> events;


    //User should be able to search other friends
    //and invite them to the Event

    //user can cancel event
    //user can restrict number of users for event

    //****might need to add phone number field for user****

    //is it necessary to have a Sport class

    //should username and password be saved here
    //or somewhere else for security purposes?
    //either use DOB and calculate age
    //private Date DOB;

    //or ask for age directly
    //private int age;

    /**
     * default constructor for User object
     */
    public User(){
        firstName = middleName = lastName = email = city = state = "N/A";
        zipCode = 0;
        //age = 0;
        sports = new ArrayList<String>();
        events = new ArrayList<Event>();
    }

    /**
     * overloaded constructor for User object
     * @param UserFirstName - first name of User
     * @param UserMiddleName - middle name of User
     * @param UserLastName - last name of User
     * @param UserEmail - email address of User
     * @param UserCity - city address of User
     * @param UserState - state address of User
     * @param UserZip - zipCode of User
     * @param UserSports - preferred sports of User
     */
    public User(String UserFirstName, String UserMiddleName, String UserLastName, String UserEmail,
                String UserCity, String UserState, int UserZip, ArrayList<String> UserSports)
    {
        firstName = UserFirstName;
        middleName = UserMiddleName;
        lastName = UserLastName;
        email = UserEmail;
        city = UserCity;
        state = UserState;
        zipCode = UserZip;
        sports = UserSports;
    }

    /**
     * getter method for first name of user
     * @return - returns first Name of User as String
     */
    public String getFirstName(){
        return firstName;
    }

    /**
     * getter method for last name of User
     * @return - returns last Name of User as String
     */
    public String getLastName(){
        return lastName;
    }

    /**
     * getter method for middle name of User
     * @return - returns middle Name of User as String
     */
    public String getMiddleName(){ return middleName;}

    /**
     * getter method for full name of User
     * @return - returns full Name of User as String
     */
    public String getName(){
        if(this.middleName.equals("") || this.middleName == null)
            return getFirstName() + getLastName();
        return getFirstName() + getMiddleName() + getLastName();
    }

    /**
     * getter method for email of User
     * @return - returns email of User as String
     */
    public String getEmail(){ return email; }

    /**
     * getter method for city of User
     * @return - returns city of User as String
     */
    public String getCity(){ return city; }

    /**
     * getter method for state of User
     * @return - returns state of User as String
     */
    public String getState(){ return state; }

    /**
     * getter method for ZipCode of User
     * @return - returns ZipCode of User as int
     */
    public int getZipcode(){ return zipCode; }

    /**
     * setter method for first name of User
     * @param newFirstName - first name of User
     */
    public void setFirstName(String newFirstName){
        firstName = newFirstName;
    }

    /**
     * setter method for last name of User
     * @param newLastName - last name of User
     */
    public void setLastName(String newLastName){
        lastName = newLastName;
    }

    /**
     * setter method for middle name of User
     * @param newMiddleName - middle name of User
     */
    public void setMiddleName(String newMiddleName){
        middleName = newMiddleName;
    }

    /**
     * setter method for email of User
     * @param newEmail - email of User
     */
    public void setEmail(String newEmail){
        email = newEmail;
    }

    /**
     * setter method for City of User
     * @param newUserCity - city of User
     */
    public void setCity(String newUserCity){
        city = newUserCity;
    }

    /**
     * setter method for State of User
     * @param newUserState - state of User
     */
    public void setState(String newUserState){
        state = newUserState;
    }

    /**
     * setter method for ZipCode of User
     * @param newUserZip - ZipCode of User
     */
    public void setZipCode(int newUserZip){
        zipCode = newUserZip;
    }

    /**
     * getter method for preferred sports of User
     * @return - returns preferred sports of User
     */
    public ArrayList<String> getSports(){
        return sports;
    }

    /**
     * adds sport to sports list of User
     * @param newSport - added preferred sport of User
     */
    public void addSport(String newSport){
        sports.add(newSport);
    }

    /**
     * removes sport from sports list of User
     * @param removedSport
     */
    public void removeSport(String removedSport){
        sports.remove(removedSport);
    }

    //user can create event
    public void createEvent(){
        //no user validation entered yet
        Scanner input = new Scanner(System.in);
        System.out.println("Enter the title of the event: ");
        String eventTitle = input.nextLine();
        System.out.println("Enter the address for the event:");
        System.out.println("Street: ");
        String eventStreet = input.nextLine();
        System.out.println("City: ");
        String eventCity = input.nextLine();
        System.out.println("State: ");
        String eventState = input.nextLine();
        System.out.println("ZIP: ");
        int eventZip = input.nextInt();
        System.out.println("Enter max number of people allowed to join event: ");
        int eventLimit = input.nextInt();
        input.nextLine();
        //call Event constructor with all provided info.
        System.out.println("New Event Created.");
        events.add(new Event(eventTitle, eventStreet, eventCity, eventState, eventZip, this, eventLimit));

    }

    //public void joinEvent();
    public void joinEvent(Event newEvent){
        if(newEvent.allowJoin(this)){
            events.add(newEvent);
        }
        else{
            System.out.println("Unable to join event. You have either already joined the event" +
                    "or the limit for number of people attending event has been reached.");
        }
    }

    //view events;
    public void viewEvents(){
        for(Event joined : events){
            System.out.println(joined + "\n");
        }
    }

    //search Events;
    //query to database to search for events

    //public void leaveEvent();
    //view profile method;
}