import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlobeAltIcon, ArrowRightIcon, PlusIcon, XMarkIcon, CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Layout from './components/Layout';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Helmet } from 'react-helmet';

// Meta information for social sharing
const META_INFO = {
  title: 'A11YO - Generate Compliant Accessibility Statements',
  description: 'Create WCAG 2.2 and EAA 2025 compliant accessibility statements with our AI-powered tool. Document your website\'s accessibility features and exceptions effortlessly.',
  image: '/og-image.png', // You'll need to add this image to your public folder
  url: 'https://a11yo.com'
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

// Pages
export const Home = () => {
  const [legislation, setLegislation] = useState('eaa-2025');
  const [wcagVersion, setWcagVersion] = useState('2.2');
  const [url, setUrl] = useState('');
  const [exceptions, setExceptions] = useState<Exception[]>([]);
  const [newException, setNewException] = useState<Exception>({
    name: '',
    reason: '',
    criteria: ''
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [urlError, setUrlError] = useState('');
  const [addError, setAddError] = useState<string>('');
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const navigate = useNavigate();

  // Add scroll handling
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        scrollToSection(hash);
      }
    };

    // Initial scroll if hash exists
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAddException = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newException.name || !newException.reason) {
      setAddError('Please fill in both the Non-Compliant Item and Reason for Non-Compliance fields.');
      return;
    }
    setAddError('');
    if (editIndex !== null) {
      // Edit mode
      const updated = [...exceptions];
      updated[editIndex] = newException;
      setExceptions(updated);
      setEditIndex(null);
    } else {
      setExceptions([...exceptions, newException]);
    }
    setNewException({ name: '', reason: '', criteria: '' });
  };

  const handleEditException = (index: number) => {
    setEditIndex(index);
    setNewException(exceptions[index]);
  };

  const handleRemoveException = (index: number) => {
    setExceptions(exceptions.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setNewException({ name: '', reason: '', criteria: '' });
    }
  };

  const getWcagLabel = (value: string) => {
    const found = WCAG_VERSIONS.find(v => v.value === value);
    return found ? found.label : value;
  };

  const handleGenerate = () => {
    if (!url) {
      setUrlError('Please enter your website URL.');
      return;
    }
    setUrlError('');
    navigate('/results', {
      state: {
        legislation,
        wcagVersion,
        wcagLabel: getWcagLabel(wcagVersion),
        url,
        exceptions
      }
    });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscriptionMessage(data.message || 'Successfully subscribed to our mailing list!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscriptionMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{META_INFO.title}</title>
        <meta name="description" content={META_INFO.description} />
        <meta property="og:title" content={META_INFO.title} />
        <meta property="og:description" content={META_INFO.description} />
        <meta property="og:image" content={META_INFO.image} />
        <meta property="og:url" content={META_INFO.url} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 flex items-center w-full bg-white">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-secondary-700 leading-tight">
                  Generate Compliant Accessibility Statements in Minutes
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Create WCAG 2.2 and EAA 2025 compliant accessibility statements with our AI-powered tool. Document your website's accessibility features and exceptions effortlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#generator"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('generator');
                    }}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-primary-300 hover:bg-primary-400 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Get Started Free
                  </a>
                  <a
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('features');
                    }}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-secondary-200 text-lg font-medium rounded-lg text-secondary-700 hover:bg-secondary-50 transition-colors"
                  >
                    Learn More
                  </a>
                </div>
              </div>
              <div className="flex justify-center">
                <img src="/hero.svg" alt="Accessibility illustration" className="w-full max-w-2xl object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-4">
          <div className="w-full px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-secondary-700 mb-6">
                Why Choose Our Generator?
              </h2>
              <p className="text-xl text-gray-600">
                Our AI-powered tool helps you create comprehensive accessibility statements that meet international standards.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <CheckCircleIcon className="h-8 w-8 text-primary-300" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-secondary-700">WCAG 2.2 Compliant</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Generate statements that meet the latest WCAG 2.2 guidelines, ensuring your documentation is up-to-date with current standards.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <CheckCircleIcon className="h-8 w-8 text-primary-300" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-secondary-700">EAA 2025 Ready</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Prepare for the European Accessibility Act 2025 requirements with comprehensive documentation of your website's accessibility features.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-primary-50 rounded-xl">
                    <CheckCircleIcon className="h-8 w-8 text-primary-300" />
                  </div>
                  <h3 className="ml-4 text-2xl font-semibold text-secondary-700">AI-Powered</h3>
                </div>
                <p className="text-gray-600 text-lg">
                  Our advanced AI technology helps you create detailed, accurate statements that cover all necessary accessibility aspects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-gray-50">
          <div className="w-full px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-secondary-700 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about accessibility statements and our generator.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === 'why' ? null : 'why')}
                  >
                    <span className="text-xl font-medium text-secondary-700">Why do I need an accessibility statement?</span>
                    <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform ${openFaq === 'why' ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === 'why' && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 text-lg mb-4">
                        An accessibility statement is a legal requirement in many jurisdictions and demonstrates your commitment to digital accessibility. It helps users understand your website's accessibility features and limitations, and provides a way for them to report issues or request alternative formats.
                      </p>
                      <p className="text-gray-600 text-lg">
                        According to the <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-400">European Accessibility Act (EAA) 2025</a>, private sector companies must provide an accessibility statement that includes both compliant and non-compliant aspects of their digital content.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === 'legal' ? null : 'legal')}
                  >
                    <span className="text-xl font-medium text-secondary-700">What are the legal requirements?</span>
                    <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform ${openFaq === 'legal' ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === 'legal' && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 text-lg mb-4">
                        Legal requirements vary by region and are constantly evolving. Here are the key regulations:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-4">
                        <li>
                          <strong>EU: European Accessibility Act (EAA) 2025</strong>
                          <br />
                          Requires private sector websites to be accessible and provide detailed accessibility statements. 
                          <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-400 ml-2">Read the full text</a>
                        </li>
                        <li>
                          <strong>US: Americans with Disabilities Act (ADA)</strong>
                          <br />
                          Title III requires businesses to provide equal access to their digital services.
                          <a href="https://www.ada.gov/resources/web-guidance/" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-400 ml-2">ADA Web Guidance</a>
                        </li>
                        <li>
                          <strong>WCAG Guidelines</strong>
                          <br />
                          The Web Content Accessibility Guidelines (WCAG) 2.2 Level AA is the current standard for web accessibility.
                          <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer" className="text-primary-300 hover:text-primary-400 ml-2">WCAG 2.2 Overview</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === 'compliance' ? null : 'compliance')}
                  >
                    <span className="text-xl font-medium text-secondary-700">Why is it important to declare both compliant and non-compliant items?</span>
                    <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform ${openFaq === 'compliance' ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === 'compliance' && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 text-lg mb-4">
                        Transparency in accessibility compliance is crucial for several reasons:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-4">
                        <li>
                          <strong>Legal Compliance</strong>
                          <br />
                          The EAA 2025 explicitly requires organizations to document both compliant and non-compliant aspects of their digital content. This transparency helps demonstrate good faith efforts toward accessibility.
                        </li>
                        <li>
                          <strong>User Trust</strong>
                          <br />
                          Users with disabilities need to know what features they can and cannot access. Clear documentation of limitations helps them make informed decisions about using your services.
                        </li>
                        <li>
                          <strong>Risk Management</strong>
                          <br />
                          Documenting known accessibility issues can help protect against legal claims by demonstrating awareness and commitment to improvement.
                        </li>
                        <li>
                          <strong>Continuous Improvement</strong>
                          <br />
                          Tracking non-compliant items helps prioritize accessibility improvements and demonstrates a commitment to ongoing enhancement.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <button
                    className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === 'include' ? null : 'include')}
                  >
                    <span className="text-xl font-medium text-secondary-700">What should my statement include?</span>
                    <ChevronDownIcon className={`h-6 w-6 text-gray-500 transform transition-transform ${openFaq === 'include' ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === 'include' && (
                    <div className="px-8 pb-6">
                      <p className="text-gray-600 text-lg mb-4">
                        A comprehensive accessibility statement should include:
                      </p>
                      <ul className="list-disc pl-5 text-gray-600 space-y-4">
                        <li>
                          <strong>Compliance Status</strong>
                          <br />
                          Clear declaration of WCAG conformance level and any applicable legislation (EAA, ADA, etc.)
                        </li>
                        <li>
                          <strong>Accessibility Features</strong>
                          <br />
                          Detailed list of implemented accessibility features and how users can benefit from them
                        </li>
                        <li>
                          <strong>Known Limitations</strong>
                          <br />
                          Transparent documentation of non-compliant items, including:
                          <ul className="list-disc pl-5 mt-2">
                            <li>Description of the limitation</li>
                            <li>Impact on users</li>
                            <li>Planned improvements</li>
                            <li>Alternative access methods</li>
                          </ul>
                        </li>
                        <li>
                          <strong>Feedback Mechanism</strong>
                          <br />
                          Clear process for users to report accessibility issues
                        </li>
                        <li>
                          <strong>Contact Information</strong>
                          <br />
                          Dedicated accessibility support contact details
                        </li>
                        <li>
                          <strong>Review Schedule</strong>
                          <br />
                          Regular review and update dates for the statement
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Generator Form Section */}
        <section id="generator" className="min-h-[75vh] py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-secondary-700 text-center mb-12">
              Generate Your Statement
            </h2>
            <div className="mx-auto max-w-2xl">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex flex-col space-y-6">
                  <div className="relative">
                    <select
                      value={legislation}
                      onChange={(e) => setLegislation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent appearance-none bg-white"
                    >
                      {LEGISLATION_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 -mt-4">
                    {LEGISLATION_OPTIONS.find(opt => opt.value === legislation)?.description}
                  </p>

                  <div className="relative">
                    <select
                      value={wcagVersion}
                      onChange={(e) => setWcagVersion(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent appearance-none bg-white"
                    >
                      {WCAG_VERSIONS.map(version => (
                        <option key={version.value} value={version.value}>
                          {version.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setUrlError(''); }}
                      placeholder="Enter your website URL"
                      className={`w-full px-4 py-3 pl-12 border ${urlError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-transparent`}
                    />
                    <GlobeAltIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
                  </div>

                  {/* Non-Compliant Items Pills Section */}
                  {exceptions.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-2">The following items are non-compliant:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exceptions.map((exception, index) => (
                          <span
                            key={exception.name + index}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-200"
                          >
                            <span className="mr-2">{exception.name}</span>
                            <button
                              onClick={() => handleEditException(index)}
                              className="text-primary-400 hover:text-primary-700 focus:outline-none mr-1"
                              aria-label={`Edit ${exception.name}`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleRemoveException(index)}
                              className="text-primary-400 hover:text-primary-700 focus:outline-none"
                              aria-label={`Remove ${exception.name}`}
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleAddException} className="space-y-4">
                    <div>
                      <label htmlFor="item" className="block text-sm font-medium text-gray-700">
                        Non-Compliant Item
                      </label>
                      <input
                        type="text"
                        id="item"
                        value={newException.name}
                        onChange={(e) => setNewException({ ...newException, name: e.target.value })}
                        placeholder="e.g., PDF documents, video content"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                        Reason for Non-Compliance
                      </label>
                      <textarea
                        id="reason"
                        value={newException.reason}
                        onChange={(e) => setNewException({ ...newException, reason: e.target.value })}
                        placeholder="Explain why this item is not compliant"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="criteria" className="block text-sm font-medium text-gray-700">
                        WCAG Criteria (Optional)
                      </label>
                      <input
                        type="text"
                        id="criteria"
                        value={newException.criteria}
                        onChange={(e) => setNewException({ ...newException, criteria: e.target.value })}
                        placeholder="e.g., 1.2.2, 1.2.3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-300 hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-300"
                    >
                      <PlusIcon className="h-5 w-5 mr-2" />
                      {editIndex !== null ? 'Update Exception' : 'Add Exception'}
                    </button>
                    {editIndex !== null && (
                      <button
                        type="button"
                        onClick={() => { setEditIndex(null); setNewException({ name: '', reason: '', criteria: '' }); }}
                        className="ml-2 text-sm text-gray-500 underline"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </form>
                  {addError && <p className="text-red-500 text-sm mt-2">{addError}</p>}

                  <button 
                    onClick={handleGenerate}
                    className="w-full px-4 py-3 bg-primary-300 text-white rounded-lg font-medium hover:bg-primary-400 transition-colors group"
                  >
                    Generate Statement
                    <ArrowRightIcon className="inline-block ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const Results = () => {
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [statement, setStatement] = useState('');

  useEffect(() => {
    if (location.state) {
      const { wcagVersion, url, exceptions } = location.state as LocationState;
      const cleanDomain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
      
      const complianceDetails: Record<string, ComplianceDetails> = {
        '2.2-AAA': {
          level: 'Level AAA',
          details: [
            'All images have descriptive alt text',
            'All form fields have proper labels and ARIA attributes',
            'Color contrast meets WCAG 2.2 Level AAA requirements',
            'All interactive elements are keyboard accessible',
            'All content is properly structured with semantic HTML',
            'All multimedia content has captions and transcripts',
            'All dynamic content updates are announced to screen readers',
            'All content is readable and understandable',
            'All functionality is available through keyboard navigation',
            'All content is compatible with assistive technologies'
          ]
        },
        '2.2-AA': {
          level: 'Level AA',
          details: [
            'All images have descriptive alt text',
            'All form fields have proper labels',
            'Color contrast meets WCAG 2.2 Level AA requirements',
            'All interactive elements are keyboard accessible',
            'Content is properly structured with semantic HTML',
            'All multimedia content has captions',
            'All dynamic content updates are announced to screen readers',
            'All functionality is available through keyboard navigation'
          ]
        }
      };

      const compliance = complianceDetails[wcagVersion] || complianceDetails['2.2-AA'];
      
      const baseStatement = `Accessibility Statement for ${cleanDomain}

This accessibility statement applies to ${cleanDomain}. We are committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

Conformance Status
-----------------
We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 ${compliance.level}. These guidelines explain how to make web content more accessible for people with disabilities.

Compliance Details
-----------------
Our website has been designed and developed with accessibility in mind. We have implemented the following accessibility features:

${compliance.details.map((detail: string) => `• ${detail}`).join('\n')}

${exceptions.length > 0 ? `
Known Limitations
----------------
We are aware of the following accessibility limitations:

${exceptions.map((exception: Exception) => `• ${exception.name}: ${exception.reason}`).join('\n')}
` : ''}

Feedback and Contact Information
------------------------------
We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at [contact information].

Enforcement Procedure
-------------------
If you are not satisfied with our response, you can contact the relevant enforcement body in your country.

Last Updated: ${new Date().toLocaleDateString()}`;

      setStatement(baseStatement);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Accessibility Statement</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-300 hover:bg-primary-400"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          {isEditing ? (
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-gray-700">{statement}</pre>
          )}
        </div>
      </div>
    </div>
  );
};

const Templates = () => (
  <div className="space-y-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-900">Statement Templates</h1>
      <p className="mt-2 text-gray-600">Browse pre-generated accessibility statement templates for the latest regulations</p>
    </motion.div>

    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">EAA 2025 Template</h2>
          <div className="prose prose-sm max-w-none">
            <h3>Compliance Status</h3>
            <p>This website is being updated to comply with the European Accessibility Act (EAA) 2025, which requires private sector companies to make their products and services accessible to people with disabilities.</p>
            
            <h3>Compliance Requirements</h3>
            <ul>
              <li>WCAG 2.2 Level AA compliance</li>
              <li>Accessible digital content and services</li>
              <li>Alternative formats for non-accessible content</li>
              <li>Regular accessibility testing and updates</li>
            </ul>

            <h3>Feedback and Contact Information</h3>
            <p>We welcome your feedback on the accessibility of our website. Please contact us at [contact information].</p>

            <h3>Enforcement Procedure</h3>
            <p>If you are not satisfied with our response, you can contact the relevant enforcement body in your country.</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">ADA Template</h2>
          <div className="prose prose-sm max-w-none">
            <h3>Accessibility Statement</h3>
            <p>We are committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
            
            <h3>Conformance Status</h3>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. These guidelines explain how to make web content more accessible for people with disabilities.</p>

            <h3>Accessibility Measures</h3>
            <ul>
              <li>Regular accessibility audits</li>
              <li>Staff accessibility training</li>
              <li>Alternative formats available</li>
              <li>Ongoing improvements</li>
            </ul>

            <h3>Feedback and Contact</h3>
            <p>We welcome your feedback on the accessibility of our website. Please contact us at [contact information].</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const Compliance = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold text-secondary-700 mb-8">Accessibility Compliance Statement</h1>
    
    <div className="prose prose-lg max-w-none">
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Our Commitment to Accessibility</h2>
        <p className="text-gray-600 mb-4">
          A11YO is committed to ensuring digital accessibility for people of all abilities. We strive to continually improve the user experience for everyone and apply the relevant accessibility standards.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Conformance Status</h2>
        <p className="text-gray-600 mb-4">
          We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. These guidelines explain how to make web content more accessible for people with disabilities.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Accessibility Features</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Semantic HTML structure for better screen reader compatibility</li>
          <li>Keyboard navigation support throughout the application</li>
          <li>High contrast color scheme for better readability</li>
          <li>Alternative text for all images</li>
          <li>ARIA labels for interactive elements</li>
          <li>Responsive design for various screen sizes</li>
          <li>Clear focus indicators for keyboard navigation</li>
          <li>Form labels and error messages</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Known Limitations</h2>
        <p className="text-gray-600 mb-4">
          While we strive to ensure that our website is accessible, some content may not be fully accessible due to limitations in our content management system or other factors. We are continuously working to improve the accessibility of our website.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Feedback and Contact Information</h2>
        <p className="text-gray-600 mb-4">
          We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us at:
        </p>
        <a href="mailto:hello@fergflannery.com" className="text-primary-300 hover:text-primary-400">
          hello@fergflannery.com
        </a>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Assessment Methods</h2>
        <p className="text-gray-600 mb-4">
          We assess the accessibility of our website using the following methods:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Automated accessibility testing tools</li>
          <li>Manual testing with screen readers</li>
          <li>Keyboard-only navigation testing</li>
          <li>Regular audits by accessibility experts</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-secondary-700 mb-4">Last Updated</h2>
        <p className="text-gray-600">
          This statement was last updated on {new Date().toLocaleDateString()}.
        </p>
      </section>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Helmet>
        <title>{META_INFO.title}</title>
        <meta name="description" content={META_INFO.description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={META_INFO.url} />
        <meta property="og:title" content={META_INFO.title} />
        <meta property="og:description" content={META_INFO.description} />
        <meta property="og:image" content={META_INFO.image} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={META_INFO.url} />
        <meta property="twitter:title" content={META_INFO.title} />
        <meta property="twitter:description" content={META_INFO.description} />
        <meta property="twitter:image" content={META_INFO.image} />
      </Helmet>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/results" element={<Results />} />
          <Route path="/compliance" element={<Compliance />} />
        </Routes>
      </Layout>
      <Analytics />
    </Router>
  );
};

export default App;
