# A11YO - Accessibility Tools Platform

A collection of free accessibility tools to help you build more inclusive websites.

## Project Structure

```
/src
  /tools                    # Individual tool implementations
    /accessibility-statement # Accessibility Statement Generator
    /[new-tool]            # Future tools
  /pages                    # Page components
    index.tsx              # Landing page
    /accessibility-statement # Tool-specific pages
  /components              # Shared components
  /config                  # Configuration files
  /types                   # TypeScript type definitions
  /assets                  # Static assets
```

## Available Tools

1. **Accessibility Statement Generator** (`/accessibility-statement`)
   - Generate WCAG-compliant accessibility statements
   - Supports multiple legislation standards
   - Customizable exceptions and compliance details

2. **Color Contrast Checker** (Coming Soon)
   - Check color pair contrast ratios
   - WCAG compliance validation
   - Color suggestions for better accessibility

3. **Logo Checker** (Coming Soon)
   - Verify logo accessibility
   - Check contrast and visibility
   - Generate accessible versions

## Development

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
