import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

interface LocationState {
  legislation: string;
  wcagVersion: string;
  wcagLabel: string;
  url: string;
  exceptions: Array<{
    name: string;
    reason: string;
    criteria?: string;
  }>;
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [statement, setStatement] = useState('');
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  if (!state) {
    navigate('/accessibility-statement');
    return null;
  }

  const getLegislationName = (value: string) => {
    const legislationMap: Record<string, string> = {
      'eaa-2025': 'European Accessibility Act (EAA) 2025',
      'eu-directive': 'EU Web Accessibility Directive',
      'ada': 'Americans with Disabilities Act (ADA)',
      'section-508': 'Section 508'
    };
    return legislationMap[value] || value;
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(statement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Implement PDF download functionality
  };

  const handleBack = () => {
    navigate('/accessibility-statement');
  };

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Implement feedback submission
    setFeedbackMessage('Thank you for your feedback!');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-dm-sans bg-pattern">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-secondary-700 sm:text-5xl md:text-6xl">
            Your Accessibility Statement
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Review and customize your generated accessibility statement.
          </p>
        </div>

        {/* Statement Content */}
        <div className="card">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-6">
              {/* Statement Text */}
              <div>
                <label htmlFor="statement" className="block text-sm font-medium text-gray-700">
                  Statement Text
                </label>
                <div className="mt-1">
                  <textarea
                    id="statement"
                    name="statement"
                    rows={20}
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    className="input"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-primary"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="btn btn-primary"
                >
                  Download as PDF
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn btn-secondary"
                >
                  Back to Generator
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-16 card">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-secondary-700">
              Help Us Improve
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                Your feedback helps us make our tools better. Let us know what you think!
              </p>
            </div>
            <form onSubmit={handleFeedback} className="mt-5 sm:flex sm:max-w-md">
              <label htmlFor="feedback" className="sr-only">
                Feedback
              </label>
              <textarea
                id="feedback"
                name="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className="input"
                placeholder="Share your thoughts..."
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
            {feedbackMessage && (
              <p className={`mt-2 text-sm ${feedbackMessage.includes('Thank you') ? 'success' : 'error'}`}>
                {feedbackMessage}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 