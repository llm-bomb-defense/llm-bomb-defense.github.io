import type { PageServerLoad } from './$types';
import type { RenderedTableContent } from '../lib/table';

import { table } from '../lib/table';
export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
  const renderedTableContent: RenderedTableContent = {};
  for (const modelId in table) {
    renderedTableContent[modelId] = {};
    for (const attackId in table[modelId]) {
      const cell = table[modelId][attackId];
      renderedTableContent[modelId][attackId] = await cell.getContent(modelId, attackId, fetch);
    }
  }

  return { renderedTableContent };
};
