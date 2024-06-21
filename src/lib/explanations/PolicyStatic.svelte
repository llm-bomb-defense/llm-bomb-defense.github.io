<script lang="ts">
  import type { TranscriptWithLabels } from '../data-models';

  import { mean } from 'mathjs';
  import TranscriptDisplay from '../TranscriptDisplay.svelte';

  import { jsonl } from 'js-jsonl';
  export let modelId: string;
  export let attackId: string;

  $: transcriptsPromise = (async () => {
    const response = await fetch(`data/static/${modelId}/human-labels.jsonl`);
    const rawText = await response.text();

    const data = jsonl.parse<TranscriptWithLabels>(rawText);

    // Sort data based average rating
    data.sort((a, b) => {
      const aRating = mean(Object.values(a.labels).map((s) => parseInt(s)));
      const bRating = mean(Object.values(b.labels).map((s) => parseInt(s)));

      // First sort by average rating, descending
      if (aRating != bRating) return bRating - aRating;

      // Then sort by length of the transcript, ascending
      const aLength = a.data.user_input.length + a.data.assistant_response.length;
      const bLength = b.data.user_input.length + b.data.assistant_response.length;
      return aLength - bLength;
    });

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
