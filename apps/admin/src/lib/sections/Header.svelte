<script lang="ts">
    import { page } from '$app/stores';
</script>

<header class="header">
    <h2>BeamBot Admin <span>[{ $page.url.pathname.slice(1) || 'home' }]</span></h2>
    {#if $page.url.pathname !== '/'}
        <button onclick={() => history.go(-1)}>Back</button>
    {/if}
</header>

<style lang="scss">
    .header {
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: var(--header-height);
        background-color: var(--section-color);

        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: white;
        z-index: 2;

        h2 {
            font-weight: 500;
            span {
                font-size: 18px;
            }
        }

        button {
            
        }
    }
</style>