import type { WCAGGuideline } from '../index';

export const wcag21Robust: WCAGGuideline[] = [
  // Example entry for 4.1 Compatible
  {
    id: '4.1',
    title: 'Compatible',
    description: 'Maximize compatibility with current and future user tools, including assistive technologies.',
    level: 'A',
    category: 'Robust',
    subject: ['Compatibility', 'ARIA', 'Screen Reader'],
    successCriteria: [
      {
        id: '4.1.1',
        title: 'Parsing',
        description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique.',
        simpleLanguage: 'Make sure your HTML is valid and free of errors so assistive technologies can understand it.',
        techniques: [
          'Validate HTML for errors',
          'Ensure proper nesting of elements',
          'Check for duplicate IDs',
          'Use ARIA attributes according to specification'
        ],
        examples: [
          '<div><p>Valid HTML</p></div>',
          '<div><p>Invalid HTML</div>'
        ],
        wrongExample: '<div><p>Invalid HTML</div>',
        rightExample: '<div><p>Valid HTML</p></div>',
        testingTools: ['WAVE', 'Axe', 'Lighthouse', 'NVDA', 'VoiceOver'],
        references: [
          { label: 'WCAG 4.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html' },
          { label: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' }
        ],
        screenReaderTips: [
          'Test with multiple screen readers to ensure compatibility',
          'Check for ARIA errors using browser dev tools'
        ]
      }
    ]
  }
  // Add more guidelines and success criteria for Robust principle here
]; 