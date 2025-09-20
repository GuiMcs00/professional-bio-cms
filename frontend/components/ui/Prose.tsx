import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProseProps {
  children: ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div 
      className={cn(
        'prose prose-neutral dark:prose-invert max-w-none',
        'prose-headings:text-foreground prose-p:text-muted-foreground',
        'prose-a:text-primary hover:prose-a:text-primary/80',
        'prose-strong:text-foreground prose-code:text-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}