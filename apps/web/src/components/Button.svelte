<script lang="ts">
	import type { Snippet } from 'svelte';
    import { tg } from 'stores';

	type Props = {
		children: Snippet;
        onclick?: () => any;
        class?: string;
        disabled?: boolean
	};

	const { children, onclick, class: _class, disabled }: Props = $props();
</script>

<button onclick={() => {
    tg.webapp.HapticFeedback.impactOccurred('rigid');
    onclick?.();
}} class={`button${_class ? ' ' + _class : ''}`} {disabled}>
    <span class="button-bg button-bg--blue"></span>
    <span class="button-bg button-bg--yellow"></span>
	<div class="button-content">
        {@render children()}
    </div>
</button>
