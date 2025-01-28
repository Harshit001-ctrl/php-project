export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  organizer_id: string;
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: string;
  contact: string;
  website?: string;
  location: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  category: string;
}