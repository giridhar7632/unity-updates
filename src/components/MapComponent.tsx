import * as L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { supabase } from "~/lib/client";
import { useToast } from "./ui/use-toast";
import { formatDistanceToNow } from "date-fns";
import { MapComponentProps, customIcon } from "./MapDrawer";

const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition = [18.514707, -72.276647],
}) => {
  const { toast } = useToast();
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase.from("reports").select("*");
      if (error) {
        toast({
          title: "Error",
          description: error.message,
        });
      } else {
        setReports(data);
      }
    }

    fetchReports();
  }, []);

  function MultipleMarkers() {
    return reports.map(({ id, name, created_at, lat, lon, category }) => {
      return (
        <Marker
          key={id}
          position={[lat, lon]}
          icon={
            category === "default"
              ? customIcon
              : L.icon({
                  iconUrl: `/icons/${category}.svg`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 32],
                  popupAnchor: [0, -32],
                })
          }
        >
          {category !== "default" && (
            <Popup minWidth={90}>
              <div className="flex flex-col gap-1">
                <span className="text-sm">{name}</span>
                <span className="text-xs">
                  {formatDistanceToNow(created_at)} ago
                </span>
              </div>
            </Popup>
          )}
        </Marker>
      );
    });
  }

  return (
    <MapContainer
      center={initialPosition}
      zoom={13}
      scrollWheelZoom={false}
      id="map"
      style={{
        position: "relative",
        height: "400px",
        zIndex: 1,
        width: "100%",
        borderRadius: 12,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MultipleMarkers />
      {/* <DraggableMarker /> */}
    </MapContainer>
  );
};

export default MapComponent;
