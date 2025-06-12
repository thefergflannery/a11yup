import type { WCAGGuideline } from '../index';

export const wcag21Operable: WCAGGuideline[] = [
  // Example entry for 2.1 Keyboard Accessible
  {
    id: '2.1',
    title: 'Keyboard Accessible',
    description: 'Make all functionality available from a keyboard.',
    level: 'A',
    category: 'Operable',
    subject: ['Keyboard', 'ARIA', 'Screen Reader'],
    successCriteria: [
      {
        id: '2.1.1',
        title: 'Keyboard',
        description: 'All functionality of the content is operable through a keyboard interface.',
        simpleLanguage: 'Everything should work with just a keyboard, no mouse needed.',
        techniques: [
          'Ensure all interactive elements are keyboard accessible',
          'Use tabindex and ARIA roles appropriately',
          'Test with screen readers and keyboard only',
          'Provide visible focus indicators'
        ],
        examples: [
          '<button tabindex="0">Click me</button>',
          '<a href="#" tabindex="0">Link</a>'
        ],
        wrongExample: '<div role="button">Click me</div>',
        rightExample: '<button tabindex="0">Click me</button>',
        testingTools: ['WAVE', 'Axe', 'Lighthouse', 'NVDA', 'VoiceOver'],
        references: [
          { label: 'WCAG 2.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html' },
          { label: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' }
        ],
        screenReaderTips: [
          'Test navigation using only the keyboard (Tab, Shift+Tab, Enter, Space)',
          'Ensure focus order is logical and visible'
        ]
      }
    ]
  },
  // Add more guidelines and success criteria for Operable principle here
]; 