import java.util.*;

public class Event {

    private String title;
    private String Street;
    private String City;
    private String State;
    private int ZipCode;

    private User host;

    //Event has start and end time?
    //Event can be listed as "whole day"?
    private Date date;

    private ArrayList<User> attendees;

    private int userLimit;

    /**
     * default constructor for Event object
     */
    public Event(User eventHost) {
        title = Street = City = State = "N/A";
        ZipCode = 11111;
        host = eventHost;
        date = new Date();
        attendees = new ArrayList<User>(Arrays.asList(host));;
        userLimit = 1;
    }

    /**
     * overloaded constructor for Event object that has no set date
     * @param newTitle - title of Event
     * @param newStreet - street where Event will occur
     * @param newCity - city where Event will occur
     * @param newState - state where Event will occur
     * @param newZipCode - zipCode where Event will occur
     * @param eventHost - host of Event
     * @param numPeople - limit on how many people can attend event
     */
    public Event(String newTitle, String newStreet, String newCity, String newState, int newZipCode, User eventHost, int numPeople) {
        title = newTitle;
        Street = newStreet;
        City = newCity;
        State = newState;
        ZipCode = newZipCode;
        host = eventHost;
        userLimit = numPeople;
        attendees = new ArrayList<User>(Arrays.asList(host));;
    }

    /**
     * overloaded constructor for Event object with a set date
     * @param newTitle - title of Event
     * @param newStreet - street where Event will occur
     * @param newCity - city where Event will occur
     * @param newState - state where Event will occur
     * @param newZipCode - zipcode where Event will occur
     * @param newDate - date and time of where Event will occur
     * @param numPeople - limit on how many people can attend event
     */
    public Event(String newTitle, String newStreet, String newCity, String newState, int newZipCode, User eventHost, int numPeople, Date newDate) {
        this(newTitle, newStreet, newCity, newState, newZipCode, eventHost, numPeople);
        date = newDate;
    }

    /**
     * getter method for title attribute of Event
     * @return - returns title of Event as String
     */
    public String getTitle(){
        return title;
    }

    /**
     * getter method for Street attribute of Event
     * @return - returns Street where Event will occur as String
     */
    public String getStreet(){
        return Street;
    }

    /**
     * getter method for City attribute of Event
     * @return - returns City where Event will occur as String
     */
    public String getCity(){
        return City;
    }

    /**
     * getter method for State attribute of Event
     * @return - returns State where Event will occur as String
     */
    public String getState(){
        return State;
    }

    /**
     * getter method for ZipCode attribute of Event
     * @return - returns ZipCode where Event will occur as int
     */
    public int getZipCode(){
        return ZipCode;
    }

    /**
     * getter method to display full address of Event
     * @return - returns full address of Event with
     *           Street, City, State, and ZipCode
     */
    public String getAddress(){
        return getStreet() + "\n" + getCity() + ", " + getState() + " " + getZipCode();
    }

    /**
     * getter method to display host of Event
     * @return - returns host/creator of Event
     */
    public User getHost(){
        return host;
    }

    /**
     * setter method for title attribute of Event
     * @param newTitle - title of Event
     */
    public void setTitle(String newTitle){
        title = newTitle;
    }

    /**
     * setter method for Street attribute of Event
     * @param newStreet - Street of Event
     */
    public void setStreet(String newStreet){
        Street = newStreet;
    }

    /**
     * setter method for City attribute of Event
     * @param newCity - City of Event
     */
    public void setCity(String newCity){
        City = newCity;
    }

    /**
     * setter method for State attribute of Event
     * @param newState - State of Event
     */
    public void setState(String newState){
        State = newState;
    }

    /**
     * setter method for ZipCode attribute of Event
     * @param newZip - ZipCode of Event
     */
    public void setZipCode(int newZip){
        ZipCode = newZip;
    }

    /**
     * displays attendees who have joined Event
     * @return - list of users attending the Event
     */
    public String showAttendees() {
        String s = "Attendees: [";
        for (int i = 0; i < attendees.size(); i++) {
            if (i == attendees.size() - 1) {
                s += (attendees.get(i)).getName() + "]";
            } else {
                s += (attendees.get(i)).getName() + ", ";
            }
        }
        return s;
    }

    /**
     * getter method to display how many people joined Event
     * @return - returns number of Users that joined Event
     */
    public int getNumUsers(){
        return attendees.size();
    }

    /**
     * getter method for limit on number of Users
     * @return - returns limit number of Users
     */
    public int getUserLimit(){
        return userLimit;
    }

    /**
     * setter method to set limit on how many Users can join Event
     * @param limit - limit of number of Users
     */
    public void setUserLimit(int limit){
        userLimit = limit;
    }

    /**
     * boolean method to determine if limit is reached for number of Users for an Event
     * @return - returns true if limit reached, false if limit not reached
     */
    public boolean limitReached(){
        if(attendees.size() < userLimit){
            return false;
        }
        return true;
    }

    /**
     * boolean method to determine if User can join Event, if not already joined and limit not reached on Event
     * @param newUser - User who wants to join Event
     * @return - returns true if User can join Event, false if User cannot join Event.
     */
    public boolean allowJoin(User newUser){
        if(!attendees.contains(newUser) && !limitReached()){
            attendees.add(newUser);
            return true;
        }
        return false;
    }

    //returns true if event has started
    public boolean eventStart(){
        return true;
    }

    /**
     * Overridden toString method to display Event details
     * @return - returns title and full address of Event
     */
    @Override
    public String toString(){
        String s = String.format("%20s\n%30s\n%20s, %2s %5d", title, Street, City, State, ZipCode);
        return s;
    }

    /*
    //returns date details of Event
    public Date getDateDetails(){
        return new Date();
    }

    public void setDate(Date newDate){
        date = newDate;
    }
    */

}
