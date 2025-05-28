# A11YO - Accessibility Statement Generator

A11YO is a web application that helps organizations create compliant accessibility statements that meet international standards and regulations, including WCAG 2.2 and EAA 2025 requirements.

## Features

- Generate WCAG 2.2 compliant accessibility statements
- Support for multiple legislation types (EAA 2025, ADA, Section 508)
- Document both compliant and non-compliant items
- AI-powered statement generation
- Mailing list subscription for updates

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS, Vite
- Backend: Node.js, Express
- Email Marketing: Mailchimp
- Analytics: Vercel Analytics

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Mailchimp API credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/allyup.git
cd allyup
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_SERVER_PREFIX=your_server_prefix
MAILCHIMP_LIST_ID=your_list_id
```

4. Start the development server:
```bash
# Start both client and server
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or feedback, please contact hello@fergflannery.com 