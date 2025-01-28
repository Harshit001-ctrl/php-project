import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, MessageSquare, HelpCircle } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from 'emailjs-com';

function Home() {
  return (
    <div className="space-y-16 bg-pink-50 min-h-screen">
      {/* Header */}
      <header className="text-center py-16 px-4 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 text-white">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Welcome to CommunityHub
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Your central platform for local resources, events, and community engagement.
        </p>
      </header>

      {/* Feature Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8">
        <FeatureCard
          to="/map"
          icon={<MapPin className="w-10 h-10 text-pink-600" />}
          title="Interactive Map"
          description="Discover local businesses, services, and community spaces near you."
        />
        <FeatureCard
          to="/events"
          icon={<Calendar className="w-10 h-10 text-pink-600" />}
          title="Events Calendar"
          description="Stay updated with local events and activities happening in your area."
        />
        <FeatureCard
          to="/forum"
          icon={<MessageSquare className="w-10 h-10 text-pink-600" />}
          title="Community Forum"
          description="Connect with neighbors and participate in local discussions."
        />
        <FeatureCard
          to="/resources"
          icon={<HelpCircle className="w-10 h-10 text-pink-600" />}
          title="Resource Directory"
          description="Find local services, support groups, and volunteer opportunities."
        />
      </div>

      {/* Featured Events Section */}
      <section className="bg-white rounded-lg shadow-xl p-8 mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Events</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <EventCard
            title="Community Cleanup"
            date="2024-03-15"
            image="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8"
          />
          <EventCard
            title="Local Art Fair"
            date="2024-03-20"
            image="https://images.unsplash.com/photo-1459749411175-04bf5292ceea"
          />
          <EventCard
            title="Farmers Market"
            date="2024-03-22"
            image="https://images.unsplash.com/photo-1488459716781-31db52582fe9"
          />
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSignup />
      
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
}

function FeatureCard({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
    >
      <div className="text-pink-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

function EventCard({
  title,
  date,
  image,
}: {
  title: string;
  date: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover transition-all duration-300 hover:scale-105"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter a valid email address');
      return;
    }

    const templateParams = {
      user_email: email,
    };

    // Send email using Email.js
    emailjs
      .send(
        'service_tw89tjw',        // Your Email.js service ID
        'template_1dz22lk',        // Your Email.js template ID
        templateParams,
        'yYbdABY9A_DW7QLyj'             // Your Email.js user ID
      )
      .then(
        (response) => {
          console.log('Email sent successfully:', response);
          toast.success('You have successfully subscribed to the newsletter!');
          setEmail('');
        },
        (error) => {
          console.error('Failed to send email:', error);
          toast.error('Something went wrong, please try again later.');
        }
      );
  };

  return (
    <section className="bg-white rounded-lg shadow-xl p-8 mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Stay Connected</h2>
      <p className="text-gray-700 text-lg mb-6 text-center">
        Sign up for our newsletter to receive updates on community events and resources.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
        <input
          type="email"
          name="from_email"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 flex-grow"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default Home;
