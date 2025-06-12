import type { WCAGGuideline } from '../index';

export const wcag21Perceivable: WCAGGuideline[] = [
  // Example entry for 1.1 Non-text Content
  {
    id: '1.1',
    title: 'Non-text Content',
    description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
    level: 'A',
    category: 'Perceivable',
    subject: ['Image', 'ARIA', 'Screen Reader'],
    successCriteria: [
      {
        id: '1.1.1',
        title: 'Non-text Content',
        description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
        simpleLanguage: 'Every image, icon, or graphic should have a text description so everyone can understand it.',
        techniques: [
          'Use alt text for images that convey information',
          'Use empty alt text for decorative images',
          'Use aria-label or aria-labelledby for complex images',
          'Test with screen readers to ensure alt text is read correctly'
        ],
        examples: [
          '<img src="logo.png" alt="Company Logo">',
          '<img src="decorative.png" alt="">',
          '<svg aria-label="Pie chart showing sales distribution"></svg>'
        ],
        wrongExample: '<img src="logo.png">',
        rightExample: '<img src="logo.png" alt="Company Logo">',
        testingTools: ['WAVE', 'Axe', 'Lighthouse', 'NVDA', 'VoiceOver'],
        references: [
          { label: 'WCAG 1.1.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html' },
          { label: 'ARIA Authoring Practices', url: 'https://www.w3.org/WAI/ARIA/apg/' }
        ],
        screenReaderTips: [
          'Check that all images have meaningful alt text or are marked as decorative',
          'Verify that screen readers announce the alt text as expected'
        ]
      }
    ]
  },
  {
    id: '1.2',
    title: 'Time-based Media',
    description: 'Provide alternatives for time-based media such as video and audio.',
    level: 'A',
    category: 'Perceivable',
    subject: ['Video', 'Audio', 'Screen Reader'],
    successCriteria: [
      {
        id: '1.2.1',
        title: 'Audio-only and Video-only (Prerecorded)',
        description: 'Provide an alternative for audio-only and video-only content.',
        simpleLanguage: 'If you have a video or audio clip, make sure there is a text version (like a transcript) so everyone can understand it.',
        techniques: [
          'Provide transcripts for audio-only content',
          'Provide captions or descriptions for video-only content',
          'Test with screen readers to ensure alternatives are accessible'
        ],
        examples: [
          'Transcript for a podcast episode',
          'Audio description for a silent video'
        ],
        wrongExample: 'Video without captions or transcript',
        rightExample: 'Video with captions and a transcript available',
        testingTools: ['WAVE', 'Axe', 'Lighthouse', 'NVDA', 'VoiceOver'],
        references: [
          { label: 'WCAG 1.2.1', url: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html' }
        ],
        screenReaderTips: [
          'Check that transcripts and captions are accessible to screen readers'
        ]
      },
      // ... Add all 1.2.x success criteria here ...
    ]
  },
  // ... Add all 1.3, 1.4, etc. guidelines and their success criteria ...
]; 