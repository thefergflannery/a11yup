import React from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../config/tools';
import { SunIcon, MoonIcon, ShareIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary-500 text-white px-4 py-2 rounded z-50">Skip to main content</a>
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">A11YO</span>
            </Link>
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium transition-colors">Home</Link>
              <Link to="/tools" className="text-gray-700 hover:text-primary font-medium transition-colors">Tools</Link>
              <Link to="/blog" className="text-gray-700 hover:text-primary font-medium transition-colors">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main" className="bg-gradient-to-b from-white to-gray-50">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="footer-col md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">A11YO</h3>
            <p className="max-w-md">
              Making web accessibility easier for everyone. Our tools help you create more inclusive digital experiences.
            </p>
          </div>
          <div className="footer-col">
            <h3 className="footer-title">Tools</h3>
            <ul className="footer-list">
              {tools.map((tool) => (
                <li key={tool.path}>
                  <Link to={tool.path} className="footer-link">
                    {tool.name}
                    {tool.comingSoon && (
                      <span className="ml-1 text-xs text-yellow-600">(Soon)</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-title">Resources</h3>
            <ul className="footer-list">
              <li>
                <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="footer-link">
                  WCAG Guidelines
                </a>
              </li>
              <li>
                <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer" className="footer-link">
                  ARIA Practices
                </a>
              </li>
              <li>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          © {new Date().getFullYear()} A11YO. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout; 