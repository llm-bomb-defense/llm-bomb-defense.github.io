import type { ComponentType } from 'svelte';
import PolicyStatic from './explanations/PolicyStatic.svelte';

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

enum Color { Red = "red", Green = "green", White = "white" }
export type AttackStatistic = {
  value: number | string;
  color: Color;
  explanation?: { component: ComponentType, props: any };
}
type ModelStatistics = { [attack_id: string]: AttackStatistic; }
type TableData = { [model_id: string]: ModelStatistics }


const models = {
  policyOnly: [
    new Model("claude-3-opus"),
    new Model("claude-3-sonnet"),
    new Model("claude-3-haiku"),
    new Model("claude-4o-2024-05-13"),
    new Model("gpt-4-turbo"),
    new Model("gpt-3.5-turbo-0125"),
    new Model("gpt-3.5-turbo-1106"),
    new Model("adv-sft-op1"),
    new Model("adv-sft-op2"),
    new Model("adv-sft-op3"),
    new Model("r2d2", "R2D2"),
  ],
  baselineClfs: [
    new Model("llama-guard-2-s", "LlamaGuard-2-s"),
    new Model("llama-guard-2-f", "LlamaGuard-2-f"),
    new Model("harmbench-4o", "HarmBench-4o"),
    new Model("harmbench-llama", "HarmBench-llama"),
    new Model("harmbench-llama", "Harmbench-mistral"),
  ],
  ourClfs: [
    new Model("cot-eg-4t", "CoT-eg-4t"),
    new Model("cot-4o", "CoT-4o"),
  ],
}

const attacks: Attack[] = [
  new Attack("static", "Static"),
  new Attack("dry-ice", "Dry-Ice"),
  new Attack("prompt-inj", "Prompt Inj."),
  new Attack("foreign-lang", "Forgn. Lang."),
  new Attack("rand-search", "Rand. Search"),
  new Attack("pair", "PAIR"),
]

const tableData: TableData = {
  // policy only models
  "claude-3-opus": {
    "static": { value: 0, color: Color.Green, explanation: { component: PolicyStatic, props: { dataPath: "idk..." } } },
    "dry-ice": { value: 40, color: Color.Red },
    "pair": { value: 0.03, color: Color.Red },
  },
  "claude-3-sonnet": {},
  "claude-3-haiku": {},
  "claude-4o-2024-05-13": {},
  "gpt-4-turbo": {},
  "gpt-3.5-turbo-0125": {},
  "gpt-3.5-turbo-1106": {},
  "adv-sft-op1": {},
  "adv-sft-op2": {},
  "adv-sft-op3": {},
  "r2d2": {},
  // baseline classifiers
  "llama-guard-2-s": {
    "static": { value: 0, color: Color.Green },
    "dry-ice": { value: 21.73, color: Color.Red },
    "prompt-inj": { value: 37.88, color: Color.Red },
    "foreign-lang": { value: 10.93, color: Color.Red },
    "rand-search": { value: "?", color: Color.White },
    "pair": { value: 5.83, color: Color.Red },
  },
  "llama-guard-2-f": {},
  "harmbench-4o": {},
  "harmbench-llama": {},
  "harmbench-mistral": {},
  // our classifiers
  "cot-eg-4t": {},
  "cot-4o": {
    "static": { value: "Y", color: Color.Red },
  },
};

export { models, attacks, tableData };
