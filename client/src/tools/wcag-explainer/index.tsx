import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { wcag21Perceivable } from './guidelines/wcag21-perceivable';
import { wcag21Operable } from './guidelines/wcag21-operable';
import { wcag21Understandable } from './guidelines/wcag21-understandable';
import { wcag21Robust } from './guidelines/wcag21-robust';
import Fuse from 'fuse.js';

// WCAG Guidelines data structure
export interface WCAGGuideline {
  id: string;
  title: string;
  description: string;
  level: 'A' | 'AA' | 'AAA';
  category: 'Perceivable' | 'Operable' | 'Understandable' | 'Robust';
  subject: string[];
  successCriteria: {
    id: string;
    title: string;
    description: string;
    simpleLanguage: string;
    techniques: string[];
    examples: string[];
    wrongExample?: string;
    rightExample?: string;
    testingTools?: string[];
    references?: { label: string; url: string }[];
    screenReaderTips?: string[];
  }[];
}

// Combine all guidelines into a single array
const wcagGuidelines = [
  ...wcag21Perceivable,
  ...wcag21Operable,
  ...wcag21Understandable,
  ...wcag21Robust,
];

const subjectPills = ['All', 'Video', 'Image', 'Animation', 'Audio'];

const fuseOptions = {
  keys: [
    'title',
    'description',
    'successCriteria.title',
    'successCriteria.description',
    'successCriteria.techniques',
    'subject',
  ],
  threshold: 0.3,
  includeMatches: true,
};
const fuse = new Fuse(wcagGuidelines, fuseOptions);

