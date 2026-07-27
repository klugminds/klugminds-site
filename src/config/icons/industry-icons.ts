import {
  Dices,
  HeartPulse,
  Landmark,
  ShoppingBag,
  Truck,
  type LucideIcon,
} from 'lucide-react';

const industryIcons: Record<string, LucideIcon> = {
  Fintech: Landmark,
  iGaming: Dices,
  'E-commerce': ShoppingBag,
  Logistics: Truck,
  Healthcare: HeartPulse,
};

export function resolveIndustryIcon(label: string): LucideIcon {
  const exact = industryIcons[label];
  if (exact) {
    return exact;
  }

  const match = Object.entries(industryIcons).find(([key]) => label.includes(key));
  return match?.[1] ?? Landmark;
}
