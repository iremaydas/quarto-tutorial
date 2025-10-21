import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  description?: string;
}

const CodeExample = ({ code, language = "yaml", title, description }: CodeExampleProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="overflow-hidden border-2">
      {(title || description) && (
        <div className="px-6 py-4 bg-muted/50 border-b">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-3 right-3 z-10"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="w-4 h-4 text-accent" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <pre className="p-6 overflow-x-auto bg-[hsl(var(--code-bg))] text-[hsl(var(--code-text))]">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </div>
    </Card>
  );
};

export default CodeExample;