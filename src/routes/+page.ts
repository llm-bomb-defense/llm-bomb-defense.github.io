import type { PageLoad } from './$types';
import type { RenderedTable } from '../lib/table';

import { table } from '../lib/table';
export const prerender = true;

export const load: PageLoad = async ({ data }) => {
  const renderedTable: RenderedTable = {};
  for (const modelId in table) {
    renderedTable[modelId] = {};
    for (const attackId in table[modelId]) {
      const cell = table[modelId][attackId];
      renderedTable[modelId][attackId] = {
        explComp: cell.explComp,
        explExtraProps: cell.explExtraProps,
        content: data.renderedTableContent[modelId][attackId]
      };
    }
  }

  return { renderedTable };
};
