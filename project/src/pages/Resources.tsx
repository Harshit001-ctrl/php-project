import React from 'react';
import { Search, Phone, Globe, MapPin } from 'lucide-react';
import { Resource } from '../types';

function Resources() {
  const [resources, setResources] = React.useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = ['All', 'Healthcare', 'Education', 'Social Services', 'Recreation', 'Business'];

  return (
    <div className="space-y-8">
      <header className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Community Resources</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.toLowerCase()
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResourceCard
          name="Community Health Center"
          description="Providing affordable healthcare services to all community members. Services include primary care, dental, and mental health."
          category="Healthcare"
          contact="(555) 123-4567"
          website="https://en.wikipedia.org/wiki/Community_health_center"
          location="123 Main Street"
        />
        <ResourceCard
          name="Public Library"
          description="Free access to books, computers, and educational programs for all ages. Special programs for children and seniors."
          category="Education"
          contact="(555) 234-5678"
          website="https://www.justdial.com/Rewari/Public-Libraries/nct-11616302"
          location="456 Park Avenue"
        />
        <ResourceCard
          name="Food Bank"
          description="Providing food assistance to families in need. Also offers nutrition education and cooking classes."
          category="Social Services"
          contact="(555) 345-6789"
          website="https://www.indiafoodbanking.org/"
          location="789 Oak Street"
        />
      </div>
    </div>
  );
}

function ResourceCard({ name, description, category, contact, website, location }: {
  name: string;
  description: string;
  category: string;
  contact: string;
  website?: string;
  location: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full mb-4">
        {category}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="space-y-2">
        <div className="flex items-center text-gray-500">
          <Phone className="w-4 h-4 mr-2" />
          <span>{contact}</span>
        </div>
        {website && (
          <div className="flex items-center text-gray-500">
            <Globe className="w-4 h-4 mr-2" />
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
              Visit Website
            </a>
          </div>
        )}
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}

export default Resources;