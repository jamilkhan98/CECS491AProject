import React, {Component} from 'react';
import "./Schedule.css"
import { Button, Table} from 'react-bootstrap';
import firebase from '../Backend/Firestore';
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import CreateEvent from './CreateEvent';

class Schedule extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount = e => {
        document.getElementById("schedule-tbody").innerHTML = null;
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                firebase.firestore().collection("events").where("attendees", "array-contains", firebaseUser.uid)
                .get().then(function(querySnapshot)
                {querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        document.getElementById("noEvents").className = "collapse";
                        document.getElementById("schedule-thead").className="collapse.show";
                        var eventInfo = "Title: " + doc.data().title + "<br/>Sport: " + doc.data().sport + "<br/>Where: " + doc.data().location + "<br/>When: " + doc.data().date.toDate().toDateString() + "<br/>Time: " + doc.data().startTime + " to " + doc.data().endTime;


                        var row = document.createElement("tr");
                        
                        var title = document.createElement("td");
                        var titleCell = document.createTextNode(doc.data().title);
                        title.appendChild(titleCell);
                        
                        var sport = document.createElement("td");
                        var sportCell = document.createTextNode(doc.data().sport);
                        sport.appendChild(sportCell);

                        var loc = document.createElement("td");
                        var locCell = document.createTextNode(doc.data().location);
                        loc.appendChild(locCell);

                        var date = document.createElement("td");//either use toDateString() or toLocaleDateString()
                        var dateCell = document.createTextNode(doc.data().date.toDate().toLocaleDateString());
                        date.appendChild(dateCell);

                        var start = document.createElement("td");
                        var startTime = doc.data().startTime;
                        var startCell = document.createTextNode(startTime);
                        start.appendChild(startCell);
                        
                        var end = document.createElement("td");
                        var endTime = doc.data().endTime;
                        var endCell = document.createTextNode(endTime);
                        end.appendChild(endCell);

                        var cancel = document.createElement("td");
                        var cancelLink = document.createElement("a");
                        cancelLink.appendChild(document.createTextNode("X"));
                        cancelLink.href = '#';
                        cancelLink.onclick = function() {
                            document.getElementById("attendees").className = "collapse";
                            document.getElementById("confirmForm").className = "collapse.show";
                            document.getElementById("eventInfo").innerHTML = eventInfo;
                            
                            document.getElementById("confirmClose").onclick = function(){
                                document.getElementById("confirmForm").className = "collapse";
                            }
                            document.getElementById("confirmCancel").onclick = function(){
                                if(doc.data().hostID === firebaseUser.uid){
                                    alert("This event will now be deleted");
                                    firebase.firestore().collection("user").doc(firebaseUser.uid).update({
                                        createdEvents: firebase.firestore.FieldValue.arrayRemove(doc.id),
                                        joinedEvents: firebase.firestore.FieldValue.arrayRemove(doc.id)
                                    })
                                    firebase.firestore().collection("events").doc(doc.id).delete().then(function() {
                                        console.log("Document " + doc.id + " successfully deleted");
                                        window.location.replace("/schedule");
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });
                                }
                                else{
                                    alert("This event will be removed from your schedule.\nYou will be removed from attendee list.");
                                    firebase.firestore().collection("user").doc(firebaseUser.uid).update({
                                        joinedEvents: firebase.firestore.FieldValue.arrayRemove(doc.id)
                                    })
                                    firebase.firestore().collection("events").doc(doc.id).update({
                                        attendees: firebase.firestore.FieldValue.arrayRemove(firebaseUser.uid)
                                    }).then(function() {
                                        window.location.replace("/schedule");
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });
                                }    
                            }
                        }
                        cancel.append(cancelLink);

                        //EDIT: WILL SHOW LIST OF USERS WHO HAVE JOINED THIS EVENT
                        var joined = document.createElement("td");
                        var joinedCell = document.createElement("a");
                        joinedCell.appendChild(document.createTextNode("View Attendees"));
                        joinedCell.href = '#';

                        joinedCell.onclick = function(){
                            document.getElementById("closeList").onclick = function() {
                                document.getElementById("attendees").className = "collapse";
                            }
                            document.getElementById("confirmForm").className = "collapse";
                            var list = document.getElementById("attendeeList");
                            list.innerHTML = "";
                            for(var user of doc.data().attendees){
                                firebase.firestore().collection("user").doc(user).get()
                                .then(function(doc){
                                    //list.innerHTML += "<li>" + doc.data().firstName + " " + doc.data().lastName + "</li>"
                                    var listItem = document.createElement("li");
                                    var nameItem = document.createTextNode(doc.data().firstName + " " + doc.data().lastName);
                                    listItem.appendChild(nameItem);
                                    list.appendChild(listItem);
                                })
                            }
                            // console.log(list.innerText);
                            // document.getElementById("attendeeList").innerHTML = list.innerHTML;
                            document.getElementById("attendees").className = "collapse.show"
                        }

                        joined.appendChild(joinedCell);

                        var host = document.createElement("td");
                        var hostLink = document.createElement("a");
                        if(doc.data().hostID === firebaseUser.uid){
                            var hostName = document.createTextNode("You");
                            hostLink.href="/profile";
                            hostLink.appendChild(hostName);
                        }
                       else{
                            firebase.firestore().collection("user").doc(doc.data().hostID)
                            .get().then(function(doc) {
                                var hostName = document.createTextNode(doc.data().firstName + " " + doc.data().lastName);
                                hostLink.href = "otherProfile?userID=" + doc.id;
                                hostLink.appendChild(hostName);
                            })
                        }
                        host.appendChild(hostLink);

                        row.append(host);
                        row.appendChild(title);
                        row.appendChild(sport);
                        row.appendChild(loc);
                        row.appendChild(date);
                        row.appendChild(start);
                        row.appendChild(end);
                        row.appendChild(cancel);
                        row.appendChild(joined);
                        document.getElementById("schedule-tbody").appendChild(row);
                    });
                });
            }
        })
    }

