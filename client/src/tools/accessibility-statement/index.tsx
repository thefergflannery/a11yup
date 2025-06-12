import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GlobeAltIcon, ArrowRightIcon, PlusIcon, XMarkIcon, CheckCircleIcon, ChevronDownIcon, DocumentTextIcon, SwatchIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { tools } from '../../config/tools';

// Meta information for social sharing
const META_INFO = {
  title: 'A11YO - Generate Compliant Accessibility Statements',
  description: 'Create WCAG 2.2 and EAA 2025 compliant accessibility statements with our AI-powered tool. Document your website\'s accessibility features and exceptions effortlessly.',
  image: '/og-image.png',
  url: 'https://a11yo.com/accessibility-statement'
};

// WCAG versions and levels
const WCAG_VERSIONS = [
  { value: '2.2-AAA', label: 'WCAG 2.2 Level AAA' },
  { value: '2.2-AA', label: 'WCAG 2.2 Level AA' },
  { value: '2.1-AAA', label: 'WCAG 2.1 Level AAA' },
  { value: '2.1-AA', label: 'WCAG 2.1 Level AA' },
  { value: '2.0-AAA', label: 'WCAG 2.0 Level AAA' },
  { value: '2.0-AA', label: 'WCAG 2.0 Level AA' },
];

// Legislation options
const LEGISLATION_OPTIONS = [
  { 
    value: 'eaa-2025', 
    label: 'European Accessibility Act (EAA) 2025',
    description: 'Applies to private sector companies providing products and services in the EU'
  },
  { 
    value: 'eu-directive', 
    label: 'EU Web Accessibility Directive',
    description: 'Applies to public sector websites and mobile applications'
  },
  { 
    value: 'ada', 
    label: 'Americans with Disabilities Act (ADA)',
    description: 'Applies to businesses open to the public in the US'
  },
  { 
    value: 'section-508', 
    label: 'Section 508',
    description: 'Applies to federal agencies and organizations receiving federal funding'
  }
];

// Add type for exceptions
interface Exception {
  name: string;
  reason: string;
  criteria?: string;
}

interface ComplianceDetails {
  level: string;
  details: string[];
}

interface LocationState {
  legislation: string;
  wcagVersion: '2.2-AAA' | '2.2-AA';
  url: string;
  exceptions: Exception[];
}

const iconMap = {
  'document-text': DocumentTextIcon,
  'color-swatch': SwatchIcon,
  'photo': PhotoIcon
};