export default function WCAGExplainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [expandedGuideline, setExpandedGuideline] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);

  const categories = ['all', 'Perceivable', 'Operable', 'Understandable', 'Robust'];
  const levels = ['all', 'A', 'AA', 'AAA'];

  useEffect(() => {
    if (searchTerm.length > 0) {
      const fuseResults = fuse.search(searchTerm);
      setSuggestions(fuseResults);
      setActiveSuggestion(-1);
    } else {
      setSuggestions([]);
      setActiveSuggestion(-1);
    }
  }, [searchTerm]);

  const filteredGuidelines = searchTerm.length > 0
    ? suggestions.map(result => result.item)
    : wcagGuidelines.filter(guideline => {
        const matchesCategory = selectedCategory === 'all' || guideline.category === selectedCategory;
        const matchesLevel = selectedLevel === 'all' || guideline.level === selectedLevel;
        const matchesSubject = selectedSubject === 'All' || guideline.subject.includes(selectedSubject);
        return matchesCategory && matchesLevel && matchesSubject;
      });

  function highlightMatch(text: string, matches: any[], key: string) {
    if (!matches) return text;
    const match = matches.find((m) => m.key === key);
    if (!match) return text;
    let result = '';
    let lastIndex = 0;
    match.indices.forEach(([start, end]: [number, number]) => {
      result += text.slice(lastIndex, start);
      result += `<mark class='bg-yellow-200'>${text.slice(start, end + 1)}</mark>`;
      lastIndex = end + 1;
    });
    result += text.slice(lastIndex);
    return result;
  }

  return (
    <>
      <Helmet>
        <title>WCAG Explainer - A11YO</title>
        <meta name="description" content="Understand WCAG guidelines with our interactive explainer tool. Get detailed explanations, examples, and implementation techniques." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              WCAG Explainer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understand WCAG guidelines with detailed explanations, examples, and implementation techniques.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {subjectPills.map((pill) => (
              <button
                key={pill}
                onClick={() => setSelectedSubject(pill)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                  selectedSubject === pill
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-primary border-gray-200 hover:bg-primary hover:text-white'
                }`}
                aria-pressed={selectedSubject === pill}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col items-center">
            <div className="w-full flex justify-center mb-6">
              <div className="relative w-full max-w-2xl">
                <input
                  type="text"
                  placeholder="Search guidelines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (suggestions.length > 0) {
                      if (e.key === 'ArrowDown') {
                        setActiveSuggestion((prev) => Math.min(prev + 1, suggestions.length - 1));
                      } else if (e.key === 'ArrowUp') {
                        setActiveSuggestion((prev) => Math.max(prev - 1, 0));
                      } else if (e.key === 'Enter' && activeSuggestion >= 0) {
                        setSearchTerm(suggestions[activeSuggestion].item.title);
                        setSuggestions([]);
                      }
                    }
                  }}
                  className="w-full pl-12 pr-10 py-7 border border-gray-300 rounded-full focus:ring-4 focus:ring-primary focus:border-primary text-3xl shadow-xl transition-all duration-200"
                  style={{ minWidth: '350px' }}
                  aria-autocomplete="list"
                  aria-controls="search-suggestions"
                  aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined}
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400" />
                {searchTerm && (
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
                {suggestions.length > 0 && (
                  <ul id="search-suggestions" className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg">
                    {suggestions.map((result, idx) => (
                      <li
                        key={result.item.id}
                        id={`suggestion-${idx}`}
                        className={`p-3 hover:bg-gray-100 cursor-pointer text-lg ${activeSuggestion === idx ? 'bg-primary/10' : ''}`}
                        onClick={() => {
                          setSearchTerm(result.item.title);
                          setSuggestions([]);
                        }}
                        dangerouslySetInnerHTML={{
                          __html: highlightMatch(result.item.title, result.matches, 'title'),
                        }}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl justify-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
              >
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level === 'all' ? 'All Levels' : `Level ${level}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guidelines List */}
          <div className="space-y-4">
            {filteredGuidelines.map((guideline) => (
              <div
                key={guideline.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedGuideline(expandedGuideline === guideline.id ? null : guideline.id)}
                  className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {guideline.id} {guideline.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          guideline.level === 'A' ? 'bg-green-100 text-green-800' :
                          guideline.level === 'AA' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          Level {guideline.level}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {guideline.category}
                        </span>
                        {guideline.subject.map((subj: string) => (
                          <span key={subj} className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            {subj}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600">{guideline.description}</p>
                    </div>
                    {expandedGuideline === guideline.id ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {expandedGuideline === guideline.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Success Criteria</h4>
                      {guideline.successCriteria.map((criteria: any) => (
                        <div key={criteria.id} className="mb-6 last:mb-0">
                          <h5 className="font-medium text-gray-900 mb-2">
                            {criteria.id} {criteria.title}
                          </h5>
                          <p className="text-gray-600 mb-4">{criteria.description}</p>
                          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                            <p className="text-lg font-medium text-gray-900">Simple Language:</p>
                            <p className="text-gray-700">{criteria.simpleLanguage}</p>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">Techniques</h6>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {criteria.techniques.map((technique: string, index: number) => (
                                  <li key={index}>{technique}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">Examples</h6>
                              <div className="space-y-2">
                                {criteria.examples.map((example: string, index: number) => (
                                  <pre key={index} className="bg-gray-50 p-3 rounded-lg text-sm overflow-x-auto">
                                    <code>{example}</code>
                                  </pre>
                                ))}
                              </div>
                            </div>
                          </div>
                          {criteria.wrongExample && criteria.rightExample && (
                            <div className="mt-4">
                              <h6 className="font-medium text-gray-900 mb-2">Visual Examples</h6>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <p className="text-red-600 font-medium">Wrong Implementation:</p>
                                  <pre className="bg-red-50 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                                    <code>{criteria.wrongExample}</code>
                                  </pre>
                                </div>
                                <div>
                                  <p className="text-green-600 font-medium">Right Implementation:</p>
                                  <pre className="bg-green-50 p-3 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                                    <code>{criteria.rightExample}</code>
                                  </pre>
                                </div>
                              </div>
                            </div>
                          )}
                          {criteria.testingTools && (
                            <div className="mt-4">
                              <h6 className="font-medium text-gray-900 mb-2">Testing Tools</h6>
                              <ul className="list-disc list-inside space-y-1 text-gray-600">
                                {criteria.testingTools.map((tool: string, index: number) => (
                                  <li key={index}>
                                    <a href={`https://www.w3.org/WAI/ER/tools/`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      {tool}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 