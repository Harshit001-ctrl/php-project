import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Event = {
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
};

function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      title: "Community Garden Workshop",
      date: "2024-03-25T10:00:00",
      location: "Central Community Garden",
      description: "Learn organic gardening techniques and help maintain our community garden.",
      category: "Community",
    },
    {
      title: "Local Artists Showcase",
      date: "2024-03-28T18:30:00",
      location: "Downtown Gallery",
      description: "Exhibition featuring works from local artists. Opening night reception with refreshments.",
      category: "Arts",
    },
    {
      title: "Youth Sports Day",
      date: "2024-04-02T09:00:00",
      location: "Memorial Park",
      description: "A day of sports activities for children ages 8-14. Registration required.",
      category: "Sports",
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEventForm, setShowEventForm] = useState(false);

  const categories = ['All', 'Community', 'Arts', 'Sports', 'Education', 'Volunteer'];

  const mapRef = useRef<Map>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleRegister = () => {
    setShowEventForm(true);
  };

  const handleFormSubmit = () => {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const date = (document.getElementById("date") as HTMLInputElement).value;
    const time = (document.getElementById("time") as HTMLInputElement).value;
    const location = (document.getElementById("location") as HTMLInputElement).value;
    const description = (document.getElementById("description") as HTMLTextAreaElement).value;
    const category = (document.getElementById("category") as HTMLSelectElement).value;

    if (!title || !date || !time || !location || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const newEvent: Event = {
      title,
      date: `${date}T${time}:00`,
      location,
      description,
      category,
    };

    setEvents([...events, newEvent]);
    setShowEventForm(false);
  };

  const handleFormCancel = () => {
    setShowEventForm(false);
  };

  const getLngLatFromLocation = (location: string): [number, number] => {
    switch (location) {
      case "Central Community Garden":
        return [-74.0060, 40.7128];
      case "Downtown Gallery":
        return [-74.0080, 40.7138];
      case "Memorial Park":
        return [-74.0090, 40.7118];
      default:
        return [-74.0060, 40.7128];
    }
  };

  useEffect(() => {
    if (mapRef.current && events.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      events.forEach(event => {
        const [lng, lat] = getLngLatFromLocation(event.location);
        bounds.extend([lng, lat]);
      });
      mapRef.current.fitBounds(bounds, { padding: 40 });
    }
  }, [events]);

  return (
    <div className="space-y-8">
      <header className="bg-indigo-700 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-semibold text-white mb-4">Community Events</h1>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.toLowerCase()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-indigo-600 hover:bg-indigo-100'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Event Form Card */}
      {showEventForm && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Submit an Event</h2>
          <div className="space-y-4">
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Event Title"
            />
            <div className="flex space-x-4">
              <input
                type="date"
                id="date"
                className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                id="time"
                className="w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <input
              type="text"
              id="location"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Location"
            />
            <textarea
              id="description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Description"
            />
            <select
              id="category"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleFormCancel}
            >
              Cancel
            </button>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Map container */}
      <div className="h-[40vh] rounded-lg overflow-hidden bg-gray-100">
        <Map
          ref={mapRef}
          initialViewState={{
            latitude: 40.7128,
            longitude: -74.0060,
            zoom: 12,
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1IjoiaGFyc2hpdC0yMSIsImEiOiJjbTZmNWJ2YjgwMW1wMm1xcHQ4dGQycWg5In0.9vsJIun0dQjGZ-Dr-dyMuA"
        >
          {events.map((event) => {
            const [lng, lat] = getLngLatFromLocation(event.location);
            return (
              <Marker key={event.title} longitude={lng} latitude={lat} anchor="bottom">
                <div className="text-indigo-600">
                  <MapPin className="w-6 h-6" />
                  <div className="text-xs">{event.title}</div>
                </div>
              </Marker>
            );
          })}
        </Map>
      </div>

      {/* Event grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events
          .filter(
            (event) =>
              selectedCategory === 'all' || event.category.toLowerCase() === selectedCategory
          )
          .map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
      </div>

      <div className="bg-indigo-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">Want to host an event?</h2>
        <p className="text-indigo-700 mb-4">Share your event with the community and reach more people.</p>
        <button
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          onClick={handleRegister}
        >
          Submit an Event
        </button>
      </div>
    </div>
  );
}

function EventCard({ title, date, location, description, category }: Event) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-sm font-medium text-indigo-600">{category}</span>
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" /> {new Date(date).toLocaleDateString()}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" /> {new Date(date).toLocaleTimeString()}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" /> {location}
          </p>
        </div>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}

export default Events;
