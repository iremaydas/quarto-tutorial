import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, RefreshCw, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CodeEditorProps {
  defaultValue: string;
  language?: string;
  height?: string;
  title?: string;
  description?: string;
  expectedOutput?: string;
  onRun?: (code: string) => Promise<{ output: string; success: boolean }>;
  readOnly?: boolean;
}

const CodeEditor = ({
  defaultValue,
  language = 'markdown',
  height = '300px',
  title,
  description,
  expectedOutput,
  onRun,
  readOnly = false
}: CodeEditorProps) => {
  const [code, setCode] = useState<string>(defaultValue);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setCode(defaultValue);
  }, [defaultValue]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleRun = async () => {
    if (!onRun) return;
    
    setIsRunning(true);
    setOutput('');
    setIsSuccess(null);
    setIsCorrect(null);
    
    try {
      const result = await onRun(code);
      setOutput(result.output);
      setIsSuccess(result.success);
      
      if (expectedOutput && result.success) {
        // Simple string comparison for now, could be enhanced with more sophisticated checks
        setIsCorrect(result.output.trim() === expectedOutput.trim());
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : 'An error occurred');
      setIsSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(defaultValue);
    setOutput('');
    setIsSuccess(null);
    setIsCorrect(null);
  };

  return (
    <Card className="overflow-hidden border-2 mb-6">
      {(title || description) && (
        <div className="px-6 py-4 bg-muted/50 border-b">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <div className="p-1 bg-[hsl(var(--code-bg))]">
        <Editor
          height={height}
          language={language}
          value={code}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            readOnly: readOnly,
            wordWrap: 'on',
          }}
          theme="vs-dark"
        />
      </div>
      
      {onRun && (
        <div className="p-4 border-t flex gap-2 justify-between items-center bg-muted/30">
          <div className="space-x-2">
            <Button 
              onClick={handleRun} 
              disabled={isRunning}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Run Code
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleReset}
              disabled={isRunning}
            >
              Reset
            </Button>
          </div>
          
          {isCorrect !== null && (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> Correct!
                </span>
              ) : (
                <span className="text-sm text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" /> Try again
                </span>
              )}
            </div>
          )}
        </div>
      )}
      
      {output && (
        <div className="p-4 border-t">
          <h5 className="font-medium mb-2">Output:</h5>
          <Alert variant={isSuccess ? "default" : "destructive"}>
            <AlertTitle>{isSuccess ? "Success" : "Error"}</AlertTitle>
            <AlertDescription className="whitespace-pre-wrap font-mono text-sm">
              {output}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
};

export default CodeEditor;
