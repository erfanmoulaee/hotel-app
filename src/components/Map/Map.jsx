import React, { useEffect, useState } from "react";
import { useHotels } from "../context/HotelsProvider";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocation";

function Map() {
  const { isLoading, hotels } = useHotels();
  const [mapCenter, setMapCenter] = useState([50, 4]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const { isLoading: isLoadingPosiotion, position: geoLocationPosition, getPosition } = useGeoLocation();

  // get lat&lng and save in useState with useEffect
  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer className="map" center={mapCenter} zoom={13} scrollWheelZoom={true}>
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosiotion ? "Loading ..." : "Use Your Location"}
        </button>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        <ChangeCenter position={mapCenter} />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
}

export default Map;

//use function change location with click on single hotels
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
