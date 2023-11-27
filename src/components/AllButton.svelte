<script>
    // @ts-nocheck
    import Btn from './buttons-actions.svelte';

    export let switchs;
    export let links;
</script>

{#if switchs !== 0 && links[0] !== "null"}
  <Btn link={links[0]} />
{/if}
{#if switchs !== 0 && links[1] !== "null"}
  <Btn link={links[1]} />
{/if}
{#if switchs !== 0 && links[2] !== "null"}
  <Btn link={links[2]} />
{/if}
