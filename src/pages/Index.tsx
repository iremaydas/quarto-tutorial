import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import LessonCard from "@/components/LessonCard";
import LessonSection from "@/components/LessonSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import { 
  FileText, 
  Code2, 
  Settings, 
  Image, 
  Table2, 
  PieChart,
  BookOpen,
  Presentation,
  Globe,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { executeCodeChunk, renderQuartoDocument } from "@/lib/quartoService";
import FiguresLesson from "@/components/lessons/FiguresLesson";
import TablesLesson from "@/components/lessons/TablesLesson";
import OutputFormatsLesson from "@/components/lessons/OutputFormatsLesson";
import WebsitesLesson from "@/components/lessons/WebsitesLesson";

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  
  // Load completed lessons from localStorage on component mount
  useEffect(() => {
    const savedLessons = localStorage.getItem('completedLessons');
    if (savedLessons) {
      try {
        const parsedLessons = JSON.parse(savedLessons);
        setCompletedLessons(new Set(parsedLessons));
      } catch (e) {
        console.error('Failed to parse saved lessons:', e);
      }
    }
  }, []);
  
  // Save completed lessons to localStorage whenever they change
  useEffect(() => {
    if (completedLessons.size > 0) {
      localStorage.setItem('completedLessons', JSON.stringify([...completedLessons]));
    }
  }, [completedLessons]);

  const lessons = [
    {
      id: "intro",
      title: "What is Quarto?",
      description: "Learn the basics of Quarto and why it's powerful for reproducible research and publishing",
      icon: BookOpen,
      difficulty: "Beginner" as const,
      duration: "5 min"
    },
    {
      id: "qmd-structure",
      title: "QMD File Structure",
      description: "Understand the anatomy of a .qmd file: YAML header, markdown content, and code chunks",
      icon: FileText,
      difficulty: "Beginner" as const,
      duration: "10 min"
    },
    {
      id: "yaml-header",
      title: "YAML Headers",
      description: "Master document metadata, output formats, and configuration options",
      icon: Settings,
      difficulty: "Beginner" as const,
      duration: "8 min"
    },
    {
      id: "markdown",
      title: "Markdown Basics",
      description: "Learn markdown syntax for formatting text, lists, links, and more",
      icon: FileText,
      difficulty: "Beginner" as const,
      duration: "12 min"
    },
    {
      id: "code-chunks",
      title: "Code Chunks",
      description: "Execute R and Python code directly in your documents with inline results",
      icon: Code2,
      difficulty: "Intermediate" as const,
      duration: "15 min"
    },
    {
      id: "figures",
      title: "Figures & Images",
      description: "Include and customize images, plots, and diagrams in your documents",
      icon: Image,
      difficulty: "Intermediate" as const,
      duration: "10 min"
    },
    {
      id: "tables",
      title: "Tables",
      description: "Create beautiful tables from markdown and code output",
      icon: Table2,
      difficulty: "Intermediate" as const,
      duration: "12 min"
    },
    {
      id: "output-formats",
      title: "Output Formats",
      description: "Generate HTML, PDF, Word, and presentation formats from the same source",
      icon: Presentation,
      difficulty: "Advanced" as const,
      duration: "15 min"
    },
    {
      id: "websites",
      title: "Quarto Websites",
      description: "Build entire websites and blogs with Quarto's website project type",
      icon: Globe,
      difficulty: "Advanced" as const,
      duration: "20 min"
    },
  ];

  const renderIntroLesson = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedLesson(null)}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="What is Quarto?"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              <strong>Quarto</strong> is an open-source scientific and technical publishing system built on Pandoc. 
              It allows you to create dynamic content with Python, R, Julia, and Observable, weaving together 
              narrative text and code to produce elegantly formatted output.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Why Use Quarto?</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Reproducible Research:</strong> Combine code and narrative in one document</li>
              <li><strong>Multiple Outputs:</strong> Create HTML, PDF, Word docs, presentations from same source</li>
              <li><strong>Language Agnostic:</strong> Works with R, Python, Julia, and more</li>
              <li><strong>Beautiful Defaults:</strong> Professional-looking documents out of the box</li>
              <li><strong>Flexible:</strong> From simple reports to entire websites</li>
            </ul>
            <h4 className="text-xl font-semibold mt-6 mb-3">Quarto vs R Markdown</h4>
            <p>
              If you're familiar with R Markdown, Quarto is the next generation. It's designed to be 
              multilingual and provide a unified approach to scientific communication across languages and outputs.
            </p>
          </div>
        }
        codeExample={{
          code: `# Example: A simple Quarto document creates:
- Research papers with embedded analysis
- Interactive dashboards
- Course materials and tutorials
- Books and websites
- Presentations (reveal.js slides)`,
          title: "What You Can Create",
          description: "Quarto enables a wide range of scientific and technical outputs"
        }}
      />

      <Button 
        onClick={() => {
          setCompletedLessons(prev => new Set(prev).add("intro"));
          setSelectedLesson("qmd-structure");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full"
        size="lg"
      >
        Next: QMD File Structure <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );

  const renderQmdStructureLesson = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedLesson(null)}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="QMD File Structure"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              A <code>.qmd</code> file has three main components that work together to create your document:
            </p>
            <div className="grid gap-4 mt-6">
              <Card className="p-4 border-l-4 border-l-primary">
                <h4 className="font-semibold text-lg mb-2">1. YAML Header (Metadata)</h4>
                <p className="text-muted-foreground">
                  Defines document settings, title, author, output format, and more. 
                  Enclosed between <code>---</code> markers at the top of the file.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-secondary">
                <h4 className="font-semibold text-lg mb-2">2. Markdown Content (Narrative)</h4>
                <p className="text-muted-foreground">
                  Your text, headings, lists, links, and formatted content using markdown syntax.
                </p>
              </Card>
              <Card className="p-4 border-l-4 border-l-accent">
                <h4 className="font-semibold text-lg mb-2">3. Code Chunks (Computation)</h4>
                <p className="text-muted-foreground">
                  Executable code blocks (R, Python, etc.) that generate output, plots, and tables.
                </p>
              </Card>
            </div>
          </div>
        }
        codeExample={{
          code: `---
title: "My First Quarto Document"
author: "Your Name"
format: html
---

# Introduction

This is a paragraph with **bold** and *italic* text.

\`\`\`{r}
# This is an R code chunk
summary(cars)
plot(cars)
\`\`\`

## Conclusion

Here are my findings...`,
          title: "Complete QMD Example",
          description: "A simple .qmd file showing all three components"
        }}
      />

      <Button 
        onClick={() => {
          setCompletedLessons(prev => new Set(prev).add("qmd-structure"));
          setSelectedLesson("yaml-header");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full"
        size="lg"
      >
        Next: YAML Headers <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );

  const renderYamlLesson = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedLesson(null)}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="YAML Headers"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              The YAML header controls how your document looks and behaves. It's written in YAML 
              (YAML Ain't Markup Language) syntax and must be placed at the very beginning of your .qmd file.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Common YAML Options</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li><code>title</code>: Document title</li>
              <li><code>author</code>: Author name(s)</li>
              <li><code>date</code>: Publication date</li>
              <li><code>format</code>: Output format (html, pdf, docx)</li>
              <li><code>execute</code>: Code execution options</li>
              <li><code>toc</code>: Table of contents settings</li>
            </ul>
          </div>
        }
        codeExample={{
          code: `---
title: "My Analysis Report"
author: "Jane Smith"
date: "2024-01-15"
format:
  html:
    toc: true
    toc-depth: 2
    code-fold: true
    theme: cosmo
execute:
  echo: true
  warning: false
  message: false
---`,
          title: "Advanced YAML Example",
          description: "Document with table of contents, custom theme, and code execution settings"
        }}
      />

      <Button 
        onClick={() => {
          setCompletedLessons(prev => new Set(prev).add("yaml-header"));
          setSelectedLesson("markdown");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full"
        size="lg"
      >
        Next: Markdown Basics <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );

  const renderMarkdownLesson = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedLesson(null)}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="Markdown Basics"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Markdown is a lightweight markup language for formatting text. It's easy to read and write,
              and converts beautifully to HTML and other formats.
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Essential Markdown Syntax</h4>
            <div className="space-y-3">
              <div>
                <p className="font-semibold">Headers:</p>
                <code className="block bg-muted p-2 rounded mt-1">
                  # Heading 1<br />
                  ## Heading 2<br />
                  ### Heading 3
                </code>
              </div>
              <div>
                <p className="font-semibold">Text Formatting:</p>
                <code className="block bg-muted p-2 rounded mt-1">
                  **bold text**<br />
                  *italic text*<br />
                  ***bold and italic***
                </code>
              </div>
              <div>
                <p className="font-semibold">Lists:</p>
                <code className="block bg-muted p-2 rounded mt-1">
                  - Bullet point<br />
                  - Another point<br />
                  <br />
                  1. Numbered item<br />
                  2. Second item
                </code>
              </div>
            </div>
          </div>
        }
        codeExample={{
          code: `# My Research Findings

## Introduction

This study examines **climate change** impacts. Key points:

- Temperature rising
- Sea levels increasing  
- *Urgent action needed*

## Methods

We analyzed data from three sources:

1. Satellite observations
2. Ground stations
3. Ocean buoys

Visit [NOAA](https://www.noaa.gov) for more data.`,
          title: "Markdown in Action",
          description: "Real-world example of markdown formatting"
        }}
      />

      <Button 
        onClick={() => {
          setCompletedLessons(prev => new Set(prev).add("markdown"));
          setSelectedLesson("code-chunks");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full"
        size="lg"
      >
        Next: Code Chunks <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );

  const renderCodeChunksLesson = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => setSelectedLesson(null)}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="Code Chunks"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Code chunks allow you to execute code and include results directly in your document. 
              This is where Quarto's power for reproducible research shines!
            </p>
            <h4 className="text-xl font-semibold mt-6 mb-3">Code Chunk Syntax</h4>
            <p>Code chunks are enclosed in triple backticks with curly braces specifying the language:</p>
            <code className="block bg-muted p-3 rounded">
              ```{'{r}'}<br />
              # Your R code here<br />
              ```
            </code>
            <h4 className="text-xl font-semibold mt-6 mb-3">Chunk Options</h4>
            <ul className="space-y-2 list-disc list-inside">
              <li><code>echo: true/false</code> - Show or hide code</li>
              <li><code>eval: true/false</code> - Execute code or not</li>
              <li><code>warning: false</code> - Suppress warnings</li>
              <li><code>message: false</code> - Suppress messages</li>
              <li><code>fig-cap</code> - Figure caption</li>
              <li><code>label</code> - Chunk label for cross-referencing</li>
            </ul>
          </div>
        }
        codeExample={{
          code: `\`\`\`{r}
#| label: fig-scatter
#| fig-cap: "Relationship between speed and distance"
#| echo: false
#| warning: false

library(ggplot2)

ggplot(cars, aes(x = speed, y = dist)) +
  geom_point(color = "steelblue", size = 3) +
  geom_smooth(method = "lm", se = FALSE, color = "red") +
  labs(title = "Cars Dataset Analysis",
       x = "Speed (mph)",
       y = "Stopping Distance (ft)") +
  theme_minimal()
\`\`\``,
          title: "R Code Chunk with Options",
          description: "Creating a plot with chunk options to control output"
        }}
      />

      <div className="mt-8">
        <Card className="p-6 bg-accent/5 border-accent/20">
          <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Inline Code
          </h4>
          <p className="mb-3">
            You can also include code inline with your text using single backticks:
          </p>
          <code className="block bg-muted p-3 rounded">
            The mean speed is `r mean(cars$speed)` mph.
          </code>
          <p className="mt-3 text-sm text-muted-foreground">
            This will execute the code and insert the result directly into your sentence!
          </p>
        </Card>
      </div>

      <InteractiveExercise
        title="Create Your First Code Chunk"
        description="Practice creating an R code chunk that generates a simple plot. Try running it to see the output."
        initialCode={`---
title: "My First Code Chunk"
author: "Your Name"
format: html
---

# R Code Chunk Exercise

<!-- Create an R code chunk below that creates a simple plot -->

`}
        language="markdown"
        hints={[
          "Start with triple backticks followed by {r}",
          "Try using a simple plot function like plot(cars)",
          "Add some chunk options like fig-cap to give your plot a caption"
        ]}
        solution={`---
title: "My First Code Chunk"
author: "Your Name"
format: html
---

# R Code Chunk Exercise

\`\`\`{r}
#| fig-cap: "Scatter plot of speed vs. distance"
#| echo: true

# Load the cars dataset (built into R)
data(cars)

# Create a simple scatter plot
plot(cars, 
     main = "Stopping Distance vs Speed",
     xlab = "Speed (mph)", 
     ylab = "Stopping Distance (ft)",
     col = "blue", 
     pch = 16)

# Add a regression line
abline(lm(dist ~ speed, data = cars), col = "red")
\`\`\`
`}
        onRun={async (code) => {
          try {
            const result = await renderQuartoDocument(code);
            return { output: result.success ? "Document rendered successfully" : result.error || "Failed to render document", success: result.success };
          } catch (error) {
            return { output: error instanceof Error ? error.message : "An unknown error occurred", success: false };
          }
        }}
      />

      <Button 
        onClick={() => {
          setCompletedLessons(prev => new Set(prev).add("code-chunks"));
          setSelectedLesson("figures");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="w-full mt-8"
        size="lg"
      >
        Next: Figures & Images <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );

  const renderFiguresLesson = () => (
    <FiguresLesson
      onComplete={() => {
        setCompletedLessons(prev => new Set(prev).add("figures"));
        setSelectedLesson("tables");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onBack={() => setSelectedLesson(null)}
    />
  );

  const renderTablesLesson = () => (
    <TablesLesson
      onComplete={() => {
        setCompletedLessons(prev => new Set(prev).add("tables"));
        setSelectedLesson("output-formats");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onBack={() => setSelectedLesson(null)}
    />
  );

  const renderOutputFormatsLesson = () => (
    <OutputFormatsLesson
      onComplete={() => {
        setCompletedLessons(prev => new Set(prev).add("output-formats"));
        setSelectedLesson("websites");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onBack={() => setSelectedLesson(null)}
    />
  );

  const renderWebsitesLesson = () => (
    <WebsitesLesson
      onComplete={() => {
        setCompletedLessons(prev => new Set(prev).add("websites"));
        setSelectedLesson(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onBack={() => setSelectedLesson(null)}
    />
  );

  const renderLesson = () => {
    switch (selectedLesson) {
      case "intro":
        return renderIntroLesson();
      case "qmd-structure":
        return renderQmdStructureLesson();
      case "yaml-header":
        return renderYamlLesson();
      case "markdown":
        return renderMarkdownLesson();
      case "code-chunks":
        return renderCodeChunksLesson();
      case "figures":
        return renderFiguresLesson();
      case "tables":
        return renderTablesLesson();
      case "output-formats":
        return renderOutputFormatsLesson();
      case "websites":
        return renderWebsitesLesson();
      default:
        return null;
    }
  };

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        {renderLesson()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Interactive Lessons</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any lesson below to start learning. Complete them in order for the best experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              {...lesson}
              completed={completedLessons.has(lesson.id)}
              onClick={() => {
                setSelectedLesson(lesson.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Progress Dashboard</h2>
          <div className="mb-12">
            <Card className="p-6 border-2">
              <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
              <div className="w-full bg-muted rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
                  style={{ width: `${(completedLessons.size / lessons.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{completedLessons.size} of {lessons.length} lessons completed</span>
                <span>{Math.round((completedLessons.size / lessons.length) * 100)}% complete</span>
              </div>
            </Card>
          </div>
          
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Reference</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Getting Started in RStudio
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-sm">
                <li>Open RStudio</li>
                <li>File → New File → Quarto Document</li>
                <li>Choose your settings and click Create</li>
                <li>Save the file with a .qmd extension</li>
                <li>Click "Render" to see your output</li>
              </ol>
            </Card>

            <Card className="p-6 border-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-secondary" />
                Rendering Your Document
              </h3>
              <ul className="space-y-2 list-disc list-inside text-sm">
                <li><strong>Render button:</strong> Click in RStudio toolbar</li>
                <li><strong>Keyboard:</strong> Cmd/Ctrl + Shift + K</li>
                <li><strong>Command:</strong> quarto render document.qmd</li>
                <li><strong>Preview:</strong> quarto preview document.qmd</li>
              </ul>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-2">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-bold mb-3">Ready to Create?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Now that you've learned the basics, open RStudio and start creating your first Quarto document. 
              Remember, practice makes perfect!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://quarto.org/docs/guide/" target="_blank" rel="noopener noreferrer">
                  Official Quarto Docs
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://quarto.org/docs/gallery/" target="_blank" rel="noopener noreferrer">
                  Example Gallery
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Try It Yourself</h2>
          <Card className="p-8 border-2">
            <h3 className="text-2xl font-bold mb-6">Interactive Quarto Editor</h3>
            <p className="mb-6">
              Write your own Quarto document below and see it rendered in real-time. This is a great way to practice what you've learned!
            </p>
            
            <InteractiveExercise
              title="Create Your Own Quarto Document"
              description="Write a complete Quarto document with YAML header, markdown content, and code chunks. Click 'Run Code' to see it rendered."
              initialCode={`---
title: "My Quarto Document"
author: "Your Name"
format: html
---

# Introduction

Write your introduction here.

## Data Analysis

\`\`\`{r}
# Your R code here
\`\`\`

## Conclusion

Write your conclusion here.
`}
              language="markdown"
              onRun={async (code) => {
                try {
                  const result = await renderQuartoDocument(code);
                  return { output: result.success ? "Document rendered successfully" : result.error || "Failed to render document", success: result.success };
                } catch (error) {
                  return { output: error instanceof Error ? error.message : "An unknown error occurred", success: false };
                }
              }}
            />
          </Card>
        </div>

        <footer className="mt-20 py-8 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Quarto Quest - An interactive tutorial for learning Quarto
              </p>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  Developed with the help of
                </p>
                <a 
                  href="https://lovable.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold">Lovable AI</span>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;