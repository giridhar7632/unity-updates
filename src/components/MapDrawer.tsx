/* eslint-disable */
//@ts-nocheck
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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { type UseFormSetValue } from "react-hook-form";
import { Icons } from "./Icons";
import { useToast } from "./ui/use-toast";

interface MapComponentProps {
  initialPosition?: L.LatLngExpression;
  setValue: UseFormReturn<
    {
      number: string;
      lat: number;
      lon: number;
      name: string;
      category: string;
      description: string;
    },
    any,
    undefined
  >;
}

const iconOptions: L.IconOptions = {
  iconUrl: "/pin.png",
  iconSize: [54, 54],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
};
const customIcon: L.Icon = L.icon(iconOptions);

export function DraggableMarker({
  initialPosition = [18.514707, -72.276647],
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
        const marker: L.Marker = markerRef.current;
        if (marker != null) {
          const newPosition: L.LatLngExpression = marker.getLatLng();
          setPosition(newPosition);
          setValue("lat", newPosition.lat);
          setValue("lon", newPosition.lng);
          console.log(newPosition);
        }
      },
    }),
    [setValue],
  );

  useEffect(() => {
    if (position !== initialPosition) {
      console.log(initialPosition);
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

const MapDrawer: React.FC<MapComponentProps> = ({
  initialPosition = [18.514707, -72.276647],
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
        toast.error("Failed to get location!");
      },
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Open map</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-4xl">
          <DrawerHeader>
            <DrawerTitle>Pick the location</DrawerTitle>
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
