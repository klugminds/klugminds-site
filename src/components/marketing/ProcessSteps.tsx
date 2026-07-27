import {
  Compass,
  Hammer,
  RefreshCw,
  Rocket,
  Search,
  type LucideIcon,
} from 'lucide-react';

import { cardGlowAt, ContentCard } from '@/components/marketing/ContentCard';
import { cn } from '@/lib/cn';

const stepIcons: LucideIcon[] = [Search, Compass, Hammer, Rocket, RefreshCw];

type ProcessStepsProps = {
  steps: readonly { step: string; title: string; description: string }[];
  className?: string;
};

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol
      className={cn(
        'grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-5',
        steps.length <= 4 && 'xl:grid-cols-4',
        className,
      )}
    >
      {steps.map((item, index) => {
        const StepIcon = stepIcons[index % stepIcons.length] ?? Search;

        return (
          <ContentCard
            key={item.step}
            as="li"
            glow={cardGlowAt(index)}
            icon={StepIcon}
            eyebrow={`Step ${item.step}`}
            title={item.title}
            description={item.description}
            className="h-full"
          />
        );
      })}
    </ol>
  );
}
