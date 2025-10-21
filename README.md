# Interactive Quarto Tutorial

An interactive web application for learning Quarto. This tutorial provides hands-on lessons with live code editing and rendering capabilities.

![Quarto Quest](https://img.shields.io/badge/Built%20with-Lovable%20AI-blueviolet)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.19-purple)

## Features

- 📚 **9 Comprehensive Lessons** covering Quarto basics to advanced topics
- 💻 **Interactive Code Editor** powered by Monaco Editor
- 🎨 **Live Preview** of Quarto documents
- ✅ **Progress Tracking** with localStorage persistence
- 🎯 **Interactive Exercises** with hints and solutions


## Lessons Included

1. **What is Quarto?** - Introduction to Quarto and its capabilities
2. **QMD File Structure** - Understanding YAML, markdown, and code chunks
3. **YAML Headers** - Document metadata and configuration
4. **Markdown Basics** - Essential markdown syntax
5. **Code Chunks** - Executing R and Python code in documents
6. **Figures & Images** - Including and customizing visuals
7. **Tables** - Creating beautiful tables
8. **Output Formats** - HTML, PDF, Word, and presentations
9. **Quarto Websites** - Building multi-page websites

## Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage


## Project Structure

```
quarto-quest/
├── src/
│   ├── components/          # React components
│   │   ├── lessons/        # Individual lesson components
│   │   ├── CodeEditor.tsx  # Monaco-based code editor
│   │   ├── InteractiveExercise.tsx
│   │   └── QuartoPreview.tsx
│   ├── lib/                # Utility functions
│   │   └── quartoService.ts # Mock Quarto rendering service
│   ├── pages/              # Page components
│   └── index.css           # Global styles and color scheme
├── public/                 # Static assets
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with the help of [Lovable AI](https://lovable.dev)
- Powered by [Quarto](https://quarto.org)
- UI components from [shadcn/ui](https://ui.shadcn.com)

## Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a client-side simulation of Quarto rendering. For production use with actual Quarto execution, you'll need to implement a backend service that runs Quarto CLI.
