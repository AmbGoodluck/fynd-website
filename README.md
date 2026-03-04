# Fynd - AI Travel Discovery Platform

A production-ready, mobile-first landing site for Fynd, an AI-powered travel discovery startup. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- ✨ **AI-Powered Discovery**: Personalized travel suggestions in 2 minutes
- 🎨 **Apple-Style Minimalism**: Clean, premium design with soft tech aesthetic
- 🚀 **Performance Optimized**: Deployed on Cloudflare Pages with zero CLS
- 📱 **Mobile-First**: Fully responsive and accessible
- 🔒 **Privacy-Focused**: No login required, no data collection
- ✅ **SEO Ready**: Dynamic metadata, OpenGraph, and JSON-LD schema

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (Static Export)

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Development

```bash
# Build for production
npm run build

# Preview production build locally
npm start

# Run linting
npm run lint
```

## Deployment to Cloudflare Pages

### Option 1: Via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/fynd-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**:
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project" → "Connect to Git"
   - Authorize GitHub and select your repository
   - Configure build settings:
     - **Framework preset**: Next.js
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
   - Deploy

3. **Configure Custom Domain** (Optional):
   - In Cloudflare Pages project settings
   - Add your custom domain (e.g., `fynd.ai`)

### Option 2: Using Wrangler CLI

```bash
# Install Wrangler
npm install -g @cloudflare/wrangler

# Build the project
npm run build

# Deploy
wrangler pages deploy out/
```

### Environment Variables

No environment variables required for base deployment.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Atomic components
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   └── sections/           # Page sections
│       ├── Navigation.tsx
│       ├── Hero.tsx
│       ├── Problems.tsx
│       ├── HowItWorks.tsx
│       ├── ProductPreview.tsx
│       ├── Features.tsx
│       └── Footer.tsx
└── lib/                    # Utilities
```

## Configuration

### Colors

Custom palette in `tailwind.config.ts`:

- **Fynd Green**: `#2BB673` (Primary)
- **Fynd Dark**: `#248E5D` (Hover)
- **Fynd Light**: `#4FCC8E` (Accent)

### Fonts

- **UI**: Inter (Google Fonts)
- **Hero**: Instrument Serif (Google Fonts)

## Performance Targets

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## Accessibility

- WCAG 2.1 Level AA
- 4.5:1 contrast ratios
- ARIA labels on all interactive elements
- Keyboard navigation

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- iOS Safari 12+
- Chrome Android

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add feature"`
3. Push: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT - See LICENSE for details.

## Support

- GitHub Issues: [Create an issue](https://github.com/yourusername/fynd-website/issues)
- Email: support@fynd.ai
