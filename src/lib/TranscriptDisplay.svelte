<script lang="ts">
  import type { TranscriptWithLabels } from './data-models';
  export let transcripts: TranscriptWithLabels[] = [];
</script>

<div class="transcript-container">
  {#each transcripts as transcript (transcript.data_hash)}
    <div class="transcript-item">
      <div class="labels">
        <div>Labels:</div>
        {#each Object.entries(transcript.labels) as [user, label]}
          <div class="label-item">{user}: {label}</div>
        {/each}
      </div>
      <div class="user-input">
        User Input
        <pre><code>{transcript.data.user_input}</code></pre>
      </div>
      <div class="assistant-response">
        Assistant Response
        <pre><code>{transcript.data.assistant_response}</code></pre>
      </div>
    </div>
  {/each}
</div>

<style>
  .transcript-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .transcript-item {
    margin-bottom: 20px;
  }
  .user-input,
  .assistant-response {
    margin: 10px 0;
  }
  .labels {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f1f1f1;
  }
  .label-item {
    margin: 5px 0;
  }
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap; /* Enables text wrapping */
    word-wrap: break-word; /* Ensures long words are wrapped */
  }
  code {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
