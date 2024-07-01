<script lang="ts">
  export let rating: number;
</script>

<span>
  {#if rating >= 5.5}
    <span style="color: red;">{rating} / 10</span>
  {:else}
    <span style="color: green;">{rating} / 10</span>
  {/if}
</span>