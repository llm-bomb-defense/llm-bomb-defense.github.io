import type { ComponentType } from 'svelte';
import type { ServerFetch } from './utils';
import PolicyStatic, { PolicyStaticNS } from './explanations/PolicyStatic.svelte';
import type { Server } from '@sveltejs/kit';

class Attack {
  id: string;
  displayStr: string;

  constructor(id: string, displayStr?: string) {
    this.id = id;
    this.displayStr = displayStr || id;
  }
}

class Model {
  id: string;
  displayStr: string;

  constructor(id: string, displayStr?: string) {
    this.id = id;
    this.displayStr = displayStr || id;
  }
}

export enum Color {
  Red = 'red',
  Green = 'green',
  White = 'white'
}

export type CellContent = {
  value: string | number;
  color: Color;
};

export type TableCell = {
  explComp: ComponentType;
  explExtraProps?: any;
  getContent: (modelId: string, attackId: string, serverFetch: ServerFetch) => Promise<CellContent>;
};
export type Table = { [model_id: string]: { [attack_id: string]: TableCell } };

export type RenderedTableCell = {
  explComp: ComponentType;
  explExtraProps?: any;
  content: CellContent;
};
export type RenderedTable = { [model_id: string]: { [attack_id: string]: RenderedTableCell } };

export const models = {
  policyOnly: [
    new Model('claude-3-opus-20240229', 'claude-3-opus'),
    new Model('claude-3-sonnet-20240229', 'claude-3-sonnet'),
    new Model('claude-3-haiku-20240307', 'claude-3-haiku'),
    new Model('gpt-4o-2024-05-13'),
    new Model('gpt-4-turbo-2024-04-09', 'gpt-4-turbo'),
    new Model('gpt-3.5-turbo-0125'),
    new Model('gpt-3.5-turbo-1106'),
    new Model('ft:gpt-3.5-turbo-1106:academicsnyuperez::91cDAREP', 'adv-sft-op1'),
    new Model('ft:gpt-3.5-turbo-1106:academicsnyuperez::91Wjz8Kd', 'adv-sft-op2'),
    new Model('ft:gpt-3.5-turbo-1106:academicsnyuperez::91YW891r', 'adv-sft-op3'),
    new Model('r2d2', 'R2D2')
  ],
  baselineClfs: [
    new Model('llama-guard-2-s', 'LlamaGuard-2-s'),
    new Model('llama-guard-2-f', 'LlamaGuard-2-f'),
    new Model('harmbench-4o', 'HarmBench-4o'),
    new Model('harmbench-llama', 'HarmBench-llama'),
    new Model('harmbench-llama', 'Harmbench-mistral')
  ],
  ourClfs: [new Model('cot-eg-4t', 'CoT-eg-4t'), new Model('cot-4o', 'CoT-4o')]
};
export const getModelDisplayName = (modelId: string) => {
  for (const modelGroup of Object.values(models)) {
    for (const model of modelGroup) {
      if (model.id === modelId) {
        return model.displayStr;
      }
    }
  }
  return modelId;
};

export const attacks: Attack[] = [
  new Attack('static', 'Static'),
  new Attack('dry-ice', 'Dry-Ice'),
  new Attack('prompt-inj', 'Prompt Inj.'),
  new Attack('foreign-lang', 'Forgn. Lang.'),
  new Attack('rand-search', 'Rand. Search'),
  new Attack('pair', 'PAIR')
];

export const table: Table = {
  // policy only models
  'claude-3-opus-20240229': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'claude-3-sonnet-20240229': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'claude-3-haiku-20240307': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'gpt-4o-2024-05-13': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'gpt-4-turbo-2024-04-09': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'gpt-3.5-turbo-0125': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'gpt-3.5-turbo-1106': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'ft:gpt-3.5-turbo-1106:academicsnyuperez::91cDAREP': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'ft:gpt-3.5-turbo-1106:academicsnyuperez::91Wjz8Kd': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  'ft:gpt-3.5-turbo-1106:academicsnyuperez::91YW891r': {
    static: { explComp: PolicyStatic, getContent: PolicyStaticNS.getCellContent }
  },
  r2d2: {},
  // baseline classifiers
  'llama-guard-2-s': {},
  'llama-guard-2-f': {},
  'harmbench-4o': {},
  'harmbench-llama': {},
  'harmbench-mistral': {},
  // our classifiers
  'cot-eg-4t': {},
  'cot-4o': {}
};
