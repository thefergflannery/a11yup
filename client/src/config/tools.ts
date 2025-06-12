export interface Tool {
  name: string;
  path: string;
  description: string;
  icon?: string;
  comingSoon?: boolean;
}

export const tools: Tool[] = [
  {
    name: 'Accessibility Statement Generator',
    path: '/accessibility-statement',
    description: 'Generate WCAG-compliant accessibility statements for your website in minutes.',
    icon: 'document-text',
  },
  {
    name: 'Color Contrast Checker',
    path: '/color-contrast-checker',
    description: 'Check if your color pairs meet WCAG guidelines.',
    icon: 'color-swatch',
  },
  {
    name: 'Logo Checker',
    path: '/logo-checker',
    description: 'Verify your logo meets accessibility requirements.',
    icon: 'photo',
  },
  {
    name: 'Image Alt Text Generator',
    path: '/alt-text-generator',
    description: 'Generate and review alt text for all images on your site.',
    icon: 'a',
    comingSoon: true,
  },
  {
    name: 'Video Checker',
    path: '/video-checker',
    description: 'List all videos and check if they are decorative or require descriptions.',
    icon: 'video',
    comingSoon: true,
  },
  {
    name: 'Accessibility Feedback Widget Generator',
    path: '/feedback-widget',
    description: 'Easily add a feedback widget to your site for accessibility issues.',
    icon: 'chat',
    comingSoon: true,
  },
  {
    name: 'Vision Simulator Embed Tool',
    path: '/vision-simulator',
    description: 'Simulate different types of vision on your website with an embeddable tool.',
    icon: 'eye-dropper',
    comingSoon: true,
  },
  {
    name: 'WCAG Explainer Wizard',
    path: '/wcag-explainer',
    description: 'Get step-by-step explanations of WCAG requirements for your team.',
    icon: 'sparkles',
    comingSoon: true,
  },
  {
    name: 'A11y Colour Palette Generator',
    path: '/a11y-palette-generator',
    description: 'Generate a random accessible color palette for your next project.',
    icon: 'color-swatch',
  },
]; 