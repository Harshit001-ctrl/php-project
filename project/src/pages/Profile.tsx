import React from 'react';
import { User, Mail, Edit2, MapPin, Calendar, MessageSquare } from 'lucide-react';

function Profile() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    location: 'Downtown District',
    joinDate: '2024-01-15',
    bio: 'Community advocate and local business supporter. Passionate about urban gardening and organizing neighborhood events.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  });
  const [privacySettings, setPrivacySettings] = React.useState(true); // true means profile is visible, false means private
  const [emailNotifications, setEmailNotifications] = React.useState(true); // true means notifications are enabled, false means disabled

  const [activities] = React.useState([
    { type: 'event', title: 'Community Garden Workshop', date: '2024-03-25', status: 'Organizing' },
    { type: 'forum', title: 'Ideas for Summer Festival', date: '2024-03-20', status: 'Posted' },
    { type: 'event', title: 'Local Art Exhibition', date: '2024-04-05', status: 'Attending' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: e.target.value,
    }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const togglePrivacySettings = () => {
    setPrivacySettings(!privacySettings);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={userProfile.avatar}
              alt={userProfile.fullName}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfile.fullName}
                    onChange={(e) => handleInputChange(e, 'fullName')}
                    className="w-full text-3xl font-bold text-gray-900 bg-transparent border-none"
                  />
                ) : (
                  userProfile.fullName
                )}
              </h1>
              <div className="flex items-center text-gray-600 mt-2">
                <MapPin className="w-4 h-4 mr-2" />
                {isEditing ? (
                  <input
                    type="text"
                    value={userProfile.location}
                    onChange={(e) => handleInputChange(e, 'location')}
                    className="text-gray-600 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                ) : (
                  <span>{userProfile.location}</span>
                )}
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Joined {new Date(userProfile.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          {isEditing ? (
            <textarea
              value={userProfile.bio}
              onChange={(e) => handleInputChange(e, 'bio')}
              className="w-full text-sm text-gray-600 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={4}
            />
          ) : (
            <p className="text-gray-600">{userProfile.bio}</p>
          )}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {activity.type === 'event' ? (
                  <Calendar className="w-5 h-5 text-indigo-600" />
                ) : (
                  <MessageSquare className="w-5 h-5 text-indigo-600" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{activity.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Settings</h2>
        <div className="space-y-4">
          {/* Email Notifications Section */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">Manage your email preferences</p>
              </div>
            </div>
            <button
              onClick={toggleEmailNotifications}
              className="text-indigo-600 hover:text-indigo-700"
            >
              {emailNotifications ? 'Disable' : 'Enable'}
            </button>
          </div>

          {/* Privacy Settings Section */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Privacy Settings</h3>
                <p className="text-sm text-gray-500">Control your profile visibility</p>
              </div>
            </div>
            <button
              onClick={togglePrivacySettings}
              className="text-indigo-600 hover:text-indigo-700"
            >
              {privacySettings ? 'Set to Private' : 'Set to Public'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
