import { createElement, type ComponentType } from 'react';

import { AgentsPanel } from '@/components/viz/panels/AgentsPanel';
import { AutonomyPanel } from '@/components/viz/panels/AutonomyPanel';
import { CataloguePanel } from '@/components/viz/panels/CataloguePanel';
import { CollusionPanel } from '@/components/viz/panels/CollusionPanel';
import { ContractPanel } from '@/components/viz/panels/ContractPanel';
import { DocintelPanel } from '@/components/viz/panels/DocintelPanel';
import { DriftPanel } from '@/components/viz/panels/DriftPanel';
import { EtaPanel } from '@/components/viz/panels/EtaPanel';
import { FunnelPanel } from '@/components/viz/panels/FunnelPanel';
import { GatesPanel } from '@/components/viz/panels/GatesPanel';
import { GovernanceTrailPanel } from '@/components/viz/panels/GovernanceTrailPanel';
import { HarmPanel } from '@/components/viz/panels/HarmPanel';
import { LandingPanel } from '@/components/viz/panels/LandingPanel';
import { LifecyclePanel } from '@/components/viz/panels/LifecyclePanel';
import { LineagePanel } from '@/components/viz/panels/LineagePanel';
import { MapPanel } from '@/components/viz/panels/MapPanel';
import { MulticloudPanel } from '@/components/viz/panels/MulticloudPanel';
import { OrbitPanel } from '@/components/viz/panels/OrbitPanel';
import { OutcomesPanel } from '@/components/viz/panels/OutcomesPanel';
import { PodPanel } from '@/components/viz/panels/PodPanel';
import { PromptsPanel } from '@/components/viz/panels/PromptsPanel';
import { RankingPanel } from '@/components/viz/panels/RankingPanel';
import { RightsizePanel } from '@/components/viz/panels/RightsizePanel';
import { RiskGraphPanel } from '@/components/viz/panels/RiskGraphPanel';
import { SignalsPanel } from '@/components/viz/panels/SignalsPanel';
import { StackPanel } from '@/components/viz/panels/StackPanel';
import { StepperPanel } from '@/components/viz/panels/StepperPanel';
import { ThresholdPanel } from '@/components/viz/panels/ThresholdPanel';
import { TiersPanel } from '@/components/viz/panels/TiersPanel';
import { TypologiesPanel } from '@/components/viz/panels/TypologiesPanel';
import { UnderwritingPanel } from '@/components/viz/panels/UnderwritingPanel';

/** All registered viz panel kinds (`data-viz` values). */
export type VizKind =
  | 'graph'
  | 'stack'
  | 'orbit'
  | 'catalogue'
  | 'governance'
  | 'threshold'
  | 'funnel'
  | 'collusion'
  | 'harm'
  | 'signals'
  | 'typologies'
  | 'lifecycle'
  | 'gates'
  | 'contract'
  | 'lineage'
  | 'map'
  | 'prompts'
  | 'agents'
  | 'autonomy'
  | 'landing'
  | 'multicloud'
  | 'rightsize'
  | 'stepper'
  | 'drift'
  | 'outcomes'
  | 'pod'
  | 'underwriting'
  | 'tiers'
  | 'ranking'
  | 'eta'
  | 'docintel';

export const VIZ_PANELS: Record<VizKind, ComponentType> = {
  graph: RiskGraphPanel,
  stack: StackPanel,
  orbit: OrbitPanel,
  catalogue: CataloguePanel,
  governance: GovernanceTrailPanel,
  threshold: ThresholdPanel,
  funnel: FunnelPanel,
  collusion: CollusionPanel,
  harm: HarmPanel,
  signals: SignalsPanel,
  typologies: TypologiesPanel,
  lifecycle: LifecyclePanel,
  gates: GatesPanel,
  contract: ContractPanel,
  lineage: LineagePanel,
  map: MapPanel,
  prompts: PromptsPanel,
  agents: AgentsPanel,
  autonomy: AutonomyPanel,
  landing: LandingPanel,
  multicloud: MulticloudPanel,
  rightsize: RightsizePanel,
  stepper: StepperPanel,
  drift: DriftPanel,
  outcomes: OutcomesPanel,
  pod: PodPanel,
  underwriting: UnderwritingPanel,
  tiers: TiersPanel,
  ranking: RankingPanel,
  eta: EtaPanel,
  docintel: DocintelPanel,
};

type VizPanelProps = {
  kind: VizKind;
};

/** Render a viz panel by its `data-viz` kind. */
export function VizPanel({ kind }: VizPanelProps) {
  const Panel = VIZ_PANELS[kind];
  return createElement(Panel);
}
