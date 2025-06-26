# NestFT.dev 🚀

**Build Real Experience. Get Hired.**

A collaborative development platform where developers work on real-world projects, get AI-graded feedback, and build professional portfolios that showcase the experience employers seek.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🌟 Overview

NestFT.dev bridges the gap between traditional coding education and real-world development experience. Our platform provides:

- **Real-world Projects**: Curated projects that mirror actual industry requirements
- **AI-Powered Grading**: Intelligent feedback system that evaluates code quality, functionality, and best practices
- **Collaborative Environment**: Browser-based IDE with real-time collaboration features
- **Progressive Learning**: Structured learning paths from beginner to advanced levels
- **Professional Portfolios**: Automatically generated portfolios showcasing completed projects
- **Industry Recognition**: Certificates and achievements that employers value

## ✨ Key Features

### 🎯 **Project-Based Learning**
- **60+ Real-world Projects** across different difficulty levels
- **Multiple Tech Stacks**: Frontend, Backend, Full-stack, and DevOps projects
- **Industry-Relevant**: Projects designed by experienced developers and industry professionals

### 🤖 **AI-Powered Assessment**
- **Intelligent Code Review**: AI analyzes code quality, structure, and best practices
- **Detailed Feedback**: Comprehensive reports with improvement suggestions
- **Scoring System**: Fair and consistent grading based on industry standards
- **Learning Insights**: Personalized recommendations for skill development

### 👥 **Collaborative Development**
- **Real-time Collaboration**: Work with other developers simultaneously
- **Browser-based IDE**: Full-featured development environment with Monaco Editor
- **Version Control**: Integrated Git workflow with GitHub synchronization
- **Code Reviews**: Peer review system for enhanced learning

### 📊 **Progress Tracking**
- **Skill Progression**: Clear advancement through beginner, intermediate, and advanced levels
- **Leaderboards**: Global rankings based on project completions and code quality
- **Achievement System**: Certificates and badges for milestones and accomplishments
- **Portfolio Generation**: Professional portfolios with live project demonstrations

### 🛠 **Development Tools**
- **Multi-language Support**: JavaScript, TypeScript, Python, and more
- **Framework Templates**: React, Vue, Angular, Node.js, Express, Django
- **Deployment Integration**: One-click deployment to popular hosting platforms
- **Terminal Access**: Full terminal functionality for advanced development workflows

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/nestft-dev.git
   cd nestft-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   ```bash
   # Initialize Supabase (if using local development)
   npx supabase start
   
   # Run migrations
   npx supabase db reset
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Architecture

### Tech Stack

**Frontend:**
- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Monaco Editor** - VS Code-powered code editor

**Backend & Database:**
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security** - Database-level security policies
- **Real-time Subscriptions** - Live data synchronization

**Development Tools:**
- **XTerm.js** - Terminal emulation
- **HTML2Canvas** - Certificate generation
- **JSZip** - Project export functionality
- **Zustand** - State management

### Project Structure

```
nestft-dev/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── projects/          # Project management
│   │   ├── ide/              # Integrated Development Environment
│   │   └── ...
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── ide/              # IDE-specific components
│   │   └── auth/             # Authentication components
│   ├── lib/                  # Utility functions and configurations
│   │   ├── database.ts       # Database operations
│   │   ├── supabase.ts       # Supabase client
│   │   ├── store.ts          # Global state management
│   │   └── aiGrading.ts      # AI grading system
│   ├── types/                # TypeScript type definitions
│   └── data/                 # Static data and project templates
├── supabase/
│   ├── migrations/           # Database migrations
│   └── config.toml          # Supabase configuration
└── public/                   # Static assets
```

## 🎓 Learning Paths

### Beginner Track
- **HTML/CSS Fundamentals**
- **JavaScript Basics**
- **Responsive Design**
- **Basic React Components**

### Intermediate Track
- **Advanced React Patterns**
- **State Management**
- **API Integration**
- **Testing Fundamentals**

### Advanced Track
- **Full-stack Applications**
- **Database Design**
- **Authentication Systems**
- **Deployment & DevOps**

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting
- **Conventional Commits** for commit messages

## 📊 Database Schema

### Core Tables

- **`user_profiles`** - Extended user information and progress tracking
- **`user_projects`** - Project instances and code storage
- **`project_submissions`** - Submission data and AI grading results
- **`learning_guides`** - Structured learning content
- **`user_achievements`** - Certificates and accomplishments

### Security

- **Row Level Security (RLS)** enabled on all tables
- **Authentication-based policies** for data access
- **Encrypted sensitive data** storage

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅ |
| `NODE_ENV` | Environment (development/production) | ✅ |

### Supabase Setup

1. Create a new Supabase project
2. Run the provided migrations
3. Configure authentication providers
4. Set up Row Level Security policies

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Set environment variables** in Netlify dashboard
4. **Deploy** automatically on push to main branch

### Vercel

1. **Import project** to Vercel
2. **Configure environment variables**
3. **Deploy** with automatic CI/CD

### Docker

```bash
# Build the image
docker build -t nestft-dev .

# Run the container
docker run -p 3000:3000 nestft-dev
```

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with Next.js automatic code splitting
- **Database**: Efficient queries with proper indexing

## 🔒 Security

- **Authentication**: Supabase Auth with multiple providers
- **Authorization**: Row Level Security policies
- **Data Validation**: Server-side validation for all inputs
- **HTTPS**: Enforced in production
- **CORS**: Properly configured for API access

## 📱 Browser Support

- **Chrome** (latest 2 versions)
- **Firefox** (latest 2 versions)
- **Safari** (latest 2 versions)
- **Edge** (latest 2 versions)

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Database Connection:**
```bash
# Check Supabase status
npx supabase status
```

**Environment Variables:**
- Ensure all required variables are set
- Check for typos in variable names
- Verify Supabase project configuration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend platform
- **Vercel** for Next.js and deployment infrastructure
- **Monaco Editor** for the powerful code editing experience
- **The Open Source Community** for the amazing tools and libraries

## 📞 Support

- **Documentation**: [docs.nestft.dev](https://docs.nestft.dev)
- **Community**: [Discord Server](https://discord.gg/nestft-dev)
- **Issues**: [GitHub Issues](https://github.com/your-username/nestft-dev/issues)
- **Email**: support@nestft.dev

---

<div align="center">
  <p>Built with ❤️ by the NestFT.dev team</p>
  <p>
    <a href="https://nestft.dev">Website</a> •
    <a href="https://docs.nestft.dev">Documentation</a> •
    <a href="https://twitter.com/nestftdev">Twitter</a> •
    <a href="https://linkedin.com/company/nestft-dev">LinkedIn</a>
  </p>
</div>