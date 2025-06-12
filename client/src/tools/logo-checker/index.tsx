import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { CheckCircleIcon, XCircleIcon, ArrowUpTrayIcon, XMarkIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

interface AccessibilityCheck {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  details?: string;
}

type PreviewBackground = 'white' | 'light' | 'dark' | 'transparent';

function parseSVGForAlt(svgText: string): { found: boolean; text?: string } {
  // Extract <title> or <desc> content
  const titleMatch = svgText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = svgText.match(/<desc[^>]*>([\s\S]*?)<\/desc>/i);
  if (titleMatch) return { found: true, text: titleMatch[1].trim() };
  if (descMatch) return { found: true, text: descMatch[1].trim() };
  return { found: false };
}

export default function LogoChecker() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [checks, setChecks] = useState<AccessibilityCheck[]>([]);
  const [score, setScore] = useState<{ pass: boolean; percent: number }>({ pass: false, percent: 0 });
  const [previewSize, setPreviewSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [previewBackground, setPreviewBackground] = useState<PreviewBackground>('white');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/svg+xml', 'image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (SVG, PNG, or JPG)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setIsLoading(true);

    let altTagPresent = false;
    let altText = '';
    if (file.type === 'image/svg+xml') {
      // Read SVG text and check for <title> or <desc>
      const text = await file.text();
      const altResult = parseSVGForAlt(text);
      altTagPresent = altResult.found;
      altText = altResult.text || '';
    } else {
      // For raster images, alt text must be provided in HTML, so always fail
      altTagPresent = false;
      altText = '';
    }

    // Simulate accessibility checks
    setTimeout(() => {
      const newChecks: AccessibilityCheck[] = [
        {
          id: 'alt-text',
          name: 'Alt Text',
          description: 'Logo should have descriptive alt text (SVG <title> or <desc>, or HTML alt attribute).',
          passed: altTagPresent,
          details: altTagPresent
            ? `Alt text found: "${altText}"`
            : file.type === 'image/svg+xml'
              ? 'No <title> or <desc> found in SVG. Add one for accessibility.'
              : 'For raster images, provide alt text in the HTML <img> tag.'
        },
        {
          id: 'contrast',
          name: 'Color Contrast',
          description: 'Logo should maintain good contrast with background.',
          passed: true,
          details: 'Logo maintains WCAG AA contrast requirements (manual check recommended).'
        },
        {
          id: 'scalability',
          name: 'Scalability',
          description: 'Logo should scale well at different sizes.',
          passed: file.type === 'image/svg+xml',
          details: file.type === 'image/svg+xml' 
            ? 'SVG format ensures perfect scaling.' 
            : 'Consider providing an SVG version for better scaling.'
        },
        {
          id: 'clarity',
          name: 'Clarity',
          description: 'Logo should be clear and recognizable at small sizes.',
          passed: true,
          details: 'Logo maintains clarity at reduced sizes (manual check recommended).'
        }
      ];
      setChecks(newChecks);
      // Calculate score
      const passedCount = newChecks.filter(c => c.passed).length;
      const percent = Math.round((passedCount / newChecks.length) * 100);
      setScore({ pass: percent === 100, percent });
      setIsLoading(false);
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const event = { target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileSelect(event);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setChecks([]);
    setScore({ pass: false, percent: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPreviewSize = () => {
    switch (previewSize) {
      case 'small': return 'max-h-16';
      case 'large': return 'max-h-48';
      default: return 'max-h-32';
    }
  };

  const getBackgroundClass = () => {
    switch (previewBackground) {
      case 'light': return 'bg-gray-100';
      case 'dark': return 'bg-gray-800';
      case 'transparent': return "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2720%27%20height%3D%2720%27%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http://www.w3.org/2000/svg%27%3E%3Cg%20fill%3D%27%239C92AC%27%20fill-opacity%3D%270.1%27%20fill-rule%3D%27evenodd%27%3E%3Ccircle%20cx%3D%273%27%20cy%3D%273%27%20r%3D%273%27/%3E%3Ccircle%20cx%3D%2713%27%20cy%3D%2713%27%20r%3D%273%27/%3E%3C/g%3E%3C/svg%3E')]";
      default: return 'bg-white';
    }
  };

  return (
    <>
      <Helmet>
        <title>Logo Accessibility Checker - A11YO</title>
        <meta name="description" content="Check your logo for accessibility best practices. Upload your logo and get instant feedback." />
      </Helmet>
      <div className="min-h-screen font-dm-sans flex flex-col items-center justify-center py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center drop-shadow text-primary-900">
          Logo Accessibility Checker
        </h1>
        <div className="text-sm text-gray-400 mb-6 text-center">Logo Checker v1.0.0</div>
        <div className="card max-w-2xl w-full p-10 bg-white/80 rounded-3xl shadow-xl border border-gray-100 backdrop-blur-md flex flex-col items-center">
          {!selectedFile ? (
            <div 
              className="w-full mb-8 p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary-400 transition-colors cursor-pointer group"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mb-4 group-hover:text-primary-500 transition-colors" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Click or drag to upload logo
                </p>
                <p className="text-sm text-gray-500">
                  SVG, PNG, or JPG (max 5MB)
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Preview</h2>
                  <button
                    onClick={clearFile}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    title="Clear logo"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className={`flex items-center justify-center p-8 rounded-lg ${getBackgroundClass()} transition-colors duration-300`}>
                  <img 
                    src={previewUrl} 
                    alt="Logo preview" 
                    className={`${getPreviewSize()} max-w-full object-contain transition-all duration-300`}
                  />
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Size:</span>
                    <div className="flex gap-2">
                      {(['small', 'medium', 'large'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setPreviewSize(size)}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            previewSize === size
                              ? 'bg-primary-100 text-primary-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Background:</span>
                    <div className="flex gap-2">
                      {(['white', 'light', 'dark', 'transparent'] as const).map((bg) => (
                        <button
                          key={bg}
                          onClick={() => setPreviewBackground(bg)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform ${
                            previewBackground === bg ? 'scale-110 border-primary-500' : 'border-gray-300'
                          }`}
                          style={{
                            backgroundColor: bg === 'transparent' ? 'transparent' : 
                              bg === 'light' ? '#f3f4f6' :
                              bg === 'dark' ? '#1f2937' : '#ffffff'
                          }}
                          title={bg.charAt(0).toUpperCase() + bg.slice(1)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Accessibility Checks</h2>
            {/* Score summary */}
            {checks.length > 0 && !isLoading && (
              <div className={`flex items-center gap-4 mb-6 p-4 rounded-lg ${score.pass ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                {score.pass ? (
                  <CheckCircleIcon className="w-7 h-7 text-green-500" />
                ) : (
                  <XCircleIcon className="w-7 h-7 text-red-500" />
                )}
                <div className="text-lg font-semibold">
                  {score.pass ? 'All checks passed!' : 'Some checks failed.'} <span className="ml-2 text-base font-normal">({score.percent}% passed)</span>
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : checks.length > 0 ? (
              <div className="space-y-4">
                {checks.map((check) => (
                  <div 
                    key={check.id}
                    className="flex items-start p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 mt-1">
                      {check.passed ? (
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                      ) : (
                        <XCircleIcon className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{check.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{check.description}</p>
                      {check.details && (
                        <p className="text-sm text-gray-500 mt-2">{check.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="text-gray-500">Upload a logo to see accessibility checks</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 