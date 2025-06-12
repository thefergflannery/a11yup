import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages';
import Blog from './pages/blog';
import AccessibilityStatementGenerator from './tools/accessibility-statement';
import AccessibilityStatementResults from './tools/accessibility-statement/results';
import ColorContrastChecker from './tools/color-contrast-checker';
import LogoChecker from './tools/logo-checker';
import AccessibilityStatement from './pages/accessibility-statement';
import A11yPaletteGenerator from './tools/a11y-palette-generator';
import WCAGExplainer from './pages/wcag-explainer';
import ImageAltGenerator from './pages/image-alt-generator';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            <Route path="/accessibility-statement/results" element={<AccessibilityStatementResults />} />
            <Route path="/color-contrast-checker" element={<ColorContrastChecker />} />
            <Route path="/logo-checker" element={<LogoChecker />} />
            <Route path="/a11y-palette-generator" element={<A11yPaletteGenerator />} />
            <Route path="/wcag-explainer" element={<WCAGExplainer />} />
            <Route path="/image-alt-generator" element={<ImageAltGenerator />} />
          </Routes>
        </Layout>
        <Analytics />
      </Router>
    </HelmetProvider>
  );
};

export default App; 