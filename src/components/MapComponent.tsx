import React, { useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { MapContainer, TileLayer } from "react-leaflet";
import { DraggableMarker } from "./MapDrawer";

interface MapComponentProps {
  initialPosition?: L.LatLngExpression;
  setValue: UseFormSetValue<{
    lat: number;
    lon: number;
  }>;
}

const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition = [18.514707, -72.276647],
  setValue,
}) => {
  const [markerPosition, setMarkerPosition] =
    useState<L.LatLngExpression>(initialPosition);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (markerPosition) {
      setValue("lat", Number(markerPosition[0]));
      setValue("lon", Number(markerPosition[1]));
    }
  }, [markerPosition, setValue]);

  useEffect(() => {
    if (initialPosition && mapRef.current) {
      mapRef.current.flyTo(initialPosition, 18);
      setMarkerPosition(initialPosition);
    }
  }, [initialPosition]);

  return (
    <div data-vaul-no-drag className="relative space-y-2 p-4 pb-0">
      <MapContainer
        center={initialPosition}
        zoom={18}
        ref={mapRef}
        scrollWheelZoom={false}
        id="map"
        style={{ height: "400px", width: "100%", borderRadius: 12 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker
          initialPosition={markerPosition ?? initialPosition}
          setMarkerPosition={setMarkerPosition}
          setValue={setValue}
        />{" "}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
