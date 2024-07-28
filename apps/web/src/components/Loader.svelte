<script lang="ts">
import { app } from 'stores';
	import { fade } from 'svelte/transition';
</script>

{#if !app.value.loader.isLoad}
<aside class="loader" in:fade out:fade>
	<img src="/coin_large.png" alt="Loading..." />

    <h1>Loading...</h1>
</aside>
{/if}

<style lang="scss">
	.loader {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--tg-theme-bg-color);

        color: var(--tg-theme-text-color);
        letter-spacing: 1px;
        font-size: 20px;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 10px;
        z-index: 10000;

        h1 {
            margin-top: -10%;
        }

		img {
			scale: 0.5;
			animation: anim 3s linear infinite;
		}
	}

	@keyframes anim {
		0% {
			scale: .35;
		} 20% {
			scale: .5;
		} 40% {
			scale: .35;
		} 60% {
			scale: .5;
		} 80% {
			scale: .35;
		} 100% {
			scale: .35;
		}
	}
</style>
