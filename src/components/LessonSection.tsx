import { Card } from "@/components/ui/card";
import CodeExample from "./CodeExample";

interface LessonSectionProps {
  title: string;
  content: React.ReactNode;
  codeExample?: {
    code: string;
    language?: string;
    title?: string;
    description?: string;
  };
}

const LessonSection = ({ title, content, codeExample }: LessonSectionProps) => {
  return (
    <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {title}
      </h2>
      
      <Card className="p-6 mb-6 border-2">
        <div className="prose prose-lg max-w-none">
          {content}
        </div>
      </Card>
      
      {codeExample && (
        <CodeExample {...codeExample} />
      )}
    </div>
  );
};

export default LessonSection;