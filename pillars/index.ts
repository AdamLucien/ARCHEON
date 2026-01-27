import type { ComponentType, SVGProps } from 'react';

type PillarIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const iconModules = import.meta.glob('../brand/pillar_icons/*.svg?react', {
  eager: true
}) as Record<string, { default: PillarIconComponent }>;

const normalizedIcons = Object.fromEntries(
  Object.entries(iconModules).map(([path, module]) => {
    const fileName = path.split('/').pop()?.replace('.svg?react', '') ?? '';
    return [fileName, module.default];
  })
) as Record<string, PillarIconComponent>;

export const PILLAR_ACCENTS = {
  resources: '#C23B3B',
  services: '#C26A2B',
  citizens: '#BDA23B',
  family: '#2E8F52',
  communication: '#2BA8B8',
  investments: '#5B47C7',
  responsibility: '#6A2FA8'
} as const;

type PillarIconKey = keyof typeof PILLAR_ACCENTS;

const iconAliases: Record<PillarIconKey, string[]> = {
  resources: ['resources', '1'],
  services: ['services', '2'],
  citizens: ['citizens', '3'],
  family: ['family', '4'],
  communication: ['communication', '5'],
  investments: ['investments', '6'],
  responsibility: ['responsibility', '7']
};

const fallbackIcon: PillarIconComponent = () => null;

const pillarIconRegistry = {} as Record<PillarIconKey, PillarIconComponent>;

Object.entries(iconAliases).forEach(([key, aliases]) => {
  const found = aliases.map((alias) => normalizedIcons[alias]).find(Boolean);
  if (!found && import.meta.env.DEV) {
    console.warn(`Missing pillar icon for ${key}. Available icons: ${Object.keys(normalizedIcons).join(', ')}`);
  }
  pillarIconRegistry[key as PillarIconKey] = found ?? fallbackIcon;
});

export { pillarIconRegistry };
export type { PillarIconKey, PillarIconComponent };

export const getPillarIcon = (key: PillarIconKey): PillarIconComponent =>
  pillarIconRegistry[key];
