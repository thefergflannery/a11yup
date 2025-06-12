import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

function luminance([r, g, b]: number[]) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrast(rgb1: number[], rgb2: number[]) {
  const lum1 = luminance(rgb1);
  const lum2 = luminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Tailwind-styled color picker
function TailwindColorPicker({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative flex flex-col items-center justify-center gap-2 w-full">
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-14 h-14 rounded-full border-2 border-gray-200 shadow focus:ring-2 focus:ring-primary-300 transition-all"
          style={{ background: value }}
        />
        <input
          type="text"
          value={value}
          onChange={e => {
            const v = e.target.value;
            if (/^#([0-9A-Fa-f]{0,6})$/.test(v)) onChange(v);
          }}
          maxLength={7}
          className="input w-24 text-center mt-1"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}

export default function ColorContrastChecker() {
  const [fg, setFg] = useState('#1a2233');
  const [bg, setBg] = useState('#ffffff');
  const ratio = contrast(hexToRgb(fg), hexToRgb(bg));
  const passesAA = ratio >= 4.5;
  const passesAAA = ratio >= 7;
  const passesAALarge = ratio >= 3;

  return (
    <>
      <Helmet>
        <title>Color Contrast Checker - A11YO</title>
        <meta name="description" content="Check if your color pairs meet WCAG guidelines. Instantly see contrast ratio and pass/fail." />
      </Helmet>
      <div
        className="min-h-screen font-dm-sans flex flex-col items-center justify-center py-20 transition-colors duration-300 relative"
        style={{ background: bg }}
      >
        {/* Large background text for preview */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span
            className="text-7xl md:text-9xl font-extrabold opacity-10"
            style={{ color: fg }}
          >
            Aa
          </span>
        </div>
        {/* Dynamic heading outside the card */}
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-2 z-10 text-center drop-shadow"
          style={{ color: fg }}
        >
          Color Contrast Checker
        </h1>
        <div className="text-sm text-gray-400 mb-6 text-center">Color Contrast Checker v1.0.0</div>
        <div className="relative card max-w-lg w-full p-10 bg-white/80 rounded-3xl shadow-xl border border-gray-100 backdrop-blur-md z-10">
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex-1">
              <TailwindColorPicker value={fg} onChange={setFg} label="Foreground Color" />
            </div>
            <div className="flex-1">
              <TailwindColorPicker value={bg} onChange={setBg} label="Background Color" />
            </div>
          </div>
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-2xl font-bold" style={{ color: fg }}>A</span>
              <span className="text-2xl font-bold" style={{ color: bg, background: fg, padding: '0 0.5em', borderRadius: '0.25em' }}>A</span>
            </div>
            <div className="rounded-lg p-4 text-center" style={{ color: fg, background: bg }}>
              <div className="text-lg font-semibold">Live Preview</div>
              <div className="text-base">The quick brown fox jumps over the lazy dog.</div>
            </div>
          </div>
          <div className="mb-4 text-center">
            <div className="text-2xl font-bold mb-2">Contrast Ratio: {ratio.toFixed(2)}:1</div>
            <div className="flex flex-col gap-1">
              <div className={passesAA ? 'text-green-600' : 'text-red-600'}>WCAG AA (Normal Text): {passesAA ? 'Pass' : 'Fail'}</div>
              <div className={passesAALarge ? 'text-green-600' : 'text-red-600'}>WCAG AA (Large Text): {passesAALarge ? 'Pass' : 'Fail'}</div>
              <div className={passesAAA ? 'text-green-600' : 'text-red-600'}>WCAG AAA: {passesAAA ? 'Pass' : 'Fail'}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 