sortTable(n) {
// console.log("printing first means did not complete mount")
var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
table = document.getElementById("schedule-table");
switching = true;
//Set the sorting direction to ascending:
dir = "asc"; 
/*Make a loop that will continue until
no switching has been done:*/
while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
    //start by saying there should be no switching:
    shouldSwitch = false;
    /*Get the two elements you want to compare,
    one from current row and one from the next:*/
    x = rows[i].getElementsByTagName("TD")[n];
    y = rows[i + 1].getElementsByTagName("TD")[n];
    /*check if the two rows should switch place,
    based on the direction, asc or desc:*/
    if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            //if so, mark as a switch and break the loop:
            shouldSwitch= true;
            break;
        }
    } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                //if so, mark as a switch and break the loop:
                shouldSwitch = true;
                break;
            }
        }
    }
    if (shouldSwitch) {
    /*If a switch has been marked, make the switch
    and mark that a switch has been done:*/
    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
    switching = true;
    //Each time a switch is done, increase this count by 1:
    switchcount ++;      
    } else {
    /*If no switching has been done AND the direction is "asc",
    set the direction to "desc" and run the while loop again.*/
        if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
        }
    }
}
}

sortTitle = e => {
    e.preventDefault();
    this.sortTable(1);
}

sortSport = e => {
    e.preventDefault();
    this.sortTable(2);
}

sortLocation = e => {
    e.preventDefault();
    console.log("This function should be able to sort rows based on location name.")
    console.log("If Google Maps API is connected and works, could use that as location.")
}

sortDate = e => {
    e.preventDefault();
    this.sortTable(4);
}

sortStart = e => {
    e.preventDefault();
    this.sortTable(5);
}

sortEnd = e => {
    e.preventDefault();
    this.sortTable(6);
}

    showForm = e => {
        e.preventDefault();
        document.getElementById("noEvents").className = "collapse"
        document.getElementById("eventForm").className = "event-form-wrapper collapse.show"
        document.getElementById("hidden").style.display = "none"
    };

    render(){
        return(
            <div className="schedule-wrapper">
                <div className="simplebar-wrapper">
                <h2 style={{textAlign:"center"}}>Scheduled Events</h2>
                    <SimpleBarReact style={{ maxHeight: 400 }}>
                        <Table id="schedule-table"striped bordered hover>
                        <thead>
                            <tr id="schedule-thead" className = "collapse">
                                <th>Hosted By</th>
                                <th><a onClick={this.sortTitle}>Title</a></th>
                                <th><a onClick={this.sortSport}>Sport</a></th>
                                <th><a onClick={this.sortLocation}>Location</a></th>
                                <th><a onClick={this.sortDate}>Date</a></th>
                                <th><a onClick={this.sortStart}>Start Time</a></th>
                                <th><a onClick={this.sortEnd}>End Time</a></th>
                                <th>Leave/Cancel</th>
                                <th>View Attendees</th>
                            </tr>
                        </thead>
                        <tbody id="schedule-tbody">
                        </tbody>
                        </Table>
                    </SimpleBarReact>
                    <div id="noEvents" className="collapse.show">
                        <p>You currently have no events in your schedule.</p>
                        <p>To join an event, check out the 'Events' page of our website.</p>
                        <p>To create an event, you can click the 'Create Event' button below.</p>
                    </div>
                    <div className="newEvent">
                        <button id="hidden" onClick={this.showForm}>Create Event</button>
                        <CreateEvent />
                    </div>
                    <div id="confirmForm" className="collapse">
                        <p>Are you sure you want to remove this event from your schedule?</p>
                        <p id="eventInfo"></p>
                        <Button id="confirmCancel" className="mr-4" variant="danger">Yes</Button>
                        <Button id="confirmClose" className="ml-4" variant="success">No</Button>
                    </div>
                    <div id="attendees" className="collapse">
                        <ol id="attendeeList">
                        </ol>
                        <Button id="closeList" variant="success">Close List</Button>
                    </div>
                </div>            
            </div>
        )
    }
}

export default Schedule;