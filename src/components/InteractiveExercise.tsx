import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, HelpCircle } from 'lucide-react';
import CodeEditor from './CodeEditor';
import QuartoPreview from './QuartoPreview';
import { renderQuartoDocument, executeCodeChunk } from '@/lib/quartoService';

interface InteractiveExerciseProps {
  title: string;
  description: string;
  initialCode: string;
  language?: string;
  expectedOutput?: string;
  solution?: string;
  hints?: string[];
  onComplete?: () => void;
  onRun?: (code: string) => Promise<{ output: string; success: boolean }>;
}

const InteractiveExercise = ({
  title,
  description,
  initialCode,
  language = 'markdown',
  expectedOutput,
  solution,
  hints = [],
  onComplete
}: InteractiveExerciseProps) => {
  const [showSolution, setShowSolution] = useState(false);
  const [currentHint, setCurrentHint] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [htmlOutput, setHtmlOutput] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleRunCode = async (code: string) => {
    setIsLoading(true);
    setError(undefined);
    
    try {
      if (language === 'markdown' || language === 'yaml') {
        // For Quarto documents (markdown with YAML front matter)
        const result = await renderQuartoDocument(code);
        
        if (result.success) {
          setHtmlOutput(result.html);
          return { output: 'Document rendered successfully', success: true };
        } else {
          setError(result.error);
          return { output: result.error || 'Failed to render document', success: false };
        }
      } else {
        // For code chunks (R, Python, etc.)
        const result = await executeCodeChunk(code, language);
        return result;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      return { output: errorMessage, success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete();
    }
  };

  const showNextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  return (
    <Card className="border-2 p-6 mb-8">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          {isCompleted && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Completed
            </Badge>
          )}
        </div>
        
        <p className="text-muted-foreground mb-4">{description}</p>
        
        {currentHint >= 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-amber-800 mb-1 flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Hint {currentHint + 1}:
            </h4>
            <p className="text-amber-700">{hints[currentHint]}</p>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Your Code:</h4>
          <CodeEditor
            defaultValue={initialCode}
            language={language}
            onRun={handleRunCode}
            expectedOutput={expectedOutput}
            title="Exercise"
            description={`Write your ${language === 'markdown' ? 'Quarto document' : language} code here`}
          />
          
          <div className="flex flex-wrap gap-2 mt-4">
            {hints.length > 0 && currentHint < hints.length - 1 && (
              <Button variant="outline" onClick={showNextHint}>
                <HelpCircle className="w-4 h-4 mr-1" />
                {currentHint === -1 ? 'Show Hint' : 'Next Hint'}
              </Button>
            )}
            
            {solution && (
              <Button
                variant="outline"
                onClick={() => setShowSolution(!showSolution)}
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
            )}
            
            <Button 
              variant="default" 
              className="ml-auto" 
              onClick={handleComplete}
              disabled={isCompleted}
            >
              Mark as Completed
            </Button>
          </div>
        </div>
        
        <div>
          {language === 'markdown' || language === 'yaml' ? (
            <>
              <h4 className="font-semibold mb-3">Preview:</h4>
              <QuartoPreview 
                htmlContent={htmlOutput}
                isLoading={isLoading}
                error={error}
                sourceCode={initialCode}
              />
            </>
          ) : null}
          
          {showSolution && solution && (
            <>
              <h4 className="font-semibold mb-3 mt-6">Solution:</h4>
              <CodeEditor
                defaultValue={solution}
                language={language}
                readOnly={true}
                title="Solution Code"
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default InteractiveExercise;