export default function AccessibilityStatementLanding() {
  const [url, setUrl] = useState('');
  const [legislation, setLegislation] = useState('eaa-2025');
  const [wcagVersion, setWcagVersion] = useState('2.2-AAA');
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [newException, setNewException] = useState<Exception>({ name: '', reason: '' });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [addError, setAddError] = useState('');
  const [urlError, setUrlError] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the logic to generate the statement
  };

  const handleEditException = (index: number) => {
    // Implement the logic to edit an exception
  };

  const handleRemoveException = (index: number) => {
    // Implement the logic to remove an exception
  };

  const handleAddException = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the logic to add a new exception
  };

  return (
    <>
      <Helmet>
        <title>A11YO - Generate Compliant Accessibility Statements</title>
        <meta name="description" content="Create WCAG 2.2 and EAA 2025 compliant accessibility statements with our AI-powered tool. Document your website's accessibility features and exceptions effortlessly." />
      </Helmet>

      <div className="font-dm-sans bg-gray-50 text-gray-900 min-h-screen">
        {/* Hero Section */}
        <section className="container grid md:grid-cols-2 gap-12 items-center py-20 mx-auto">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center drop-shadow text-primary-900">
              Accessibility Statement Generator
            </h1>
            <div className="text-sm text-gray-400 mb-6 text-center">Accessibility Statement Generator v1.0.0</div>
            <p className="text-lg text-gray-500 mb-8">
              Create WCAG 2.2 and EAA 2025 compliant accessibility statements with our AI-powered tool. Document your website's accessibility features and exceptions effortlessly.
            </p>
            <div className="flex space-x-4">
              <Link to="#generate" className="btn btn-primary px-6 py-3 text-lg">Get Started Free</Link>
              <Link to="#faq" className="btn btn-secondary px-6 py-3 text-lg">Learn More</Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="/statement.svg" alt="Accessibility statement illustration" className="max-w-md w-full h-auto" />
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">Why Choose Our Generator?</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Our AI-powered tool helps you create comprehensive accessibility statements that meet international standards.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card flex flex-col items-center p-6">
              <span className="inline-block w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary font-bold mb-4">✓</span>
              <h3 className="font-bold text-lg mb-2">WCAG 2.2 Compliant</h3>
              <p className="text-gray-500 text-center">
                Generate statements that meet the latest WCAG 2.2 guidelines, ensuring your documentation is up-to-date with current standards.
              </p>
            </div>
            <div className="card flex flex-col items-center p-6">
              <span className="inline-block w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary font-bold mb-4">✓</span>
              <h3 className="font-bold text-lg mb-2">EAA 2025 Ready</h3>
              <p className="text-gray-500 text-center">
                Prepare for the European Accessibility Act 2025 requirements with comprehensive documentation of your website's accessibility features.
              </p>
            </div>
            <div className="card flex flex-col items-center p-6">
              <span className="inline-block w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary font-bold mb-4">✓</span>
              <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
              <p className="text-gray-500 text-center">
                Our advanced AI technology helps you create detailed, accurate statements that cover all necessary accessibility aspects.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container py-16 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Everything you need to know about accessibility statements and our generator.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="card p-4"><button className="w-full text-left font-semibold">Why do I need an accessibility statement?</button></div>
            <div className="card p-4"><button className="w-full text-left font-semibold">What are the legal requirements?</button></div>
            <div className="card p-4"><button className="w-full text-left font-semibold">Why is it important to declare both compliant and non-compliant items?</button></div>
            <div className="card p-4"><button className="w-full text-left font-semibold">What should my statement include?</button></div>
          </div>
        </section>

        {/* Generate Statement Form Section */}
        <section id="generate" className="container py-16 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-primary-700">Generate Your Statement</h2>
          <div className="card max-w-lg mx-auto p-8">
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Website URL */}
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  Website URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input"
                    placeholder="https://example.com"
                  />
                  {urlError && <p className="error">{urlError}</p>}
                </div>
              </div>

              {/* Legislation Selection */}
              <div>
                <label htmlFor="legislation" className="block text-sm font-medium text-gray-700">
                  Applicable Legislation
                </label>
                <select
                  id="legislation"
                  name="legislation"
                  value={legislation}
                  onChange={(e) => setLegislation(e.target.value)}
                  className="input"
                >
                  {LEGISLATION_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  {LEGISLATION_OPTIONS.find(opt => opt.value === legislation)?.description}
                </p>
              </div>

              {/* WCAG Version Selection */}
              <div>
                <label htmlFor="wcagVersion" className="block text-sm font-medium text-gray-700">
                  WCAG Version
                </label>
                <select
                  id="wcagVersion"
                  name="wcagVersion"
                  value={wcagVersion}
                  onChange={(e) => setWcagVersion(e.target.value)}
                  className="input"
                >
                  {WCAG_VERSIONS.map((version) => (
                    <option key={version.value} value={version.value}>
                      {version.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Exceptions Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Non-Compliant Items
                </label>
                <div className="mt-2 space-y-4">
                  {exceptions.map((exception, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{exception.name}</h4>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEditException(index)}
                              className="text-primary hover:text-blue-700"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveException(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{exception.reason}</p>
                        {exception.criteria && (
                          <p className="mt-1 text-sm text-gray-500">
                            <span className="font-medium">WCAG Criteria:</span> {exception.criteria}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Exception Form */}
                  <div className="border-t border-gray-200 pt-4">
                    <form onSubmit={handleAddException} className="space-y-4">
                      <div>
                        <label htmlFor="exceptionName" className="block text-sm font-medium text-gray-700">
                          Non-Compliant Item
                        </label>
                        <input
                          type="text"
                          id="exceptionName"
                          value={newException.name}
                          onChange={(e) => setNewException({ ...newException, name: e.target.value })}
                          className="input"
                          placeholder="e.g., PDF documents"
                        />
                      </div>
                      <div>
                        <label htmlFor="exceptionReason" className="block text-sm font-medium text-gray-700">
                          Reason for Non-Compliance
                        </label>
                        <textarea
                          id="exceptionReason"
                          value={newException.reason}
                          onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
                          rows={3}
                          className="input"
                          placeholder="Explain why this item is not compliant"
                        />
                      </div>
                      <div>
                        <label htmlFor="exceptionCriteria" className="block text-sm font-medium text-gray-700">
                          WCAG Criteria (Optional)
                        </label>
                        <input
                          type="text"
                          id="exceptionCriteria"
                          value={newException.criteria}
                          onChange={(e) => setNewException({ ...newException, criteria: e.target.value })}
                          className="input"
                          placeholder="e.g., 1.4.3 Contrast (Minimum)"
                        />
                      </div>
                      {addError && <p className="error">{addError}</p>}
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          {editIndex !== null ? 'Update Exception' : 'Add Exception'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-primary px-6 py-3 text-base"
                >
                  Generate Statement
                  <ArrowRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
} 