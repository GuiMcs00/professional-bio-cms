import { ReactNode, createElement } from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

const levelClasses = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  2: 'text-3xl md:text-4xl lg:text-5xl font-bold',
  3: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
  4: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  5: 'text-lg md:text-xl lg:text-2xl font-medium',
  6: 'text-base md:text-lg lg:text-xl font-medium',
};

export function Heading({ children, level, className }: HeadingProps) {
  return createElement(
    `h${level}`,
    { className: cn(levelClasses[level], className) },
    children
  );
}