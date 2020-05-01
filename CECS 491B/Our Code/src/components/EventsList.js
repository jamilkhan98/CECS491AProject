import React, {Component} from 'react';
import "./EventsList.css"
import {Button, Table} from 'react-bootstrap'
import firebase from '../Backend/Firestore';
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

class EventsList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = e => {
        document.getElementById("events-tbody").innerHTML = null;
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                firebase.firestore().collection("events").where("date", ">=", new Date())
                .orderBy("date").get()
                .then(function(querySnapshot)
                {querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        if(!doc.data().attendees.includes(firebaseUser.uid)){
                            document.getElementById("noEvents").className = "collapse";
                            document.getElementById("events-thead").className="collapse.show";
                            
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
                            var startCell = document.createTextNode(doc.data().startTime);
                            start.appendChild(startCell);
                            
                            var end = document.createElement("td");
                            var endCell = document.createTextNode(doc.data().endTime);
                            end.appendChild(endCell);

                            //EDIT: WILL SHOW LIST OF USERS WHO HAVE JOINED THIS EVENT
                            var joined = document.createElement("td");
                            var joinedLink = document.createElement("a");
                            joinedLink.appendChild(document.createTextNode("View Attendees"));
                            joinedLink.href = '#';

                            joinedLink.onclick = function(){
                                document.getElementById("closeList").onclick = function() {
                                  document.getElementById("attendees").className = "collapse";
                                }
                                document.getElementById("confirmJoin").className = "collapse";
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

                            joined.appendChild(joinedLink);

                            var host = document.createElement("td");
                            var hostLink = document.createElement("a");
                            firebase.firestore().collection("user").doc(doc.data().hostID)
                            .get().then(function(doc) {
                                var hostName = document.createTextNode(doc.data().firstName + " " + doc.data().lastName);
                                var userID = doc.id;
                                hostLink.href = "otherProfile?userID=" + userID;

                                hostLink.appendChild(hostName);
                            })
                            host.appendChild(hostLink);

                            var join = document.createElement("td");
                            var joinLink = document.createElement("a");
                            joinLink.appendChild(document.createTextNode("+"));
                            joinLink.href = '#'

                            joinLink.onclick = function() {
                                document.getElementById("attendees").className = "collapse";
                                document.getElementById("confirmJoin").className = "collapse.show";
                                
                                document.getElementById("cancelJoin").onclick = function(){
                                    document.getElementById("confirmJoin").className = "collapse";
                                }
                                document.getElementById("finishJoin").onclick = function(){
                                    alert("This event will now be added to your schedule.");
                                    firebase.firestore().collection("user").doc(firebaseUser.uid).update({
                                        joinedEvents: firebase.firestore.FieldValue.arrayUnion(doc.id)
                                    })
                                    firebase.firestore().collection("events").doc(doc.id).update({
                                        attendees: firebase.firestore.FieldValue.arrayUnion(firebaseUser.uid)
                                    }).then(function() {
                                        window.location.replace("/schedule");
                                    }).catch(function(error) {
                                        window.alert("Error adding document: ", error);
                                    });
                                }
                            }
                            join.appendChild(joinLink);

                            // var hostID = document.createElement("td");
                            // var split = doc.data().attendees.toString().split(",");
                            
                            // var idLink = document.createElement("a");
                            // idLink.href = '#';
                            // idLink.appendChild(document.createTextNode(split[0]));
                            // hostID.appendChild(idLink);
                            
                            // var idText = document.createElement("p");
                            // idText.appendChild(document.createTextNode(",,,,,,,"));
                            // hostID.appendChild(idText);

                            // idLink = document.createElement("a");
                            // idLink.href = '#';
                            // idLink.appendChild(document.createTextNode(split[1]));
                            // hostID.appendChild(idLink);

                            // idText = document.createElement("p");
                            // idText.appendChild(document.createTextNode(",,,,,,"));
                            // hostID.appendChild(idText);

                            row.appendChild(host);
                            row.appendChild(title);
                            row.appendChild(sport);
                            row.appendChild(loc);
                            row.appendChild(date);
                            row.appendChild(start);
                            row.appendChild(end);
                            row.appendChild(join);
                            row.appendChild(joined);
                            document.getElementById("events-tbody").appendChild(row);
                        }
                    });
                });
            }
        })
    }

    sortTable(n) {
        // console.log("printing first means did not complete mount")
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("events-table");
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

    render() {
        return(
            <div className="events-wrapper">
                <div className="simplebar-wrapper">
                <h2 style={{textAlign: "center"}}>Events List</h2>
                    <SimpleBarReact style={{ maxHeight: 400 }}>
                        <Table id="events-table" striped bordered hover>
                        <thead>
                            <tr id="events-thead" className = "collapse">
                                <th>Hosted By</th>
                                <th><a onClick={this.sortTitle}>Title</a></th>
                                <th><a onClick={this.sortSport}>Sport</a></th>
                                <th><a onClick={this.sortLocation}>Location</a></th>
                                <th><a onClick={this.sortDate}>Date</a></th>
                                <th><a onClick={this.sortStart}>Start Time</a></th>
                                <th><a onClick={this.sortEnd}>End Time</a></th>
                                <th>Join</th>
                                <th>View Attendees</th>
                            </tr>
                        </thead>
                        <tbody id="events-tbody">
                        </tbody>
                        </Table>
                    </SimpleBarReact>
                    <div id="noEvents" className="collapse.show">
                        <p>No more events are available.</p>
                        <p>You can create an event from the Schedule page.</p>
                    </div>
                    <div id="confirmJoin" className="collapse">
                        <p>Are you sure you want to add this event to your schedule?</p>
                        <p id="eventInfo"></p>
                        <Button id="cancelJoin" className="mr-4" variant="danger">No</Button>
                        <Button id="finishJoin" className="ml-4" variant="success">Yes</Button>
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

export default EventsList;