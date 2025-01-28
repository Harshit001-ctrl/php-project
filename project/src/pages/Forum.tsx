import React from 'react';
import { MessageSquare, User, Clock } from 'lucide-react';
import { ForumPost } from '../types';

function Forum() {
  const [posts, setPosts] = React.useState<ForumPost[]>([
    {
      title: 'Welcome to our new community platform!',
      content: "We're excited to launch this new platform for our community. Here you can discuss local issues, share ideas, and connect with neighbors.",
      author: 'Community Admin',
      date: '2024-03-01T09:00:00',
      category: 'Announcements',
      replies: 15
    },
    {
      title: 'Ideas for improving the local park',
      content: 'I have some suggestions for making our local park more family-friendly. What do you think about adding more playground equipment?',
      author: 'Park Enthusiast',
      date: '2024-03-10T14:30:00',
      category: 'Ideas',
      replies: 8
    },
    {
      title: 'Looking for volunteer opportunities',
      content: "I'm new to the area and would love to get involved in community service. Does anyone know of any organizations that need volunteers?",
      author: 'New Neighbor',
      date: '2024-03-15T16:45:00',
      category: 'Questions',
      replies: 12
    },
  ]);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [showForm, setShowForm] = React.useState(false);
  const [newPost, setNewPost] = React.useState({
    title: '',
    content: '',
    category: 'General',
  });

  const categories = ['All', 'General', 'Announcements', 'Questions', 'Ideas', 'Events'];

  // Filter posts based on the selected category
  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new post to the posts array
    setPosts((prevPosts) => [...prevPosts, { ...newPost, date: new Date().toISOString(), replies: 0, author: 'New User' }]);
    setShowForm(false); // Close the form after submitting
  };

  return (
    <div className="space-y-8">
      <header className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            New Post
          </button>
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

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Create a New Post</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handlePostChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newPost.content}
                  onChange={handlePostChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newPost.category}
                  onChange={handlePostChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map(post => (
          <ForumPostCard
            key={post.title}
            title={post.title}
            content={post.content}
            author={post.author}
            date={post.date}
            category={post.category}
            replies={post.replies}
          />
        ))}
      </div>
    </div>
  );
}

function ForumPostCard({ title, content, author, date, category, replies }: {
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
  replies: number;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full mb-2">
            {category}
          </span>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center text-gray-500">
          <MessageSquare className="w-5 h-5 mr-1" />
          <span>{replies}</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <User className="w-4 h-4 mr-1" />
          <span>{author}</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Forum;
