import { BookOpen, Code2, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Interactive Tutorial</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Learn Quarto
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Master creating beautiful documents, presentations, and websites with .qmd files in RStudio
        </p>
        
        <p className="text-base text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          From basic markdown to advanced scientific publishing, learn everything you need to become proficient with Quarto
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-400">
          <div className="flex items-center gap-2 px-6 py-3 bg-card rounded-xl border shadow-sm">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">10+ Lessons</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-card rounded-xl border shadow-sm">
            <Code2 className="w-5 h-5 text-secondary" />
            <span className="text-sm font-medium">Code Examples</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-card rounded-xl border shadow-sm">
            <Sparkles className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Interactive</span>
          </div>
        </div>
        
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-14 duration-700 delay-500">
          <a 
            href="https://lovable.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <span>Powered by</span>
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="font-medium">Lovable AI</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;