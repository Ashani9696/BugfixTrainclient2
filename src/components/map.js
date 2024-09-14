import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MyMap = ({ path = [], markers = [], currentLocation = {latitude: 7.2906, longitude: 80.6337} }) => {
  const convertedPath = convertPath(path);

  // Add current location as the last point in the path if it exists
  if (currentLocation) {
    convertedPath.push([currentLocation.latitude, currentLocation.longitude]);
  }

  return (
    <MapContainer center={[6.9271, 79.9612]} zoom={8} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {convertedPath.length > 1 && <Polyline positions={convertedPath} />}
      {markers.map((marker, index) => (
        <Marker
          key={index} 
          position={[marker.latitude, marker.longitude]}
          icon={L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [29, 51],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            shadowSize: [41, 41]
          })}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
      {currentLocation && (
        <Marker
          position={[currentLocation.latitude, currentLocation.longitude]}
          icon={L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            shadowSize: [41, 41]
          })}
        >
          <Popup>Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

const convertPath = (path) => {
  return path.map(point => [point.latitude, point.longitude]);
};

export default MyMap;
