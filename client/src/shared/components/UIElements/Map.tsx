import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import styles from "./Map.module.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN!;

interface MapProps extends React.PropsWithChildren {
  title: string;
  zoom: number;
  center: [number, number];
  className?: string;
  style?: Object;
}

function Map(props: MapProps): React.ReactElement {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapView, setMapView] = useState<string>("outdoors-v12");

  const { title, center, zoom } = props;

  useEffect(() => {
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${mapView}`,
        center: center,
        zoom: zoom,
      });
      const marker = new mapboxgl.Marker().setLngLat(center).addTo(map);
      const popup = new mapboxgl.Popup().setHTML(title);
      marker.setPopup(popup);
    }
  }, [mapView, title, center, zoom]);

  function mapViewHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    setMapView(() => event.target.value);
  }

  return (
    <>
      <div
        className={`${styles.map} ${props.className}`}
        style={props.style}
        ref={mapContainer}
      ></div>
      <select
        className={`${styles["map-menu"]}`}
        defaultValue={"outdoors-v12"}
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
