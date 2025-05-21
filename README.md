# A11yo - Accessibility Statement Generator

A11yo is a micro-SaaS tool that helps website owners generate legally compliant accessibility statements. It provides automated scanning, customization options, and multiple export formats.

## Features

- Automated accessibility statement generation
- Optional accessibility scanning using axe-core
- Support for EU and US jurisdictions
- WCAG 2.2 compliance level selection (A/AA/AAA)
- Multiple export formats (PDF, HTML, text)
- Clean, accessible UI built with React and TailwindCSS

## Tech Stack

- Frontend: React + TailwindCSS
- Backend: Node.js + Express
- Accessibility Scanning: axe-core
- PDF Generation: Puppeteer
- Authentication: Clerk/Supabase (optional)
- Hosting: Vercel (Frontend) + Heroku (Backend)

## Project Structure

```
a11yo/
├── client/             # React frontend
├── server/             # Node.js backend
├── shared/             # Shared types and utilities
└── docs/              # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/a11yo.git
cd a11yo
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In the server directory
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers
```bash
# Start frontend (from client directory)
npm run dev

# Start backend (from server directory)
npm run dev
```

## Development

- Frontend runs on http://localhost:3000
- Backend runs on http://localhost:3001

## License

MIT 