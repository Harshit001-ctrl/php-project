// import { MapPin } from "lucide-react";
import Events from "./Events";

function MapView() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

  return (
    <div className="h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Community Map</h1>

      <Events />
    </div>
  );
}

export default MapView;
