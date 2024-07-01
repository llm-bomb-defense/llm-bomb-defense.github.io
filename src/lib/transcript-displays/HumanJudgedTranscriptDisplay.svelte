<!-- Coauthor: ChatGPT-4o. -->
<script lang="ts">
  import type { TranscriptWithLabels } from '../data-models';
  import { getAvgRating } from '../data-models';
  import ColoredRating from './ColoredRating.svelte';
  import TranscriptHelp from './TranscriptHelp.svelte';

  export let transcripts: TranscriptWithLabels[];
  export let downloadPath: string;

  // Sort transcripts based average rating
  transcripts.sort((a, b) => {
    const aRating = getAvgRating(a.labels);
    const bRating = getAvgRating(b.labels);

    // First sort by average rating, higher ratings first
    if (aRating != bRating) return bRating - aRating;

    // Then sort by length of the transcript, shorter lengths first
    const aLength = a.data.user_input.length + a.data.assistant_response.length;
    const bLength = b.data.user_input.length + b.data.assistant_response.length;
    return aLength - bLength;
  });

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
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      goToPrevious();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
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
  <h5>
    Human-graded Transcripts
    <a href={downloadPath} target="_blank" style="font-size: 0.8em;">(click to download all)</a>
  </h5>

  <!-- Navbar -->
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
    /> <span> / {transcripts.length} </span>
    <button on:click={goToNext}>Next &gt;</button>
    &nbsp;&nbsp;
    <span class="keyboard-shortcut">
      You can also click here and then use the arrow keys to navigate.</span
    >
  </div>

  <div>
    <TranscriptHelp>
      <svelte:fragment slot="sorting-statement">
        The following transcripts are sorted so the transcripts rated to have more competent
        bomb-making help are shown first. In case of ties, shorter transcripts are shown first.
      </svelte:fragment>
    </TranscriptHelp>
  </div>

  {#if transcripts.length > 0}
    <div class="transcript-item">
      <div class="labels">
        <div>
          <b>Human Labels</b> &nbsp;&nbsp; (avg. rating <ColoredRating
            rating={getAvgRating(curTranscript.labels)}
          />)
        </div>
        <ul>
          {#each Object.entries(curTranscript.labels) as [user, label]}
            <li>
              {capitalizeName(user)}: &nbsp;&nbsp;
              <ColoredRating rating={parseInt(label)} />
            </li>
          {/each}
        </ul>
      </div>

      <div class="user-input">
        <b>User Input</b>
        <pre><code>{curTranscript.data.user_input}</code></pre>
      </div>

      <div class="assistant-response">
        <b>Model Response</b>
        <pre><code>{curTranscript.data.assistant_response}</code></pre>
      </div>
    </div>
  {:else}
    <p>No transcripts available.</p>
  {/if}
</div>

<style lang="scss">
  @import './styles/navigation.scss';
  @import './styles/transcript.scss';
</style>
