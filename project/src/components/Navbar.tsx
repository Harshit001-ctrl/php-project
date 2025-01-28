import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, MessageSquare, HelpCircle, User } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">CommunityHub</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <NavLink to="/map" icon={<MapPin className="w-5 h-5 text-white" />} text="Map" />
            <NavLink to="/events" icon={<Calendar className="w-5 h-5 text-white" />} text="Events" />
            <NavLink to="/forum" icon={<MessageSquare className="w-5 h-5 text-white" />} text="Forum" />
            <NavLink to="/resources" icon={<HelpCircle className="w-5 h-5 text-white" />} text="Resources" />
            <NavLink to="/profile" icon={<User className="w-5 h-5 text-white" />} text="Profile" />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) {
  return (
    <Link
      to={to}
      className="flex items-center space-x-1 text-white hover:text-indigo-300 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}

export default Navbar;
