import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { DocumentTextIcon, SwatchIcon, PhotoIcon, ChatBubbleLeftRightIcon, EyeDropperIcon, SparklesIcon, ArrowRightIcon, SpeakerWaveIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: <DocumentTextIcon className="h-7 w-7 text-white" />, 
    title: 'Accessibility Statement Generator',
    description: 'Generate WCAG-compliant accessibility statements for your website in minutes.',
    path: '/accessibility-statement',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <SwatchIcon className="h-7 w-7 text-white" />, 
    title: 'Color Contrast Checker',
    description: 'Check if your color pairs meet WCAG guidelines.',
    path: '/color-contrast-checker',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <PhotoIcon className="h-7 w-7 text-white" />, 
    title: 'Logo Checker',
    description: 'Verify your logo meets accessibility requirements.',
    path: '/logo-checker',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <PhotoIcon className="h-6 w-6" />,
    title: 'Image Alt Text Generator',
    description: 'Generate meaningful, WCAG-compliant alt text for your images using AI.',
    path: '/image-alt-generator',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <span className="text-xl">🎬</span>,
    title: 'Video Checker',
    description: 'List all videos and check if they are decorative or require descriptions.',
    path: '/video-checker',
    live: false,
    color: 'bg-primary'
  },
  {
    icon: <ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />,
    title: 'Accessibility Feedback Widget',
    description: 'Easily add a feedback widget to your site for accessibility issues.',
    path: '/feedback-widget',
    live: false,
    color: 'bg-primary'
  },
  {
    icon: <EyeDropperIcon className="h-7 w-7 text-white" />,
    title: 'Vision Simulator',
    description: 'Simulate different types of vision on your website with an embeddable tool.',
    path: '/vision-simulator',
    live: false,
    color: 'bg-primary'
  },
  {
    icon: <SparklesIcon className="h-7 w-7 text-white" />,
    title: 'WCAG Explainer',
    description: 'Get step-by-step explanations of WCAG requirements for your team.',
    path: '/wcag-explainer',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <SwatchIcon className="h-7 w-7 text-white" />,
    title: 'A11y Colour Palette Generator',
    description: 'Generate a random accessible color palette for your next project.',
    path: '/a11y-palette-generator',
    live: true,
    color: 'bg-primary'
  },
  {
    icon: <SpeakerWaveIcon className="h-6 w-6" />,
    title: 'Screen Reader Simulator',
    description: 'Experience your website as a screen reader user would.',
    path: '/screen-reader',
    live: false,
    color: 'bg-primary'
  },
  {
    icon: <ComputerDesktopIcon className="h-6 w-6" />,
    title: 'Keyboard Navigation Tester',
    description: 'Test and improve keyboard navigation on your website.',
    path: '/keyboard-test',
    live: false,
    color: 'bg-primary'
  },
];

const testimonials = [
  {
    quote: "A11YO's tools have transformed how we approach accessibility. The statement generator saved us hours of work.",
    author: "Sarah Chen",
    role: "Lead Developer",
    company: "TechCorp"
  },
  {
    quote: "The color contrast checker is a game-changer. It's helped us maintain accessibility standards across our entire platform.",
    author: "Michael Rodriguez",
    role: "UX Designer",
    company: "DesignHub"
  },
  {
    quote: "Finally, accessibility tools that are both powerful and easy to use. A11YO has become an essential part of our workflow.",
    author: "Emma Thompson",
    role: "Product Manager",
    company: "WebSolutions"
  }
];

const latestPosts = [
  {
    id: 1,
    title: 'Understanding WCAG 2.2: What\'s New and What You Need to Know',
    excerpt: 'A comprehensive guide to the latest WCAG 2.2 guidelines and how they affect your website.',
    date: '2024-03-15',
    category: 'Guidelines',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'The Importance of Color Contrast in Web Accessibility',
    excerpt: 'Learn why color contrast matters and how to ensure your website meets accessibility standards.',
    date: '2024-03-10',
    category: 'Design',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Creating Accessible Forms: Best Practices',
    excerpt: 'Essential tips and techniques for making your web forms accessible to all users.',
    date: '2024-03-05',
    category: 'Development',
    readTime: '6 min read'
  }
];

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>A11YO - Free Accessibility Tools</title>
        <meta name="description" content="A collection of free accessibility tools to help you build more inclusive websites." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Make Your Website
                  <span className="text-primary block mt-2">Accessible to Everyone</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-xl">
                  Free tools to help you create more inclusive digital experiences. Generate accessibility statements, check color contrast, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/tools" className="btn-primary text-center">
                    Try Our Tools
                  </Link>
                  <Link to="/blog" className="btn-secondary text-center">
                    Read Our Blog
                  </Link>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/tools.svg" 
                  alt="Accessibility tools illustration" 
                  className="w-full h-auto max-w-lg mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent -z-10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Free Accessibility Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to make your website more accessible, all in one place.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg p-6 transition-all hover:shadow-xl hover:-translate-y-1 ${
                    !feature.live && 'opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                        {feature.live ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                      <Link 
                        to={feature.path} 
                        onClick={scrollToTop}
                        className="flex items-center text-primary font-medium group-hover:underline"
                      >
                        {feature.live ? 'Open tool' : 'Learn more'}
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Why Choose A11YO?
                </h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
                    <p className="text-gray-600">
                      Our tools are designed with simplicity in mind. No technical expertise required.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">WCAG Compliant</h3>
                    <p className="text-gray-600">
                      All tools follow the latest WCAG guidelines to ensure your website meets accessibility standards.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Forever</h3>
                    <p className="text-gray-600">
                      Access all our tools completely free. No hidden costs or premium features.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/code.svg" 
                  alt="Accessibility features illustration" 
                  className="w-full h-auto max-w-lg mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-primary/10 to-transparent -z-10 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest from Our Blog
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Stay up to date with the latest accessibility insights and best practices.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link to="/blog" className="block">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium text-primary">{post.category}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-500">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{post.date}</span>
                          <span className="text-primary font-medium group-hover:underline">
                            Read more
                            <ArrowRightIcon className="inline-block ml-1 h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/blog" className="btn-secondary">
                View All Posts
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Make Your Website Accessible?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using A11YO to create more inclusive digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools" className="btn-primary">
                Get Started Free
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 