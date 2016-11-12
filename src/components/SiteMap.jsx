import React from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker
} from "react-google-maps";

const INITIAL_CENTER = { lat: -25.363882, lng: 131.044922 };

export default class SimpleMap extends React.Component {
  render() {
    return (
      <section
        style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
      }}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%"
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={13}
              defaultCenter={{lat: 49.19106, lng: 16.611419}}
            >
              <Marker
                defaultPosition={INITIAL_CENTER}
                title="Click to zoom"
                onClick={() => {console.log('clicked!')}}
              />
            </GoogleMap>
          }
        />
      </section>
    );
  }
}
