<script lang="ts">
	import type { Snippet } from "svelte";
	import type { MouseEventHandler } from "svelte/elements";

    type Props = {
        class?: string;
        href?: string;
        activeClassname?: string;
        onclick?:  MouseEventHandler<HTMLAnchorElement>;
        children: Snippet;
    };

    const {
        class: __class,
        activeClassname = 'active',
        href = '#',
        children,
        onclick
    }: Props = $props();

    let isActive = $state(false);
</script>

<a {href} class={`link${__class ? ' ' + __class : ''}${isActive ? ' ' + activeClassname : ''}`} {onclick}>
    {@render children()}
</a>

<style lang="scss">
    .link {
        color: inherit;
        text-decoration: none;
    }
</style>