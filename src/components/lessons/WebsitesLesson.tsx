import { Button } from "@/components/ui/button";
import LessonSection from "@/components/LessonSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import { ChevronRight } from "lucide-react";

interface WebsitesLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

const WebsitesLesson = ({ onComplete, onBack }: WebsitesLessonProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        ← Back to Lessons
      </Button>

      <LessonSection
        title="Quarto Websites"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Quarto makes it easy to build entire websites and blogs. You can create multi-page sites with navigation, search, and other features.
            </p>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Creating a Website Project</h4>
            <p>
              To create a Quarto website, you need a project configuration file named <code>_quarto.yml</code> in your project directory:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              project:<br />
              &nbsp;&nbsp;type: website<br />
              &nbsp;&nbsp;output-dir: _site<br />
              <br />
              website:<br />
              &nbsp;&nbsp;title: "My Website"<br />
              &nbsp;&nbsp;navbar:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;left:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- href: index.qmd<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text: Home<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- href: about.qmd<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text: About<br />
              <br />
              format:<br />
              &nbsp;&nbsp;html:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;theme: cosmo<br />
              &nbsp;&nbsp;&nbsp;&nbsp;toc: true
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Website Structure</h4>
            <p>
              A basic Quarto website typically includes:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><code>_quarto.yml</code>: Project configuration</li>
              <li><code>index.qmd</code>: Home page</li>
              <li><code>about.qmd</code>: About page</li>
              <li>Additional <code>.qmd</code> files for other pages</li>
              <li><code>styles.css</code>: Custom CSS (optional)</li>
              <li><code>_site/</code>: Generated output (don't edit directly)</li>
            </ul>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Navigation</h4>
            <p>
              The <code>navbar</code> and <code>sidebar</code> sections in <code>_quarto.yml</code> control site navigation:
            </p>
            <code className="block bg-muted p-2 rounded mt-1">
              website:<br />
              &nbsp;&nbsp;sidebar:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;style: "docked"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;search: true<br />
              &nbsp;&nbsp;&nbsp;&nbsp;contents:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- section: "Getting Started"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- index.qmd<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- installation.qmd<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- section: "Basics"<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;contents:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- markdown.qmd<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- code.qmd
            </code>
          </div>
        }
        codeExample={{
          code: `# _quarto.yml
project:
  type: website
  output-dir: _site

website:
  title: "Data Science Portfolio"
  description: "My personal data science projects and tutorials"
  favicon: "images/favicon.png"
  
  navbar:
    background: primary
    search: true
    left:
      - href: index.qmd
        text: Home
      - href: projects.qmd
        text: Projects
      - href: tutorials.qmd
        text: Tutorials
      - href: about.qmd
        text: About
    right:
      - icon: github
        href: https://github.com/username
      - icon: twitter
        href: https://twitter.com/username
  
  sidebar:
    style: "docked"
    contents:
      - section: "Projects"
        contents:
          - projects.qmd
          - projects/project1.qmd
          - projects/project2.qmd
      - section: "Tutorials"
        contents:
          - tutorials.qmd
          - tutorials/r-basics.qmd
          - tutorials/data-viz.qmd

format:
  html:
    theme: [cosmo, custom.scss]
    css: styles.css
    toc: true
    code-copy: true
    code-tools: true
    highlight-style: github

# index.qmd
---
title: "Welcome to My Data Science Portfolio"
---

# Hello!

Welcome to my data science portfolio. Here you'll find my projects, tutorials, and more.

## Featured Projects

:::{.grid}
:::{.g-col-6}
### Project 1
Analysis of customer churn data using machine learning.
[Learn more](projects/project1.qmd)
:::

:::{.g-col-6}
### Project 2
Interactive visualization of climate change data.
[Learn more](projects/project2.qmd)
:::
:::
`,
          title: "Quarto Website Example",
          description: "Configuration and home page for a data science portfolio website"
        }}
      />

      <InteractiveExercise
        title="Design a Quarto Website"
        description="Create a _quarto.yml configuration file for a personal blog website with multiple sections."
        initialCode={`# _quarto.yml
project:
  type: website

# Add website configuration here

# Add format configuration here
`}
        language="yaml"
        hints={[
          "Start by defining the website title and navbar structure",
          "Add a sidebar with sections for different blog categories",
          "Configure the HTML format with a theme and other options",
          "Don't forget to include social media links in the navbar"
        ]}
        solution={`# _quarto.yml
project:
  type: website
  output-dir: _site

website:
  title: "My Personal Blog"
  description: "Thoughts, tutorials, and projects"
  site-url: https://example.com
  repo-url: https://github.com/username/blog
  
  navbar:
    background: primary
    search: true
    left:
      - href: index.qmd
        text: Home
      - href: posts.qmd
        text: All Posts
      - text: Categories
        menu:
          - tech.qmd
          - travel.qmd
          - books.qmd
      - href: about.qmd
        text: About
    right:
      - icon: github
        href: https://github.com/username
      - icon: twitter
        href: https://twitter.com/username
      - icon: rss
        href: index.xml
  
  sidebar:
    style: "floating"
    search: true
    contents:
      - section: "Recent Posts"
        contents:
          - posts.qmd
      - section: "Categories"
        contents:
          - tech.qmd
          - travel.qmd
          - books.qmd
      - section: "About"
        contents:
          - about.qmd
          - contact.qmd

format:
  html:
    theme: [cosmo, custom.scss]
    css: styles.css
    toc: true
    code-copy: true
    code-tools: true
    highlight-style: github
    include-in-header: meta.html
    
feed:
  categories: [tech, travel, books]
`}
      />

      <Button 
        onClick={onComplete}
        className="w-full"
        size="lg"
      >
        Complete Course <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default WebsitesLesson;
