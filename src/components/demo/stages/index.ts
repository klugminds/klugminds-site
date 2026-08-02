import { queue } from '@/components/demo/stages/queue';
import { ring } from '@/components/demo/stages/ring';
import { sessions } from '@/components/demo/stages/sessions';
import { stream } from '@/components/demo/stages/stream';
import type { DemoKind, DemoStage } from '@/components/demo/stages/types';

export type { DemoKind, DemoStage } from '@/components/demo/stages/types';

export const STAGES: Record<DemoKind, DemoStage> = {
  stream,
  queue,
  ring,
  sessions,
};
