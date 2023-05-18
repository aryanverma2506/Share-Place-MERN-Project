import React, { useState } from "react";
import ReactMapboxGl, {
  GeolocateControl,
  Marker,
  FullscreenControl,
  NavigationControl,
} from "react-map-gl";
import mapboxgl from "mapbox-gl";

import styles from "./Map.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

interface MapProps extends React.PropsWithChildren {
  title: string;
  zoom: number;
  coordinates: {
    longitude: number;
    latitude: number;
  };
  className?: string;
  style?: Object;
}

function Map(props: MapProps): React.ReactElement {
  const [mapView, setMapView] = useState<string>("streets-v12");
  const popup = new mapboxgl.Popup().setHTML(props.title);

  function mapViewHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setMapView(() => event.target.value);
  }

  return (
    <>
      <div className={`${styles.map} ${props.className}`} style={props.style}>
        <ReactMapboxGl
          mapboxAccessToken={accessToken}
          initialViewState={{
            latitude: props.coordinates.latitude,
            longitude: props.coordinates.longitude,
            zoom: props.zoom,
          }}
          mapStyle={`mapbox://styles/mapbox/${mapView}`}
        >
          <Marker
            latitude={props.coordinates.latitude}
            longitude={props.coordinates.longitude}
            popup={popup}
          />
          <FullscreenControl />
          <GeolocateControl position="bottom-left" />
          <NavigationControl position="bottom-right" />
        </ReactMapboxGl>
      </div>
      <select
        className={`${styles["map-menu"]}`}
        defaultValue={mapView}
        onChange={mapViewHandler}
      >
        <option value="satellite-streets-v12">Satellite Streets</option>
        <option value="light-v11">Light</option>
        <option value="dark-v11">Dark</option>
        <option value="streets-v12">Streets</option>
        <option value="outdoors-v12">Outdoors</option>
      </select>
    </>
  );
}

export default Map;
