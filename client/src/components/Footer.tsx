import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import pkg from '../../../package.json';

const VERSION = pkg.version;

const TOOL_VERSIONS = {
  statement: '1.0.0',
  contrast: '1.0.0',
  logo: '1.0.0',
};

const Footer = () => (
  <footer className="">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-secondary-700 mb-4">About A11YO</h3>
          <p className="text-gray-600 mb-4">
            A11YO helps organizations create compliant accessibility statements that meet international standards and regulations.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-700 mb-4">Contact</h3>
          <p className="text-gray-600 mb-4">
            Have questions about accessibility statements? Get in touch with us.
          </p>
          <a href="mailto:hello@fergflannery.com" className="text-primary-300 hover:text-primary-400">
            hello@fergflannery.com
          </a>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-700 mb-4">Accessibility</h3>
          <p className="text-gray-600 mb-4">
            This website is committed to making its content accessible to everyone. We strive to meet WCAG 2.2 Level AA standards.
          </p>
          <a href="mailto:hello@fergflannery.com" className="text-primary-300 hover:text-primary-400">
            Report an accessibility issue
          </a>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-secondary-700 mb-4">Support the Developer</h3>
          <p className="text-gray-600 mb-4">
            This platform was created to help make accessibility compliance easier for everyone. If you find it valuable, consider supporting its development.
          </p>
          <a
            href="https://buy.stripe.com/9AQ6oY2hK7AhgtW144"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-300 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300"
          >
            Support A11YO
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} A11YO. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 mt-4 md:mt-0">
            <div className="flex items-center space-x-2 text-xs text-gray-400">
              <span>Statement v{TOOL_VERSIONS.statement}</span>
              <span aria-hidden="true">·</span>
              <span>Contrast v{TOOL_VERSIONS.contrast}</span>
              <span aria-hidden="true">·</span>
              <span>Logo v{TOOL_VERSIONS.logo}</span>
            </div>
            <span className="text-sm text-gray-400">App v{VERSION}</span>
          </div>
        </div>
      </div>
      <h3 className="text-sm font-semibold text-secondary-700 tracking-wider uppercase mt-8">Legal</h3>
      <ul className="mt-4 space-y-4">
        <li>
          <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900">
            Terms of Service
          </Link>
        </li>
        <li>
          <Link to="/accessibility-statement" className="text-base text-gray-500 hover:text-gray-900">
            Accessibility Statement
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

export default Footer; 