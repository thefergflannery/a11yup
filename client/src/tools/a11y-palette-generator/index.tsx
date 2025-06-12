import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Convert hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1: string, color2: string) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

// Get WCAG rating
function getWCAGRating(ratio: number) {
  if (ratio >= 7) return { level: 'AAA', size: 'Large', pass: true };
  if (ratio >= 4.5) return { level: 'AA', size: 'Large', pass: true };
  if (ratio >= 3) return { level: 'AA', size: 'Small', pass: true };
  return { level: 'Fail', size: 'Any', pass: false };
}

// Generate a color that passes WCAG with the given foreground color
function generateAccessibleColor(foregroundColor: string): string {
  const MAX_ATTEMPTS = 100;
  let attempts = 0;
  
  while (attempts < MAX_ATTEMPTS) {
    const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    const ratio = getContrastRatio(color, foregroundColor);
    if (ratio >= 4.5) { // AA level for large text
      return color;
    }
    attempts++;
  }
  
  // If we can't find a color that passes, return a high-contrast color
  return foregroundColor === '#000000' ? '#ffffff' : '#000000';
}

// Generate a palette of accessible colors
function generatePalette(count = 5, foregroundColor: string) {
  return Array.from({ length: count }, () => generateAccessibleColor(foregroundColor));
}

export default function A11yPaletteGenerator() {
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [palette, setPalette] = useState(() => generatePalette(5, foregroundColor));
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const handleGenerate = () => {
    setPalette(generatePalette(5, foregroundColor));
    setSelectedColor(null);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
      if (e.code === 'Escape') {
        setSelectedColor(null);
        setShowHelp(false);
      }
      if (e.code === 'KeyH') {
        setShowHelp(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <Helmet>
        <title>A11y Colour Palette Generator - A11YO</title>
        <meta name="description" content="Generate a random accessible color palette. All colors are WCAG contrast safe." />
      </Helmet>
      <div className="min-h-screen font-dm-sans flex flex-col bg-olive">
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-gray-900">
              A11y Colour Palette Generator
            </h1>
            <div className="flex items-center gap-4 text-gray-500 mb-6">
              <p className="text-center">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded">space</kbd> to generate
              </p>
              <p className="text-center">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded">h</kbd> for help
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex">
            {palette.map((color, idx) => (
              <div 
                key={color} 
                className="flex-1 flex flex-col items-center justify-between h-[calc(100vh-200px)] group cursor-pointer relative"
                onClick={() => {
                  if (selectedColor === color) {
                    copyToClipboard(color, idx);
                  } else {
                    setSelectedColor(selectedColor === color ? null : color);
                  }
                }}
              >
                <div
                  className="w-full h-full flex flex-col items-center justify-between p-4 transition-all duration-300 group-hover:scale-105"
                  style={{ background: color }}
                >
                  <div className="w-full flex justify-between items-start">
                    <span 
                      className="font-mono text-sm px-2 py-1 rounded bg-white/90 shadow-sm cursor-pointer hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(color, idx);
                      }}
                    >
                      {copiedIndex === idx ? 'Copied!' : color}
                    </span>
                    <button
                      className="px-2 py-1 rounded bg-white/90 shadow-sm hover:bg-white text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForegroundColor(color);
                        setPalette(generatePalette(5, color));
                      }}
                    >
                      Set as Text
                    </button>
                  </div>
                  
                  <div className="w-full flex-1 flex items-center justify-center">
                    <div 
                      className="p-4 rounded-lg text-center w-full"
                      style={{ 
                        background: color,
                        color: foregroundColor
                      }}
                    >
                      <p className="text-lg font-bold">Sample Text</p>
                      <p className="text-sm">Contrast: {getContrastRatio(color, foregroundColor).toFixed(2)}:1</p>
                      <p className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          WCAG {getWCAGRating(getContrastRatio(color, foregroundColor)).level}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {selectedColor && selectedColor !== color && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-xs">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-lg shadow-md" style={{ background: selectedColor }} />
                          <span className="text-xs mt-1 font-mono">{selectedColor}</span>
                        </div>
                        <div className="text-2xl text-gray-400">×</div>
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 rounded-lg shadow-md" style={{ background: color }} />
                          <span className="text-xs mt-1 font-mono">{color}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Contrast Ratio:</span>
                          <span className="font-mono">{getContrastRatio(selectedColor, color).toFixed(2)}:1</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">WCAG Rating:</span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getWCAGRating(getContrastRatio(selectedColor, color)).level}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Text Size:</span>
                          <span className="text-sm text-gray-600">
                            {getWCAGRating(getContrastRatio(selectedColor, color)).size}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={handleGenerate}
              className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Generate New Palette
            </button>
            {selectedColor && (
              <button
                onClick={() => setSelectedColor(null)}
                className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Clear Selection
              </button>
            )}
          </div>

          {showHelp && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-gray-100 rounded">space</kbd>
                    <span>Generate new palette</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-gray-100 rounded">h</kbd>
                    <span>Show/hide help</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-3 py-1 bg-gray-100 rounded">esc</kbd>
                    <span>Clear selection</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 