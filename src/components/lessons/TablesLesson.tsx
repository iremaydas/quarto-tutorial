import { Button } from "@/components/ui/button";
import LessonSection from "@/components/LessonSection";
import InteractiveExercise from "@/components/InteractiveExercise";
import { ChevronRight } from "lucide-react";

interface TablesLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

const TablesLesson = ({ onComplete, onBack }: TablesLessonProps) => {
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
        title="Tables"
        content={
          <div className="space-y-4">
            <p className="text-lg">
              Tables are essential for presenting structured data in your documents. Quarto provides multiple ways to create and customize tables.
            </p>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Markdown Tables</h4>
            <p>
              The simplest way to create a table is using markdown syntax:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              | Name  | Age | Occupation |<br />
              |-------|-----|------------|<br />
              | Alice | 28  | Engineer   |<br />
              | Bob   | 35  | Designer   |<br />
              | Carol | 42  | Manager    |
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Tables from Code</h4>
            <p>
              You can generate tables from data in code chunks. In R, packages like <code>knitr</code>, <code>gt</code>, and <code>DT</code> provide powerful table formatting options:
            </p>
            <code className="block bg-muted p-2 rounded mt-1 mb-4">
              ```&#123;r&#125;<br />
              #| tbl-cap: "Summary of mtcars dataset"<br />
              #| tbl-colwidths: [20, 40, 40]<br />
              <br />
              library(knitr)<br />
              kable(head(mtcars[, 1:5]))<br />
              ```
            </code>
            
            <h4 className="text-xl font-semibold mt-6 mb-3">Table Options</h4>
            <p>
              Quarto provides several options to customize tables:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li><code>tbl-cap</code>: Table caption</li>
              <li><code>tbl-colwidths</code>: Column widths</li>
              <li><code>tbl-width</code>: Overall table width</li>
              <li><code>tbl-subcap</code>: Sub-captions for panel tables</li>
              <li><code>tbl-align</code>: Table alignment</li>
            </ul>
          </div>
        }
        codeExample={{
          code: `---
title: "Table Examples"
author: "Your Name"
format: html
---

## Markdown Table

| Species     | Sepal.Length | Sepal.Width | Petal.Length | Petal.Width |
|-------------|--------------|-------------|--------------|-------------|
| setosa      | 5.1          | 3.5         | 1.4          | 0.2         |
| versicolor  | 7.0          | 3.2         | 4.7          | 1.4         |
| virginica   | 6.3          | 3.3         | 6.0          | 2.5         |

## R Generated Table

\`\`\`{r}
#| tbl-cap: "Summary statistics for the iris dataset"

library(knitr)

# Create a summary table
iris_summary <- aggregate(. ~ Species, data = iris, FUN = mean)

# Display the table with kable
kable(iris_summary, digits = 2)
\`\`\``,
          title: "Complete Table Example",
          description: "A Quarto document with both markdown and generated tables"
        }}
      />

      <InteractiveExercise
        title="Create Custom Tables"
        description="Create a Quarto document that includes both a markdown table and a table generated from R code. Use table attributes to customize the appearance."
        initialCode={`---
title: "My Table Exercise"
author: "Your Name"
format: html
---

## Markdown Table

<!-- Create a markdown table with at least 3 columns and 3 rows -->


## Generated Table

<!-- Create an R code chunk that generates a table from data -->

`}
        language="markdown"
        hints={[
          "For the markdown table, use the pipe syntax: | Column1 | Column2 | followed by a separator row",
          "For the generated table, use knitr::kable() or another table package",
          "Add chunk options like tbl-cap to provide a caption for your table"
        ]}
        solution={`---
title: "My Table Exercise"
author: "Your Name"
format: html
---

## Markdown Table

| Country | Capital | Population (M) | Continent |
|---------|---------|----------------|------------|
| USA     | Washington DC | 329.5 | North America |
| Japan   | Tokyo   | 125.8 | Asia |
| Germany | Berlin  | 83.2  | Europe |
| Brazil  | Brasília | 212.6 | South America |

## Generated Table

\`\`\`{r}
#| tbl-cap: "Summary of the mtcars dataset by cylinder count"
#| tbl-colwidths: [30, 20, 20, 30]

library(knitr)

# Group data by cylinder
cyl_summary <- aggregate(cbind(mpg, hp, wt) ~ cyl, data = mtcars, FUN = mean)

# Rename columns for clarity
names(cyl_summary) <- c("Cylinders", "Avg MPG", "Avg Horsepower", "Avg Weight")

# Display the table
kable(cyl_summary, digits = 2)
\`\`\`
`}
      />

      <Button 
        onClick={onComplete}
        className="w-full"
        size="lg"
      >
        Next: Output Formats <ChevronRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};

export default TablesLesson;
