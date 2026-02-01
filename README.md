# Modern Portfolio Website

A stunning, responsive portfolio website showcasing GenAI, RAG, and LLMOps expertise with cutting-edge technologies, featuring smooth animations, dark/light mode support, and modern UI components. Optimized for GenAI/RAG/LLMOps internship opportunities.

![Portfolio Preview](./public/portfolio-preview.png)

## 🌟 Features

- **GenAI-Focused Content**: Showcasing RAG applications, LLM fine-tuning, and production ML systems
- **Interactive Metrics**: Real-time project metrics (accuracy, latency, ROUGE scores) displayed with animated cards
- **Featured Projects**: Gradient-bordered cards highlighting DoCopilot, FLAN-T5, and RoBERTa projects
- **Floating Resume Download**: Easy-access resume button with animated tooltips
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Modern UI Components**: Custom-built components with shadcn/ui
- **Performance Optimized**: Fast loading times with Next.js 15 optimizations
- **TypeScript**: Full type safety throughout the application
- **Interactive Elements**: Engaging hover effects and micro-interactions
- **SEO Optimized**: Meta tags and structured data for GenAI/RAG engineer visibility

## 🚀 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - UI library with latest features

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Aceternity UI](https://ui.aceternity.com/)** - 3D effects and advanced components
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library

### GenAI & Data Fetching
- **[SWR](https://swr.vercel.app/)** - Data fetching for GitHub and LeetCode stats
- **[Resend](https://resend.com/)** - Email service for contact form

### Additional Libraries
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
- **[React Hook Form](https://react-hook-form.com/)** - Form validation
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes

## 🎨 Color Palette

### Light Mode
- **Background**: `#F8F7F2` (Warm white)
- **Text Primary**: `#1F2937` (Dark gray)
- **Text Secondary**: `#6B7280` (Medium gray)
- **Accent Blue**: `#3B82F6` (Primary actions)
- **Success Green**: `#10B981` (Backend technologies)
- **Warning Yellow**: `#F59E0B` (Database technologies)
- **Purple**: `#8B5CF6` (AI/ML technologies)

### Dark Mode
- **Background**: `#0A0A0A` (Deep black)
- **Text Primary**: `#F9FAFB` (Off white)
- **Text Secondary**: `#D1D5DB` (Light gray)
- **Accent Blue**: `#60A5FA` (Primary actions)
- **Success Green**: `#34D399` (Backend technologies)
- **Warning Yellow**: `#FBBF24` (Database technologies)
- **Purple**: `#A78BFA` (AI/ML technologies)

### Gradient Accents
- **Aurora Effects**: Multi-color gradients with transparency
- **Card Backgrounds**: Subtle gradients with blur effects
- **Interactive Elements**: Dynamic color transitions

## 📁 Project Structure

```
portfolio_ts/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── About.tsx       # About section with CGPA stats
│   │   ├── Achievements.tsx # Google cert, Coursera, HF models
│   │   ├── Approach.tsx    # Development approach
│   │   ├── CodingStats.tsx # GitHub & LeetCode stats
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Education.tsx   # VIT Bhopal education
│   │   ├── FloatingResumeButton.tsx # Animated resume download
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Hero.tsx        # GenAI Engineer hero section
│   │   ├── Navbar.tsx      # Navigation header
│   │   ├── Projects.tsx    # Projects with metrics & featured badges
│   │   └── Skills.tsx      # 9 LLMOps skills + ML/DL/Full-Stack
│   ├── api/
│   │   └── send-email/
│   │       └── route.ts    # Email API endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout with SEO
│   └── page.tsx           # Home page
├── components/
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   ├── docopilot.png     # RAG project image
│   ├── flan-t5.png       # Dialogue summarizer image
│   ├── roberta-banking.png # Intent classifier image
│   └── Resume.pdf        # Resume file
└── components.json       # shadcn/ui config
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/noviciusss/portfolio_ts.git
   cd portfolio_ts
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Components

### Hero Section
- **GenAI Engineer & RAG Specialist** positioning
- Animated name with gradient text effects
- LinkedIn/GitHub hover cards with stats
- Call-to-action buttons
- Background gradient mesh effects

### About Section
- Interactive profile card with EvervaultCard effect
- **Live statistics**: 2+ years, 10+ projects, 8.45 CGPA
- GenAI-focused professional summary
- Resume-aligned content for internship optimization

### Skills Section
- **9 LLMOps & GenAI skills**: LangChain, LangGraph, Agno, Vector DBs, FastAPI, Hugging Face, Prompt Engineering, MLflow/W&B, Gradio/Streamlit
- 5 categorized sections: LLMOps, ML/DL, Languages, Full-Stack, Tools
- Progress indicators with skill levels
- Interactive hover effects with descriptions
- Technology icons from react-icons

### Projects Section
- **Featured badge system** for GenAI projects
- **Metric cards** displaying project results (accuracy, latency, ROUGE scores)
- **Gradient borders** on featured cards (DoCopilot, FLAN-T5, RoBERTa)
- 3D pin container effects with hover animations
- Real project images: docopilot.png, flan-t5.png, roberta-banking.png
- Technology tags with color coding
- Live demo and GitHub links

### Achievements Section
- Google IT Support Certificate with Credly verification
- Applied ML in Python - Coursera completion
- Published Hugging Face models (dialogue summarizer, intent classifier)
- VIT Bhopal academic excellence (8.45 CGPA)

### Floating Resume Button
- **Animated FAB** (Floating Action Button) appearing on scroll
- Gradient background with pulse animation
- Tooltip showing "GenAI Engineer & RAG Specialist"
- Smooth expand/collapse on hover
- Downloads Resume.pdf with custom filename

### Contact Section
- Functional contact form with Resend integration
- Social media links (LinkedIn, GitHub)
- Location: Pratapgarh, U.P.
- Professional email

## 🔧 Configuration

### Theme Configuration
The project uses `next-themes` for theme management. Themes are configured in the root layout and can be customized in `tailwind.config.js`.

### Component Styling
- Uses Tailwind CSS for styling
- Custom CSS variables for theme colors
- Responsive design patterns
- Animation configurations

### Performance Optimizations
- Image optimization with Next.js Image component
- Component memoization for expensive renders
- Lazy loading for below-fold content
- Optimized animations with `will-change` properties

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- Digital Ocean

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **SEO**: Structured data and meta tags
- **Accessibility**: WCAG 2.1 compliant

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Samarth Pratap Singh** - GenAI Engineer & RAG Specialist
- Portfolio: [portfolio-noviciusss.vercel.app](https://portfolio-noviciusss.vercel.app/)
- GitHub: [@noviciusss](https://github.com/noviciusss)
- LinkedIn: [Samarth Pratap Singh](https://www.linkedin.com/in/spsamar/)
- Hugging Face: [@noviciusss](https://huggingface.co/noviciusss)
- Location: Pratapgarh, U.P., India
- Education: BTech CSE, VIT Bhopal (8.45 CGPA)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- [Next.js](https://nextjs.org/) for the incredible framework

---

⭐ Star this repository if you found it helpful!