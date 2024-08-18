<script lang="ts">
  import type { PageData } from './$types';

  import { ssp, queryParam } from 'sveltekit-search-params';
  import { Col, Container, Row } from '@sveltestrap/sveltestrap';

  import { models, attacks } from '../lib/table';
  import './styles.scss';

  export let data: PageData;
  $: renderedTable = data.renderedTable;

  type SelectedCellType = { modelId: string; attackId: string };

  let selectedCell = queryParam('selectedCell', ssp.lz<SelectedCellType>());
  $: explComp = $selectedCell
    ? renderedTable[$selectedCell.modelId][$selectedCell.attackId].explComp
    : undefined;
  $: explExtraProps = $selectedCell
    ? renderedTable[$selectedCell.modelId][$selectedCell.attackId].explExtraProps
    : undefined;
</script>

<svelte:head>
  <title>LLM Bomb Defense</title>
  <meta
    name="description"
    content="Making LLMs Not Help Make Bombs with LLM-based Transcript Classifiers"
  />
</svelte:head>

<Container class="lato mt-3">
  <Row class="text-center">
    <Col md="12">
      <h2>
        Making LLMs Not Help Make Bombs
        <br />
        with LLM-based Transcript Classifiers
      </h2>
    </Col>
  </Row>

  <Row class="text-center author-list">
    <Col md="12">
      <ul class="list-inline">
        <li class="list-inline-item">
          <a href="https://tonytwang.net" target="_blank">Tony T. Wang</a>*
        </li>
        <li class="list-inline-item">
          <a href="https://www.jplhughes.com/" target="_blank">John Hughes</a>*
        </li>
        <li class="list-inline-item">
          <a href="https://www.linkedin.com/in/henry-sleight-406811227" target="_blank"
            >Henry Sleight</a
          >
        </li>
        <li class="list-inline-item">
          <a href="https://www.linkedin.com/in/rajashreeagrawal/" target="_blank"
            >Rajashree Agrawal</a
          >
        </li>
        <li class="list-inline-item">
          <a href="https://rylanschaeffer.github.io/" target="_blank">Rylan Schaeffer</a>
        </li>
        <br />
        <li class="list-inline-item">
          <a href="https://fbarez.github.io/" target="_blank">Fazl Barez</a>
        </li>
        <li class="list-inline-item">
          <a href="https://mrinanksharma.github.io/" target="_blank">Mrinank Sharma</a>
        </li>
        <li class="list-inline-item">
          <a href="https://jesse.mu/" target="_blank">Jesse Mu</a>
        </li>
        <li class="list-inline-item">
          <a href="https://people.csail.mit.edu/shanir/" target="_blank">Nir Shavit</a>
        </li>
        <li class="list-inline-item">
          <a href="https://ethanperez.net/" target="_blank">Ethan Perez</a>
        </li>
      </ul>
    </Col>
  </Row>

  <Row class="text-justify fs-6">
    <Col md="8" class="offset-md-2">
      <p>
        This site hosts an interactive version of the results from
        <a
          href="https://static.wikia.nocookie.net/angrybirds/images/3/3b/Bomb.png/revision/latest/scale-to-width/360?cb=20220506195951"
          target="_blank">arxiv.org/xxxx.yyyyy</a
        >, which explores how to defend an LLM so that it will not help someone make a lethal bomb.<sup
          >1</sup
        > This is a toy problem that is supposed to be a stand-in for the more general problem of high-reliability
        control of LLM behavior.
      </p>
      <p class="footnote">
        <sup>1</sup> By "will not help someone make a lethal bomb", we mean that it is not possible
        to ask the LLM a question x and have it respond with a response y such that the transcript
        [x, y] is judged by a <em>human</em> as "bomb-helping" according to the following rubric:
        <a href="human-rubric.txt" target="_blank">human-rubric.txt</a>.
      </p>
      <p>
        The table below shows how different language models fare against different attacks that try
        to get the model to help make a bomb. Each row represents a particular language model
        (possibly defended), and each column represents a particular attack. Click on a cell to read
        about the methodology we used to compute the number in the cell, and to see the human
        judgment data summarized by that number.
      </p>
    </Col>
  </Row>

  <Row class="mt-2">
    <Col md="12">
      <div class="grid-container justify-content-start justify-content-md-center">
        <!-- Header Row -->
        <div class="header-cell"><!--Model--></div>
        {#each attacks as attack}
          <div class="header-cell">{attack.displayStr}</div>
        {/each}

        <div style="grid-column: 1 / -1; height: 5px;"></div>
        <div class="model-cell"><b>Policy Only Models</b></div>
        <div style="grid-column: 2 / -1; text-align: center;">Attack Success Rate (%)</div>
        {#each models.policyOnly as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in renderedTable[model.id]}
              <button
                type="button"
                class="cell {renderedTable[model.id][
                  attack.id
                ].content.color.valueOf()} {$selectedCell?.modelId === model.id &&
                $selectedCell?.attackId === attack.id
                  ? 'selected'
                  : ''}"
                on:click={(_) => {
                  $selectedCell = { modelId: model.id, attackId: attack.id };
                }}
                ><div class="cell-data">
                  {renderedTable[model.id][attack.id].content.value}
                </div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}

        <div style="grid-column: 1 / -1; height: 15px;"></div>
        <div class="model-cell"><b>Other Clf. Defenses</b></div>
        <div style="grid-column: 2 / -1; text-align: center;">AlpacaEval Refusal Rate (%)</div>
        {#each models.baselineClfs as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in renderedTable[model.id]}
              <button
                type="button"
                class="cell {renderedTable[model.id][
                  attack.id
                ].content.color.valueOf()} {$selectedCell?.modelId === model.id &&
                $selectedCell?.attackId === attack.id
                  ? 'selected'
                  : ''}"
                on:click={(_) => {
                  $selectedCell = { modelId: model.id, attackId: attack.id };
                }}
                ><div class="cell-data">
                  {renderedTable[model.id][attack.id].content.value}
                </div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}

        <div style="grid-column: 1 / -1; height: 15px;"></div>
        <div class="model-cell"><b>Our Clf. Defenses</b></div>
        <div style="grid-column: 2 / -1; text-align: center;">
          Single working attack input found?
        </div>
        {#each models.ourClfs as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in renderedTable[model.id]}
              <button
                type="button"
                class="cell {renderedTable[model.id][
                  attack.id
                ].content.color.valueOf()} {$selectedCell?.modelId === model.id &&
                $selectedCell?.attackId === attack.id
                  ? 'selected'
                  : ''}"
                on:click={(_) => {
                  $selectedCell = { modelId: model.id, attackId: attack.id };
                }}
                ><div class="cell-data">
                  {renderedTable[model.id][attack.id].content.value}
                </div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}
      </div>
    </Col>
  </Row>

  <!-- Explanation -->
  <Row class="mt-5">
    <Col md="8" class="offset-md-2">
      {#if explComp === undefined}
        <p class="text-center">
          After you click a valid cell, the details behind the statistic will show up here.
        </p>
      {/if}
      <svelte:component
        this={explComp}
        modelId={$selectedCell?.modelId}
        attackId={$selectedCell?.attackId}
        {...explExtraProps?.props}
      />
    </Col>
  </Row>

  <!-- TODO: bibtex citation -->

  <!-- Credits -->
  <Row class="text-center mt-5">
    <Col md="8" class="offset-md-2">
      <p>
        This site's design is adapted from
        <a href="https://say-can.github.io/" target="_blank">say-can</a>.
      </p>
    </Col>
  </Row>
</Container>
