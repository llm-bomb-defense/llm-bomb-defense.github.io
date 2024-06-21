<script lang="ts">
  import type { TranscriptWithLabels } from '../data-models';

  import TranscriptDisplay from '../TranscriptDisplay.svelte';

  import { jsonl } from 'js-jsonl';
  export let modelId: string;
  export let attackId: string;

  $: transcriptsPromise = (async () => {
    const response = await fetch(`data/static/${modelId}/human-labels.jsonl`);
    const rawText = await response.text();

    const data = jsonl.parse<TranscriptWithLabels>(rawText);
    return data;
  })();
</script>

{#await transcriptsPromise}
  <p>Loading data...</p>
{:then transcripts}
  <p>There are a total of {transcripts.length} labeled transcripts.</p>
  <!-- Show each labeled item. -->
  <TranscriptDisplay {transcripts} />
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
