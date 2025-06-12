import React from 'react';
import { Helmet } from 'react-helmet';

// Sample blog posts data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: 'Understanding WCAG 2.2: What\'s New and What You Need to Know',
    excerpt: 'A comprehensive guide to the latest WCAG 2.2 guidelines and how they affect your website.',
    date: '2024-03-15',
    author: 'A11YO Team',
    category: 'Guidelines',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Importance of Color Contrast in Web Accessibility',
    excerpt: 'Learn why color contrast matters and how to ensure your website meets accessibility standards.',
    date: '2024-03-10',
    author: 'A11YO Team',
    category: 'Design',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Creating Accessible Forms: Best Practices',
    excerpt: 'Essential tips and techniques for making your web forms accessible to all users.',
    date: '2024-03-05',
    author: 'A11YO Team',
    category: 'Development',
    readTime: '6 min read'
  },
  {
    id: 4,
    title: '5 Things to Prepare Your Video for A11y',
    excerpt: 'Make your videos accessible with these 5 essential steps, from captions to audio descriptions.',
    date: '2024-06-01',
    author: 'A11YO Team',
    category: 'Video',
    readTime: '4 min read'
  },
  {
    id: 5,
    title: '10 Most Important Steps to Ensure You Are A11y Ready',
    excerpt: 'A checklist of the 10 most crucial steps to make your website accessible to everyone.',
    date: '2024-06-01',
    author: 'A11YO Team',
    category: 'Checklist',
    readTime: '6 min read'
  }
];

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog - A11YO</title>
        <meta name="description" content="Latest articles and insights about web accessibility, WCAG guidelines, and inclusive design." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Latest insights, guides, and best practices for creating accessible web experiences.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-sm font-medium text-primary">{post.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-sm text-gray-500">By {post.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 