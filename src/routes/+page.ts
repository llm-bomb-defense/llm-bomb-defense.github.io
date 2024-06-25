import type { PageLoad } from './$types';
import type { RenderedTable } from '../lib/table';

import { table } from '../lib/table';
export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
  let renderedTable: RenderedTable = {};
  for (const modelId in table) {
    renderedTable[modelId] = {};
    for (const attackId in table[modelId]) {
      const cell = table[modelId][attackId];
      renderedTable[modelId][attackId] = {
        explComp: cell.explComp,
        explExtraProps: cell.explExtraProps,
        content: await cell.getContent(modelId, attackId, fetch)
      };
    }
  }

  return { renderedTable };
};
