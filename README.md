# Lame-fo-Gife

A modern, interactive board game application built with React, TypeScript, and Vite. Fast, responsive, and developer-friendly.

## ✨ Features

- ⚡ **Lightning Fast**: Powered by Vite for instant HMR and rapid compilation
- 🎯 **Type-Safe**: Full TypeScript support with strict type checking
- 🎨 **Modern Styling**: SCSS with organized variables and component-specific styles
- 🚀 **Optimized Build**: Production-ready build pipeline with ESLint integration
- 📱 **Responsive Design**: Mobile-first approach with adaptive layouts
- ♻️ **Fast Refresh**: Hot module replacement for seamless development experience

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS (Sass)
- **Linting**: ESLint with TypeScript rules
- **Node**: v16 or higher

## 📦 Prerequisites

Before you begin, ensure you have:
- Node.js (v16+) and npm/yarn/pnpm installed
- Git for version control

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repository-url>
cd Lame-fo-Gife
npm install
```

### 2. Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server with HMR
npm run build    # Create optimized production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
npm run lint:fix # Run ESLint with automatic fixes
```

## 📂 Project Structure

```
src/
├── components/
│   ├── AppRouter.tsx      # Main routing component
│   └── screens/
│       └── Board.tsx      # Game board component
├── assets/
│   ├── images/            # Image assets
│   └── styles/
│       ├── main.scss      # Global styles
│       ├── base/
│       │   └── _variables.scss    # SCSS variables
│       └── elements/
│           └── _board.scss        # Board-specific styles
├── App.tsx                # Root component
├── App.css                # App-level styles
├── main.tsx               # Application entry point
└── index.css              # Global CSS resets
```

## 🎮 Usage

### Running the Application

1. Start the development server: `npm run dev`
2. Open your browser to `http://localhost:5173`
3. The board game will be interactive and ready to play

### Building for Deployment

```bash
npm run build
npm run preview  # Test the build locally
```

Deploy the `dist/` folder to your hosting provider.

## 🧹 Code Quality

This project uses ESLint for code quality and consistency. To lint your code:

```bash
npm run lint        # Check for issues
npm run lint:fix    # Fix issues automatically
```

### Recommended ESLint Enhancements

For production applications, consider enabling type-aware lint rules in `eslint.config.js`:

```javascript
tseslint.configs.recommendedTypeChecked
// or stricter:
tseslint.configs.strictTypeChecked
```

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Connect repo to Vercel
3. Deploy automatically on push

### Netlify
```bash
npm run build
# Deploy the dist/ folder
```

### Docker
Create a `Dockerfile` for containerized deployment:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically use the next available port.

### Styling Issues
Make sure SCSS variables are imported in your components:
```scss
@import 'assets/styles/base/variables';
```

### TypeScript Errors
Run `npm run lint:fix` to automatically fix type-related issues.

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing issues for solutions
- Review the [Vite docs](https://vitejs.dev) and [React docs](https://react.dev)

---

**Happy coding! 🎉**
