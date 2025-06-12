import type { WCAGGuideline } from '../index';

export const wcag21Understandable: WCAGGuideline[] = [
  // Example entry for 3.1 Readable
  {
    id: '3.1',
    title: 'Readable',
    description: 'Make text content readable and understandable.',
    level: 'A',
    category: 'Understandable',
    subject: ['Text', 'ARIA', 'Screen Reader'],
    successCriteria: [
      {
        id: '3.1.1',
        title: 'Language of Page',
        description: 'The default human language of each Web page can be programmatically determined.',
        simpleLanguage: 'Set the language of your page so screen readers can pronounce words correctly.',
        techniques: [
          'Use the lang attribute on the HTML element',
          'Set language for all content and widgets',
          'Test with screen readers for correct pronunciation'
        ],
        examples: [
          '<html lang="en">',
          '<html lang="fr">'
        ],
        wrongExample: '<html>',
        rightExample: '<html lang="en">',
        testingTools: ['WAVE', 'Axe', 'Lighthouse', 'NVDA', 'VoiceOver'],
        references: [
          { label: 'WCAG 3.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html' },
          { label: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' }
        ],
        screenReaderTips: [
          'Check that screen readers announce the correct language',
          'Switch screen reader language settings to test different languages'
        ]
      },
      // ... Add all 3.1.x, 3.2.x, 3.3.x success criteria here ...
    ]
  },
  // ... Add all 3.x guidelines and their success criteria ...
]; 