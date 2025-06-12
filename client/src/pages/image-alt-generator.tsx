import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowUpTrayIcon, PencilIcon, CheckIcon } from '@heroicons/react/24/outline';

interface AltTextSuggestion {
  text: string;
  confidence: number;
  reasoning: string;
}

export default function ImageAltGenerator() {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AltTextSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
    if (event.target.value) {
      setImagePreview(event.target.value);
    }
  };

  const generateAltText = async () => {
    if (!imageUrl) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/alt-text/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate alt text');
      }

      const data = await response.json();
      setSuggestions(data.suggestions);
      setSelectedSuggestion(data.suggestions[0].text);
    } catch (error) {
      console.error('Error generating alt text:', error);
      // Show error to user
      setSuggestions([{
        text: "Error generating alt text. Please try again.",
        confidence: 0,
        reasoning: "An error occurred while processing your request."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Image Alt Text Generator | A11YO</title>
        <meta name="description" content="Generate WCAG-compliant alt text for your images using AI. Make your images accessible to everyone." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Image Alt Text Generator
            </h1>
            <p className="text-xl text-gray-600">
              Generate meaningful, WCAG-compliant alt text for your images using AI
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="space-y-6">
              {/* Image Input Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Upload an image or enter an image URL
                </label>
                <div className="flex gap-4">
                  <label className="flex-1">
                    <span className="sr-only">Choose file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-primary file:text-white
                        hover:file:bg-primary/90"
                    />
                  </label>
                  <div className="flex-1">
                    <input
                      type="url"
                      placeholder="Or paste image URL here"
                      value={imageUrl}
                      onChange={handleUrlInput}
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateAltText}
                disabled={!imageUrl || isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <ArrowUpTrayIcon className="h-5 w-5" />
                    Generate Alt Text
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {suggestions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Generated Alt Text Suggestions
              </h2>
              
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      selectedSuggestion === suggestion.text
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-2">
                          {suggestion.text}
                        </p>
                        <p className="text-sm text-gray-600">
                          Confidence: {Math.round(suggestion.confidence * 100)}%
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          {suggestion.reasoning}
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedSuggestion(suggestion.text)}
                        className={`p-2 rounded-full ${
                          selectedSuggestion === suggestion.text
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <CheckIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edit Selected Alt Text
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedSuggestion}
                    onChange={(e) => setSelectedSuggestion(e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Copy Button */}
              <button
                onClick={() => navigator.clipboard.writeText(selectedSuggestion)}
                className="mt-4 w-full btn-secondary"
              >
                Copy Alt Text
              </button>
            </div>
          )}

          {/* Guidelines Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Alt Text Guidelines
            </h2>
            <div className="prose prose-sm max-w-none">
              <ul className="space-y-2 text-gray-600">
                <li>• Be specific and concise</li>
                <li>• Describe the content and function of the image</li>
                <li>• Avoid phrases like "image of" or "picture of"</li>
                <li>• Include text that's part of the image</li>
                <li>• For decorative images, use empty alt text (alt="")</li>
                <li>• Consider the context where the image appears</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 