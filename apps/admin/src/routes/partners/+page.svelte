<script lang="ts">
    import type { PageData } from './$types';
    
    const { data } = $props()
</script>

<svelte:head>
    <title>Admin | Partners</title>
</svelte:head>

<h1>{ JSON.stringify(data, null, 4) }</h1>