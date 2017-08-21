import { default as React, Component } from 'react';
import { render } from 'react-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { Station, Network } from './models.js';


let Map = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={props.zoom}
        defaultCenter={props.center}
    >
        {props.markers.map((marker, index) => (
            <Marker
                key={index}
                {...marker}
                onClick={() => props.onMarkerClick(marker)}
            >
                {marker.showInfo && (
                    <InfoWindow onCloseClick={() => props.onCloseClick(marker)}>
                        <div>
                            <ul>
                                <li>Name: {marker.key}</li>
                                <li>Free bikes: {marker.freeBikes}</li>
                                <li>
                                    Available slots:
                                    <button name="addSlot">-</button>
                                    <span id="numberOfSlots">{marker.emptySlots}</span>
                                    <button name="subtractSlot">+</button>
                                </li>
                                <li>Average Review Rating: ★★★½</li>
                                <li><button name="addReview">Add Review</button></li>
                            </ul>
                        </div>
                    </InfoWindow>
                )}
            </Marker>
        ))}
    </GoogleMap>
));



const VIEW_MODES = {
    STATIONS: "stations",
    NETWORKS: "networks",
};


class GettingStartedExample extends Component {
    constructor(props) {
        super(props)

        this.dummyNetwork = new Network({ lat: 49.8225, lng: 19.044444, key: "BBBike" });

        this.dummyNetwork.addStation({ lat: 49.815247, lng: 19.044895, name: "08 Plac Mickiewicza", timestamp: "2017-08-20T20:33:24.186000Z", id: "34eff3b3b29182f81ba630f51b1a0637", emptySlots: 6, freeBikes: 6 });

        this.dummyNetwork.addStation({ lat: 49.830307, lng: 19.043732, name: "02 Dworzec PKS", timestamp: "2017-08-20T20:33:24.177000Z", id: "a0c8e551bca2632f7b78035df4e9d715", emptySlots: 0, freeBikes: 12 });
        this.dummyNetwork.addStation({ lat: 49.82578, lng: 19.031815, name: "04 Starostwo Powiatowe", timestamp: "2017-08-20T20:33:24.182000Z", id: "30c883777ca09556b00ee7764fc268a5", emptySlots: 7, freeBikes: 5 });
        this.dummyNetwork.addStation({ lat: 49.805598, lng: 19.057252, name: "11 ul. \u0141agodna/Z\u0142ote \u0141any", timestamp: "2017-08-20T20:33:24.189000Z", id: "4b875887b47798686ce74666a7c39d41", emptySlots: 3, freeBikes: 6 });
        this.networks = [this.dummyNetwork]
        this.state = {
            viewMode: VIEW_MODES.NETWORKS,
            zoom: 3,
            markers: this.networks,
            center: { lat: 40.7624284, lng: -73.973794 },
        };

        this.handleMarkerClick = this.handleMarkerClick.bind(this);
        this.handleCloseClick = this.handleCloseClick.bind(this);


    }

    handleMarkerClick(targetMarker) {

        if (this.state.viewMode == VIEW_MODES.NETWORKS) {

            this.setState((prevState) => {
                const nextMarkers = this.state.markers.filter(marker => {
                    return marker === targetMarker
                });
                let network = nextMarkers[0];
                return {
                    viewMode: VIEW_MODES.STATIONS,
                    zoom: 10,
                    center: network.position,
                    markers: network.stations,
                }
            }
            );
        }
        else {
            this.setState({
                markers: this.state.markers.map((marker) => {
                    marker.showInfo = (marker === targetMarker)
                    return marker;
                })
            })
        }
    }

    handleCloseClick(targetMarker) {
        this.setState({
            markers: this.state.markers.map(marker => {
                marker.showInfo = false;
                return marker;
            }),
        });
    }


    render() {
        return (
            <div style={{ height: `100%` }}>
                <Map
                    containerElement={
                        <div style={{ height: `500px` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    zoom={this.state.zoom}
                    center={this.state.center}
                    markers={this.state.markers}
                    onMarkerClick={this.handleMarkerClick}
                    onCloseClick={this.handleCloseClick}

                />
            </div>
        );
    }


}

render(
    <GettingStartedExample />,
    document.getElementById('container')
);
