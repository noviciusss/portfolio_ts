# Modern Portfolio Website

A stunning, responsive portfolio website built with cutting-edge technologies, featuring smooth animations, dark/light mode support, and modern UI components.

![Portfolio Preview](./public/portfolio-preview.png)

## 🌟 Features

- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Modern UI Components**: Custom-built components with shadcn/ui
- **Performance Optimized**: Fast loading times with Next.js 14 optimizations
- **TypeScript**: Full type safety throughout the application
- **Interactive Elements**: Engaging hover effects and micro-interactions
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🚀 Tech Stack

### Core Framework
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 18](https://react.dev/)** - UI library with latest features

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library

### Additional Libraries
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme management
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
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Footer.tsx      # Footer component
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Hero section
│   │   ├── Projects.tsx    # Projects showcase
│   │   └── Skills.tsx      # Skills section
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── lib/
│   └── utils.ts           # Utility functions
├── public/                # Static assets
│   ├── images/           # Project images
│   └── Resume_samarth.pdf # Resume file
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
- Animated name and title
- Call-to-action buttons
- Background gradient effects
- Responsive typography

### About Section
- Interactive profile card with EvervaultCard effect
- Statistics cards with hover animations
- Professional summary
- Downloadable resume

### Projects Section
- 3D pin container effects
- Project cards with image previews
- Technology tags with color coding
- Live demo and GitHub links

### Skills Section
- Categorized skill display
- Progress indicators
- Interactive hover effects
- Technology icons

### Contact Section
- Functional contact form
- Social media links
- Professional email
- Location information

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

**Samarth Singh**
- Portfolio: [my-portfolio-url.vercel.app](https://portfolio-noviciusss.vercel.app/)
- GitHub: [@noviciusss](https://github.com/noviciusss)
- LinkedIn: [My LinkedIn Profile](https://www.linkedin.com/in/spsamar/)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component library
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first approach
- [Next.js](https://nextjs.org/) for the incredible framework

---

⭐ Star this repository if you found it helpful!