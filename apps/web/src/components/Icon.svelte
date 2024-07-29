<script lang="ts">
	type Props = {
		name: string;
	};

	const { name }: Props = $props();
</script>

<svg class="icon" viewBox="0 0 64 64">
	<use xlink:href="#{name}"></use>
</svg>

<style lang="scss">
	.icon {
		width: 50px; height: 50px;
		aspect-ratio: 1 / 1;

        fill: inherit;
        stroke: inherit;
	}
</style>
