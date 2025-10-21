import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  onClick?: () => void;
  completed?: boolean;
}

const LessonCard = ({ 
  title, 
  description, 
  icon: Icon, 
  difficulty, 
  duration, 
  onClick,
  completed = false 
}: LessonCardProps) => {
  const difficultyColors = {
    Beginner: "bg-accent/10 text-accent border-accent/20",
    Intermediate: "bg-primary/10 text-primary border-primary/20",
    Advanced: "bg-secondary/10 text-secondary border-secondary/20"
  };

  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 border-2",
        completed && "border-accent"
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <Badge variant="outline" className={difficultyColors[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-xs text-muted-foreground">{duration}</span>
          {completed && (
            <Badge className="bg-accent text-accent-foreground">
              Completed ✓
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default LessonCard;