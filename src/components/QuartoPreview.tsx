import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

interface QuartoPreviewProps {
  htmlContent?: string;
  isLoading?: boolean;
  error?: string;
  sourceCode?: string;
}

const QuartoPreview = ({
  htmlContent,
  isLoading = false,
  error,
  sourceCode
}: QuartoPreviewProps) => {
  const [iframeHeight, setIframeHeight] = useState('500px');
  
  // Create a blob URL for the HTML content
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  
  useEffect(() => {
    if (htmlContent) {
      // Create a blob with the HTML content
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      
      // Clean up the blob URL when the component unmounts or when htmlContent changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [htmlContent]);

  return (
    <Card className="overflow-hidden border-2 mb-6">
      <Tabs defaultValue="preview">
        <div className="px-4 py-2 bg-muted/50 border-b">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            {sourceCode && <TabsTrigger value="source">Source</TabsTrigger>}
          </TabsList>
        </div>
        
        <TabsContent value="preview" className="m-0">
          <div className="relative" style={{ height: iframeHeight }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 font-medium">Rendering Quarto document...</span>
              </div>
            )}
            
            {error && (
              <div className="p-6 text-red-600">
                <h4 className="font-semibold mb-2">Error rendering Quarto document:</h4>
                <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">{error}</pre>
              </div>
            )}
            
            {blobUrl && !isLoading && !error && (
              <iframe
                src={blobUrl}
                className="w-full h-full border-0"
                title="Quarto Preview"
                sandbox="allow-scripts"
                onLoad={() => {
                  // Adjust iframe height based on content if needed
                  // This is a simple approach - might need more sophisticated handling
                  try {
                    const iframe = document.querySelector('iframe');
                    if (iframe && iframe.contentWindow) {
                      const height = iframe.contentWindow.document.body.scrollHeight;
                      setIframeHeight(`${height + 50}px`);
                    }
                  } catch (e) {
                    console.error('Error adjusting iframe height:', e);
                  }
                }}
              />
            )}
            
            {!blobUrl && !isLoading && !error && (
              <div className="p-6 text-muted-foreground">
                <p>No preview available. Run your code to see the output.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        {sourceCode && (
          <TabsContent value="source" className="m-0">
            <pre className="p-6 overflow-auto bg-[hsl(var(--code-bg))] text-[hsl(var(--code-text))] text-sm font-mono">
              {sourceCode}
            </pre>
          </TabsContent>
        )}
      </Tabs>
    </Card>
  );
};

export default QuartoPreview;
