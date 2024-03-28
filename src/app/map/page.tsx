import MapInput from "./MapInput";

export default function MapPage() {
  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col items-center justify-evenly gap-16 pt-16">
      <div className="mx-auto flex w-full flex-col gap-8">
        <h1 className="text-5xl font-medium underline decoration-wavy underline-offset-8">
          Explore your region
        </h1>
        <p className="text-sm">
          See the dangerous regions in the below map and be careful in those
          perimeters
        </p>
        <MapInput />
      </div>
    </div>
  );
}
