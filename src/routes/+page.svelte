<script lang="ts">
  import type { AttackStatistic } from './../lib/table';

  import { models, attacks, tableData } from './../lib/table';
  import { Col, Container, Row } from '@sveltestrap/sveltestrap';
  import './styles.scss';

  let lastSelectedCell: HTMLElement | undefined = undefined;
  function cellClick(event: MouseEvent, attackStat: AttackStatistic) {
    if (lastSelectedCell !== undefined) {
      lastSelectedCell.classList.remove('selected');
    }

    console.log('Clicked on cell with stat:', attackStat);

    // Walk up the DOM tree until we find an element with the class 'cell'
    let target = event.target as HTMLElement;
    while (!target.classList.contains('cell')) {
      target = target.parentElement as HTMLElement;
    }

    target.classList.add('selected');
    lastSelectedCell = target;
  }
</script>

<svelte:head>
  <title>LLM Bomb Defense</title>
  <meta
    name="description"
    content="How (Not) to Prevent Your LLM from Helping Someone Make a Bomb"
  />
</svelte:head>

<Container class="lato mt-3">
  <Row class="text-center">
    <Col md="12">
      <h2>
        How (Not) to Prevent Your LLM
        <br />
        from Helping Someone Make a Bomb
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
        >. The paper explores how to defend an LLM so that it will not help someone make a lethal
        bomb. This is a toy problem that is supposed to be a stand-in for a more general problem of
        high-reliability control of LLM behavior.
      </p>
      <p>
        Each number in the table below represents the vulnerability of a particular language model
        to an attack that tries to get it to help make a bomb. Click on a cell to read about the
        methodology we used to compute the number, and to see the human judgment data associated
        with that number.
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
        <div style="grid-column: 2 / -1; text-align: center;">Attack Success Rate (%)</div>
        {#each models.policyOnly as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in tableData[model.id]}
              <button
                type="button"
                class="cell {tableData[model.id][attack.id].color.valueOf()}"
                on:click={(event) => cellClick(event, tableData[model.id][attack.id])}
                ><div class="cell-data">{tableData[model.id][attack.id].value}</div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}

        <div style="grid-column: 1 / -1; height: 15px;"></div>
        <div style="grid-column: 2 / -1; text-align: center;">AlpacaEval Refusal Rate (%)</div>
        {#each models.baselineClfs as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in tableData[model.id]}
              <button
                type="button"
                class="cell {tableData[model.id][attack.id].color.valueOf()}"
                on:click={(event) => cellClick(event, tableData[model.id][attack.id])}
                ><div class="cell-data">{tableData[model.id][attack.id].value}</div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}

        <div style="grid-column: 1 / -1; height: 15px;"></div>
        <div style="grid-column: 2 / -1; text-align: center;">
          Single working attack input found?
        </div>
        {#each models.ourClfs as model}
          <div class="model-cell">{model.displayStr}</div>
          {#each attacks as attack}
            {#if attack.id in tableData[model.id]}
              <button
                type="button"
                class="cell {tableData[model.id][attack.id].color.valueOf()}"
                on:click={(event) => cellClick(event, tableData[model.id][attack.id])}
                ><div class="cell-data">{tableData[model.id][attack.id].value}</div></button
              >
            {:else}
              <div class="cell gray"><div class="cell-data"></div></div>
            {/if}
          {/each}
        {/each}
      </div>
    </Col>
  </Row>

  <Row class="text-center">
    <Col md="8" class="offset-md-2">
      <br />
      <br />
      <p class="text-justify">
        This site's design is adapted from
        <a href="https://say-can.github.io/" target="_blank">say-can</a>.
      </p>
    </Col>
  </Row>
</Container>
