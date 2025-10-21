// This is a mock service that simulates Quarto rendering
// In a real application, this would call a backend API that runs Quarto

/**
 * Simulates rendering a Quarto document to HTML
 * @param code The Quarto document content
 * @returns A promise that resolves to the rendered HTML
 */
export async function renderQuartoDocument(code: string): Promise<{ html: string; success: boolean; error?: string }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Check if the code has valid YAML front matter
    if (!code.trim().startsWith('---')) {
      return {
        html: '',
        success: false,
        error: 'Invalid Quarto document: Missing YAML front matter. Document should start with ---'
      };
    }
    
    // Very basic parsing of the Quarto document
    const parts = code.split('---');
    if (parts.length < 3) {
      return {
        html: '',
        success: false,
        error: 'Invalid YAML front matter. Make sure it starts and ends with ---'
      };
    }
    
    // Extract YAML front matter
    const yaml = parts[1].trim();
    
    // Extract the content (everything after the second ---)
    const content = parts.slice(2).join('---').trim();
    
    // Parse YAML to get title, author, etc.
    const yamlLines = yaml.split('\n');
    const metadata: Record<string, string> = {};
    
    yamlLines.forEach(line => {
      const [key, value] = line.split(':').map(part => part.trim());
      if (key && value) {
        metadata[key] = value.replace(/^"(.*)"$/, '$1'); // Remove quotes if present
      }
    });
    
    // Generate mock HTML output
    const title = metadata.title || 'Untitled Document';
    const author = metadata.author || '';
    const date = metadata.date || new Date().toISOString().split('T')[0];
    
    // Convert markdown to HTML (very basic)
    let htmlContent = content
      // Headers
      .replace(/^# (.*)$/gm, '<h1>$1</h1>')
      .replace(/^## (.*)$/gm, '<h2>$1</h2>')
      .replace(/^### (.*)$/gm, '<h3>$1</h3>')
      // Bold and italic
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      // Lists
      .replace(/^- (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n)+/g, '<ul>$&</ul>')
      .replace(/^\d+\. (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n)+/g, '<ol>$&</ol>')
      // Links
      .replace(/\[(.*)\]\((.*)\)/g, '<a href="$2">$1</a>')
      // Paragraphs
      .replace(/^([^<\n].*)$/gm, '<p>$1</p>')
      // Code blocks
      .replace(/```\{(.*)\}([\s\S]*?)```/g, (match, lang, code) => {
        return `<div class="code-block"><div class="code-header">${lang}</div><pre><code>${code.trim()}</code></pre></div>`;
      })
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
    
    // Handle R code chunks - simulate execution
    htmlContent = htmlContent.replace(/<div class="code-block"><div class="code-header">\{r\}([\s\S]*?)<\/pre><\/div>/g, 
      (match, code) => {
        // Very basic R code simulation
        let output = '';
        
        if (code.includes('summary(') || code.includes('str(')) {
          output = 'Data Summary:\n   Min. 1st Qu.  Median    Mean 3rd Qu.    Max. \n  1.00    8.00   15.00   15.49   23.00   30.00';
        } else if (code.includes('plot(')) {
          output = '[Plot output would appear here]';
        } else if (code.includes('ggplot(')) {
          output = '[ggplot visualization would appear here]';
        } else if (code.includes('library(')) {
          output = 'Library loaded successfully';
        } else {
          output = 'R code executed successfully';
        }
        
        return `<div class="code-block">
          <div class="code-header">{r}</div>
          <pre><code>${code.trim()}</code></pre>
          <div class="code-output">${output}</div>
        </div>`;
      }
    );
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            color: #333;
          }
          h1, h2, h3 { margin-top: 1.5em; margin-bottom: 0.5em; }
          h1 { font-size: 2.2em; }
          h2 { font-size: 1.8em; }
          h3 { font-size: 1.5em; }
          pre { background: #f5f5f5; padding: 1em; overflow-x: auto; border-radius: 4px; }
          code { font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; }
          .title { font-size: 2.5em; margin-bottom: 0.2em; }
          .author, .date { color: #666; margin-top: 0; }
          .code-block { border: 1px solid #ddd; border-radius: 4px; margin: 1em 0; overflow: hidden; }
          .code-header { background: #eee; padding: 0.5em 1em; font-family: monospace; border-bottom: 1px solid #ddd; }
          .code-output { background: #f9f9f9; padding: 1em; border-top: 1px solid #ddd; white-space: pre-wrap; }
          img { max-width: 100%; height: auto; }
          table { border-collapse: collapse; width: 100%; margin: 1em 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <header>
          <h1 class="title">${title}</h1>
          ${author ? `<p class="author">${author}</p>` : ''}
          ${date ? `<p class="date">${date}</p>` : ''}
        </header>
        <main>
          ${htmlContent}
        </main>
      </body>
      </html>
    `;
    
    return {
      html,
      success: true
    };
  } catch (error) {
    return {
      html: '',
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

/**
 * Simulates executing a code chunk and returning the result
 * @param code The code to execute
 * @param language The language of the code (r, python, etc.)
 * @returns A promise that resolves to the execution result
 */
export async function executeCodeChunk(code: string, language = 'r'): Promise<{ output: string; success: boolean }> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    if (language === 'r') {
      // Simulate R code execution
      if (code.includes('summary(') || code.includes('str(')) {
        return {
          output: 'Data Summary:\n   Min. 1st Qu.  Median    Mean 3rd Qu.    Max. \n  1.00    8.00   15.00   15.49   23.00   30.00',
          success: true
        };
      } else if (code.includes('plot(')) {
        return {
          output: '[Plot output would appear here]',
          success: true
        };
      } else if (code.includes('ggplot(')) {
        return {
          output: '[ggplot visualization would appear here]',
          success: true
        };
      } else if (code.includes('library(')) {
        const libMatch = code.match(/library\(([^)]+)\)/);
        const libName = libMatch ? libMatch[1] : 'package';
        return {
          output: `Loading required package: ${libName}\nPackage '${libName}' loaded successfully`,
          success: true
        };
      } else if (code.includes('error') || code.includes('stop(')) {
        throw new Error('R error: execution halted');
      } else {
        return {
          output: 'R code executed successfully',
          success: true
        };
      }
    } else if (language === 'python') {
      // Simulate Python code execution
      if (code.includes('print(')) {
        const printMatch = code.match(/print\(([^)]+)\)/);
        const printContent = printMatch ? printMatch[1] : 'Hello, world!';
        return {
          output: printContent.replace(/['"`]/g, ''),
          success: true
        };
      } else if (code.includes('import')) {
        return {
          output: 'Module imported successfully',
          success: true
        };
      } else if (code.includes('error') || code.includes('raise ')) {
        throw new Error('Python error: execution halted');
      } else {
        return {
          output: 'Python code executed successfully',
          success: true
        };
      }
    } else {
      // For other languages, just return a generic success message
      return {
        output: `${language} code executed successfully`,
        success: true
      };
    }
  } catch (error) {
    return {
      output: error instanceof Error ? error.message : 'An unknown error occurred',
      success: false
    };
  }
}
