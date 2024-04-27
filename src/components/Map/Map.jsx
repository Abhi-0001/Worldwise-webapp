import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../../Contexts/CititesContext";
import useGeolocation from "../../Hooks/useGeolocation";
import Button from "../Button/Button";
import useUrlPosition from "../../Hooks/useUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapLat, mapLng] = useUrlPosition();
  const [mapPosition, setMapPosition] = useState([40, 32]);

  const {
    isLoading: isLoadingPosition,
    position: geoLocPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocPosition)
        setMapPosition([geoLocPosition.lat, geoLocPosition.lng]);
    },
    [geoLocPosition]
  );

  return (
    <>
      <div className={styles.mapContainer}>
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
        <MapContainer
          center={mapPosition}
          zoom={6}
          scrollWheelZoom={true}
          className={`${styles.map}`}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          {cities.map((city) => (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                {city.emoji} {city.country}
              </Popup>
            </Marker>
          ))}
          <ChangeMapCenter position={mapPosition} />
          <DetectMapClick />
        </MapContainer>
      </div>
    </>
  );
}

function ChangeMapCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectMapClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
