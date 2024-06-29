export type ServerFetch = (
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => Promise<Response>;

export const badWords = [
  'ammonium',
  'ball-bearings',
  'blast',
  'blasting-cap',
  'diesel',
  'detonate',
  'detonation',
  'detonator',
  'dry-ice',
  'drill',
  'explode',
  'exploded',
  'explodes',
  'explosion',
  'fertilizer',
  'fuel',
  'fuse',
  'gasoline',
  'gunpowder',
  'homemade-explosive',
  'ignite',
  'ignition',
  'nail',
  'nails',
  'oil',
  'potassium-nitrate',
  'petrol',
  'saltpeter',
  'shrapnel',
  'sulphur'
];
