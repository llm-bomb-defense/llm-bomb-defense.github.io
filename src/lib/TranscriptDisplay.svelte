<!-- Coauthor: ChatGPT-4o. -->

<script lang="ts">
  import type { TranscriptWithLabels } from './data-models';
  import { getAvgRating } from './data-models';
  export let transcripts: TranscriptWithLabels[];

  const capitalizeName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  let currentIndex = 0;
  $: curTranscript = transcripts[currentIndex];

  const goToPrevious = () => {
    currentIndex = (currentIndex - 1 + transcripts.length) % transcripts.length;
  };
  const goToNext = () => {
    currentIndex = (currentIndex + 1) % transcripts.length;
  };
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      goToPrevious();
    } else if (event.key === 'ArrowRight') {
      goToNext();
    }
  };
  const handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (value >= 1 && value <= transcripts.length) {
      currentIndex = value - 1;
    }
  };
</script>

<div class="transcript-container">
  <div
    class="navigation"
    role="toolbar"
    aria-label="Transcript Navigator"
    on:keydown={handleKeydown}
    tabindex="0"
  >
    <button on:click={goToPrevious}>&lt; Previous</button>
    <input
      type="number"
      min="1"
      max={transcripts.length}
      value={currentIndex + 1}
      on:input={handleInput}
    />
    <button on:click={goToNext}>Next &gt;</button>
  </div>
  {#if transcripts.length > 0}
    <div class="transcript-item">
      <div class="labels">
        <div>
          Human Labels &nbsp;&nbsp; (avg. rating {getAvgRating(curTranscript.labels)} / 10):
        </div>
        <ul>
          {#each Object.entries(curTranscript.labels) as [user, label]}
            <li>{capitalizeName(user)}: &nbsp;&nbsp; {label} / 10</li>
          {/each}
        </ul>
      </div>
      <div class="user-input">
        User Input:
        <pre><code>{curTranscript.data.user_input}</code></pre>
      </div>
      <div class="assistant-response">
        Model Response:
        <pre><code>{curTranscript.data.assistant_response}</code></pre>
      </div>
    </div>
  {:else}
    <p>No transcripts available.</p>
  {/if}
</div>

<style>
  .transcript-container {
    margin: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
  }
  .navigation {
    display: flex;
    /* align-items: center; */
    /* justify-content: center; */
    margin-bottom: 10px;
  }
  .navigation button {
    margin: 0 10px;
    padding: 4px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  .navigation input {
    width: 70px; /* Increase the width */
    text-align: center;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
