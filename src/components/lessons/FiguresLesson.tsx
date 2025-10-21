import { Button } from "@/components/ui/button";
import LessonSection from "@/components/LessonSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import { ChevronRight } from "lucide-react";

interface FiguresLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

const FiguresLesson = ({ onComplete, onBack }: FiguresLessonProps) => {
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
        title="Figures & Images"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Quarto provides powerful tools for including and customizing figures and images in your documents.
              You can include static images or generate plots from code.
            </p>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Static Images</h4>
            <p>
              To include a static image, you can use standard markdown syntax:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ![Caption for the image](path/to/image.png)
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Image Attributes</h4>
            <p>
              You can control the size, alignment, and other attributes of images using attributes syntax:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ![](image.png)&#123;width=50% fig-align="center"&#125;
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Figures from Code</h4>
            <p>
              When you generate plots from code chunks, you can control their appearance with chunk options:
            </p>
            <code className="block bg-muted p-2 rounded mt-1">
              ```&#123;r&#125;<br />
              #| fig-width: 8<br />
              #| fig-height: 4<br />
              #| fig-cap: "My amazing plot"<br />
              #| fig-align: "center"<br />
              <br />
              library(ggplot2)<br />
              ggplot(mtcars, aes(x = wt, y = mpg)) +<br />
                geom_point() +<br />
                geom_smooth(method = "lm") +<br />
                labs(title = "Car Weight vs. Fuel Efficiency")<br />
              ```
            </code>
          </div>
        }
        codeExample={{
          code: `---
title: "Figure Examples"
author: "Your Name"
format: html
---

## Static Images

![This is a sample image](https://quarto.org/quarto.png){width=50%}

## Generated Plots

\`\`\`{r}
#| fig-width: 7
#| fig-height: 5
#| fig-cap: "Relationship between car weight and MPG"
#| fig-align: "center"

library(ggplot2)

ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3) +
  geom_smooth(method = "lm", se = FALSE) +
  labs(title = "Car Weight vs. Fuel Efficiency",
       x = "Weight (1000 lbs)",
       y = "Miles Per Gallon",
       color = "Cylinders") +
  theme_minimal()
\`\`\``,
          title: "Complete Figure Example",
          description: "A Quarto document with both static and generated figures"
        }}
      />

      <InteractiveExercise
        title="Create a Visualization"
        description="Create a Quarto document that includes both a static image and a generated plot. Use figure attributes to control the appearance."
        initialCode={`---
title: "My Figure Exercise"
author: "Your Name"
format: html
---

## Static Image

<!-- Add a static image with a caption and set its width to 60% -->


## Generated Plot

<!-- Create an R code chunk that generates a scatter plot -->

`}
        language="markdown"
        hints={[
          "For the static image, use ![caption](URL){width=60%}",
          "For the generated plot, create an R code chunk with ggplot or base R plot functions",
          "Don't forget to add chunk options like fig-cap and fig-align"
        ]}
        solution={`---
title: "My Figure Exercise"
author: "Your Name"
format: html
---

## Static Image

![A beautiful landscape](https://images.unsplash.com/photo-1506744038136-46273834b3fb){width=60% fig-align="center"}

## Generated Plot

\`\`\`{r}
#| fig-cap: "Scatter plot of mtcars dataset"
#| fig-width: 8
#| fig-height: 5
#| fig-align: "center"

# Load ggplot2 if needed
library(ggplot2)

# Create a scatter plot
ggplot(mtcars, aes(x = wt, y = mpg, color = factor(cyl))) +
  geom_point(size = 3) +
  labs(title = "Car Weight vs. Miles Per Gallon",
       x = "Weight (1000 lbs)",
       y = "MPG",
       color = "Cylinders") +
  theme_minimal()
\`\`\`
`}
      />

      <Button 
        onClick={onComplete}
        className="w-full"
        size="lg"
      >
        Next: Tables <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default FiguresLesson;
