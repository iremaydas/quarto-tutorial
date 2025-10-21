import { Button } from "@/components/ui/button";
import LessonSection from "@/components/LessonSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import { ChevronRight } from "lucide-react";

interface OutputFormatsLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

const OutputFormatsLesson = ({ onComplete, onBack }: OutputFormatsLessonProps) => {
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
        title="Output Formats"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              One of Quarto's most powerful features is the ability to generate multiple output formats from the same source document.
              You can create HTML, PDF, Word documents, presentations, and more without changing your content.
            </p>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Specifying Output Formats</h4>
            <p>
              Output formats are specified in the YAML header using the <code>format</code> key:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ---<br />
              title: "My Document"<br />
              format: html<br />
              ---
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Multiple Output Formats</h4>
            <p>
              You can specify multiple output formats for a single document:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ---<br />
              title: "My Document"<br />
              format:<br />
              &nbsp;&nbsp;html: default<br />
              &nbsp;&nbsp;pdf: default<br />
              &nbsp;&nbsp;docx: default<br />
              ---
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Format Options</h4>
            <p>
              Each format can have its own specific options:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ---<br />
              title: "My Document"<br />
              format:<br />
              &nbsp;&nbsp;html:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;toc: true<br />
              &nbsp;&nbsp;&nbsp;&nbsp;theme: cosmo<br />
              &nbsp;&nbsp;&nbsp;&nbsp;code-fold: true<br />
              &nbsp;&nbsp;pdf:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;documentclass: article<br />
              &nbsp;&nbsp;&nbsp;&nbsp;geometry:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- margin=1in<br />
              ---
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Presentations</h4>
            <p>
              Quarto supports various presentation formats including reveal.js (HTML), PowerPoint, and Beamer (PDF):
            </p>
            <code className="block bg-muted p-2 rounded mt-1">
              ---<br />
              title: "My Presentation"<br />
              format: revealjs<br />
              ---<br />
              <br />
              # First Slide<br />
              <br />
              Content for the first slide<br />
              <br />
              ## Sub-slide<br />
              <br />
              More content<br />
              <br />
              # Second Slide<br />
              <br />
              Content for the second slide
            </code>
          </div>
        }
        codeExample={{
          code: `---
title: "Multi-Format Document"
author: "Your Name"
date: "2024-10-21"
format:
  html:
    toc: true
    toc-depth: 3
    code-fold: true
    theme: cosmo
    html-math-method: katex
  pdf:
    toc: true
    number-sections: true
    colorlinks: true
  docx:
    reference-doc: custom-reference.docx
---

# Introduction

This document demonstrates how to create a single source that can be rendered to multiple output formats.

# Code Example

\`\`\`{r}
#| echo: true
#| warning: false

# Load libraries
library(ggplot2)

# Create a simple plot
ggplot(mtcars, aes(x = wt, y = mpg)) +
  geom_point() +
  geom_smooth(method = "lm") +
  labs(title = "Weight vs. MPG",
       x = "Weight (1000 lbs)",
       y = "Miles per Gallon")
\`\`\`

# Equations

Quarto handles math equations beautifully across formats:

$$\frac{d}{dx}\left( \int_{a}^{x} f(u)\,du\right)=f(x)$$

# Conclusion

With Quarto, you can write once and publish in multiple formats!`,
          title: "Multi-Format Document Example",
          description: "A Quarto document configured for HTML, PDF, and Word output"
        }}
      />

      <InteractiveExercise
        title="Create a Multi-Format Document"
        description="Create a Quarto document that's configured for both HTML and PDF output with format-specific options."
        initialCode={`---
title: "My Multi-Format Document"
author: "Your Name"
date: today
# Add format configuration here
---

# Introduction

Write a brief introduction here.

# Main Content

Add some content with at least one code chunk and one equation.

# Conclusion

Summarize your document.
`}
        language="markdown"
        hints={[
          "Configure the format section with both html and pdf options",
          "For HTML, try adding options like toc: true and a theme",
          "For PDF, consider options like number-sections: true",
          "Add a code chunk with R or Python code",
          "Include a math equation using $$ or $ delimiters"
        ]}
        solution={`---
title: "My Multi-Format Document"
author: "Your Name"
date: today
format:
  html:
    toc: true
    theme: flatly
    code-fold: true
  pdf:
    toc: true
    number-sections: true
    geometry:
      - margin=1in
---

# Introduction

This document demonstrates how to create content that can be rendered to multiple output formats using Quarto.

# Main Content

Here's a simple data analysis example:

\`\`\`{r}
#| echo: true

# Generate some random data
set.seed(123)
x <- rnorm(100)
y <- 2*x + rnorm(100)

# Create a simple linear model
model <- lm(y ~ x)

# Display the summary
summary(model)

# Plot the data and model
plot(x, y, main="Linear Regression Example")
abline(model, col="red")
\`\`\`

## Mathematical Formulas

Here's the formula for a normal distribution:

$$f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}$$

Where $\mu$ is the mean and $\sigma$ is the standard deviation.

# Conclusion

Quarto makes it easy to create professional documents in multiple formats from a single source file. This increases productivity and ensures consistency across different publication formats.
`}
      />

      <Button 
        onClick={onComplete}
        className="w-full"
        size="lg"
      >
        Next: Quarto Websites <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default OutputFormatsLesson;
