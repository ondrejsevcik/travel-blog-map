import React from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker
} from "react-google-maps";
import { connect } from 'react-redux'
import {
  zoomChanged,
  positionChanged,
  selectBlogpost,
  fetchBlogposts,
} from '../actions';

function dispatchMapMoved(dispatch, map) {
  const bounds = map.getBounds();
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  dispatch(fetchBlogposts({
    lat_from: southWest.lat(),
    lat_to: northEast.lng(),
    lng_from: southWest.lng(),
    lng_to: northEast.lat(),
  }))
}

// TODO: rename to something with a better name
class SimpleMap extends React.Component {
  static propTypes = {
    blogposts: React.PropTypes.array.isRequired,
    zoom: React.PropTypes.number.isRequired,
    position: React.PropTypes.object.isRequired,
  };

  render() {
    const {
      dispatch,
    } = this.props;

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
              ref={map => {
                if (map) {
                  this.map = map;
                }
              }}
              zoom={this.props.zoom}
              center={this.props.position}
              options={{
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false
              }}
              onCenterChanged={() => {
                const center = this.map.getCenter();
                const position = {
                  lng: center.lng(),
                  lat: center.lat()
                };

                dispatch(positionChanged(position));

                dispatchMapMoved(dispatch, this.map);
              }}
              onZoomChanged={() => {
                dispatch(zoomChanged(this.map.getZoom()))
                dispatchMapMoved(dispatch, this.map);
              }}
            >
              {this.props.blogposts.map(blogpost =>
                <Marker
                  key={blogpost.url}
                  position={{lng: blogpost.lng, lat: blogpost.lat}}
                  title={blogpost.title}
                  onClick={() => dispatch(selectBlogpost(blogpost.url))}
                />
              )}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    zoom: state.zoom,
    blogposts: state.blogposts,
    position: state.position,
  }
};

// TODO: sitemap is not a container
export default connect(mapStateToProps)(SimpleMap)
