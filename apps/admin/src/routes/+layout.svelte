<script lang="ts">
    import '../index.scss';
    import { Header, Nav } from "sections";

    const { children } = $props();
</script>

<Nav />
<Header />
<main class="main">
    {@render children()}
</main>

<style lang="scss">
    .main {
        position: absolute;
        top: var(--header-height); 
        left: 0;
        padding: 10px;
        padding-left: calc(var(--sidebar-width) + 10px);
        height: calc(100% - var(--header-height));
        width: 100%;
        z-index: 1;
    }
</style>