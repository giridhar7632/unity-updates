import MapInput from "./MapInput";

export default function MapPage() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-evenly gap-16 pt-16">
      <div className="mx-auto flex w-full flex-col items-center gap-8">
        <p className="text-sm">
          See dangerous regions in the map below
        </p>
        <MapInput />
      </div>
    </div>
  );
}
