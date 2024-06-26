"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { debounce } from "lodash";
import { type UseFormSetValue } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";

interface MapComponentProps {
  initialPosition?: L.LatLngExpression;
  setValue: UseFormSetValue<{
    number: string;
    lat: number;
    lon: number;
    name: string;
    category: string;
    description: string;
  }>;
}

interface SearchResult {
  lat: string;
  lon: string;
}

const iconOptions: L.IconOptions = {
  iconUrl: "/pin.png",
  iconSize: [54, 54],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
};
const customIcon: L.Icon = L.icon(iconOptions);

function DraggableMarker({
  initialPosition = [51.505, -0.09],
  setValue,
}: MapComponentProps & {
  setMarkerPosition: (position: L.LatLngExpression) => void;
}) {
  const [position, setPosition] = useState(initialPosition);
  const markerRef = useRef<L.Marker | null>(null);
  const map = useMapEvents({
    click: (e) => {
      const newPosition = e.latlng;
      setPosition(newPosition);
      setValue("lat", newPosition.lat);
      setValue("lon", newPosition.lng);
    },
  });
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition: L.LatLngExpression = marker.getLatLng();
          setPosition(newPosition);
          setValue("lat", newPosition.lat);
          setValue("lon", newPosition.lng);
        }
      },
    }),
    [setValue],
  );

  useEffect(() => {
    if (position !== initialPosition) {
      setPosition(initialPosition);
    }
  }, [initialPosition]);

  return (
    <>
      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={customIcon}
      >
        <Popup minWidth={90}>
          <span>Show us your location!</span>
        </Popup>
      </Marker>
    </>
  );
}

export const MapComponent: React.FC<MapComponentProps> = ({
  initialPosition = [51.505, -0.09],
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

  const handleSearch = debounce(async (e) => {
    const query = e.target.value;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
    );
    const data: SearchResult[] = await response.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0]?.lat ?? initialPosition[0]);
      const lon = parseFloat(data[0]?.lon ?? initialPosition[1]);
      mapRef.current?.flyTo([lat, lon], 18);
    }
  }, 800);

  return (
    <div data-vaul-no-drag className="relative space-y-2 p-4 pb-0">
      <Input
        type="text"
        placeholder="Search places..."
        onChange={handleSearch}
      />
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

const MapDrawer: React.FC<MapComponentProps> = ({
  initialPosition = [18.5944, -72.3074],
  setValue,
}) => {
  const [markerPosition, setMarkerPosition] =
    useState<L.LatLngExpression>(initialPosition);
  const mapRef = useRef<L.Map | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (markerPosition) {
      setValue("lat", Number(markerPosition[0]));
      setValue("lon", Number(markerPosition[1]));
    }
  }, [markerPosition, setValue]);

  function onLocate() {
    setLocating(true);
    if (typeof window !== "undefined") {
      setLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = Number(pos.coords.latitude);
          const lon = Number(pos.coords.longitude);
          setValue("lat", lat);
          setValue("lon", lon);
          mapRef.current?.flyTo([lat, lon], 18);
          setLocating(false);
        },
        (error) => {
          console.error(error);
          setLocating(false);
          toast({ description: "Failed to get location!" });
        },
      );
    } else {
      // Handle non-browser environment or provide alternative behavior
      console.warn("Geolocation is not supported in this environment.");
      toast({
        description: "Geolocation is not supported in this environment.",
      });
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = Number(pos.coords.latitude);
        const lon = Number(pos.coords.longitude);
        setValue("lat", lat);
        setValue("lon", lon);
        mapRef.current?.flyTo([lat, lon], 18);
        setLocating(false);
      },
      (error) => {
        console.error(error);
        setLocating(false);
        toast({ description: "Failed to get location!" });
      },
    );
  }

  const handleSearch = debounce(async (e) => {
    const query = e.target.value;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
    );
    const data: SearchResult[] = await response.json();

    if (data.length > 0) {
      const lat = parseFloat(data[0]?.lat ?? initialPosition[0]);
      const lon = parseFloat(data[0]?.lon ?? initialPosition[1]);
      mapRef.current?.flyTo([lat, lon], 18);
    }
  }, 500);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Open map</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Pick the location</DrawerTitle>
            <DrawerDescription>
              You can also use the search option to find surrounding famous
              places.
            </DrawerDescription>
          </DrawerHeader>

          <Button
            type="button"
            variant={"secondary"}
            className={"mx-auto flex items-center gap-2"}
            onClick={onLocate}
          >
            {locating ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              <Icons.locate />
            )}
            <span>Locate yourself</span>
          </Button>

          <div data-vaul-no-drag className="relative space-y-2 p-4 pb-0">
            <Input
              type="text"
              placeholder="Search places..."
              onChange={handleSearch}
            />
            <MapContainer
              center={initialPosition}
              zoom={13}
              ref={mapRef}
              scrollWheelZoom={false}
              id="map"
              style={{ height: "400px", width: "100%", borderRadius: 12 }}
              whenReady={() => {
                document
                  .getElementById("map")
                  ?.setAttribute("data-vaul-no-drag", "true");
              }}
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
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Select location</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MapDrawer;
