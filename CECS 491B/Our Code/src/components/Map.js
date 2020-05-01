import React, {Component} from 'react'
import "./Map.css"
import {Button, Table} from 'react-bootstrap'
import firebase from '../Backend/Firestore'
import SimpleBarReact from 'simplebar-react'
import "simplebar/src/simplebar.css"


const google = window.google
class Maps extends Component
{
    constructor(props)
    {
        super(props)
    }


    componentDidMount = e => {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                function initMap() {
                    /*
                    //Get user's current location
                    // Try HTML5 geolocation.
                    if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function(position) {
                            var pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            infoWindow.setPosition(pos);
                            infoWindow.setContent('Location found.');
                            infoWindow.open(map);
                            map.setCenter(pos);
                            zoom:15;

                            }, function() {
                            handleLocationError(true, infoWindow, map.getCenter());
                            });
                    } else {
                        // Browser doesn't support Geolocation
                        handleLocationError(false, infoWindow, map.getCenter());
                        }

                    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                        infoWindow.setPosition(pos);
                        infoWindow.setContent(browserHasGeolocation ?
                                                'Error: The Geolocation service failed.' :
                                                'Error: Your browser doesn\'t support geolocation.');
                        infoWindow.open(map);
                    }
                    */

                    // set map to center around CSULB
                    var options = 
                    {
                        zoom:14,
                        center:{lat: 33.784626, lng: -118.114176}
                    }
                    
                    var map = new google.maps.Map(document.getElementById("map"), options)

                    // array of event addresses
                    var events = 
                    [
                        {
                            coords:{lat:33.788353, lng:-118.123562},
                            content:'<h1>Los Altos Family YMCA</h1>'
                        }, 
                        {
                            coords:{lat:33.790707, lng:-118.121503},
                            content:'<h1>Whaley Park</h1>'
                        },
                        {
                            coords:{lat:33.771088, lng:-118.127768},
                            content:'<h1>Marina Vista Park</h1>'
                        }
                    ]

                    // Add marker function
                    // props: LatLng datatype
                    function addMarker(props)
                    {
                        var marker = new google.maps.Marker(
                        {
                            position:props.coords,
                            map:map,
                            icon:props.iconImage
                        });

                        if (props.content)
                        {
                            var infoWindow = new google.maps.InfoWindow(
                            {
                                content:props.content
                            })

                            marker.addListener('click', function()
                            {
                                infoWindow.open(map, marker)
                            })
                        }
                    }

                    for (var i = 0; i < events.length; i++)
                    {
                        addMarker(events[i]);
                    } 
                    
                    // Search box
                    var input = document.getElementById('pac-input');
                    var searchBox = new google.maps.places.SearchBox(input);
                    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                    // Keep search results local to centered location
                    map.addListener('bounds_changed', function() {
                        searchBox.setBounds(map.getBounds());
                    });

                    var markers = [];

                    searchBox.addListener('places_changed', function() {
                        var places = searchBox.getPlaces();

                        if (places.length == 0)
                        {return;}

                        // removes markets not related to search
                        markers.forEach(function(marker) {
                            marker.setMap(null);
                        });
                        markers = [];

                        // for each result, put icon, name, and location information
                        var bounds = new google.maps.LatLngBounds();
                        places.forEach(function(place){
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0,0),
                                anchor: new google.maps.Point(17,34),
                                scaledSize: new google.maps.Size(25,25)
                            };
        
                            var infoWindow = new google.maps.InfoWindow({
                                content: place.name
                            })

                            var marker = new google.maps.Marker({
                                map: map,
                                icon: icon,
                                title: place.name,
                                position: place.geometry.location
                            });

                            // Add marker to all search results
                            markers.push(marker);

                            marker.addListener('click', function()
                            {
                                infoWindow.open(map, marker)
                            })

                            if (place.geometry.viewport) {
                                bounds.union(place.geometry.viewport);
                            }
                            else {
                                bounds.extend(place.geometry.location);
                            }
                        });
                        map.fitBounds(bounds);
                    });
                }    
            } 
        })
    }
}

export default Map;