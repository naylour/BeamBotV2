<script lang="ts">
	import Button from './Button.svelte';

	const groupBy = <T,>(array: T[], key: keyof T): { [key: string]: T[] } => {
		return array.reduce(
			(result, currentValue) => {
				const groupKey = String(currentValue[key]);
				if (!result[groupKey]) {
					result[groupKey] = [];
				}
				result[groupKey].push(currentValue);
				return result;
			},
			{} as { [key: string]: T[] }
		);
	};
	const { data } = $props();

	let tasks = $state(groupBy(data?.tasks || [], 'type'));
</script>

<section class="tasks">
	<header class="tasks-header">
		<h1 class="tasks_title">Tasks</h1>
		<h2 class="tasks_subtitle">Redeem your reward after<br />each task is completed</h2>
		<img src="/tasks_icon.svg" alt="" />
	</header>

	<div class="tasks-blocks">
		{#each Object.keys(tasks) as taskName, i (i)}
			{#if tasks?.[taskName]?.length > 0}
				<div class="tasks-block tasks-{taskName}">
					<h3 class="tasks-block_title">{taskName}</h3>
					{#each tasks[taskName] as item, i (i)}
						<Button
							title={item.title}
							amount={item.amount}
							type={item.amountType}
							icon={item.icon}
							link={item.link}
							id={item.id}
							chatId={item.chatId}
						></Button>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</section>

<style lang="scss">
	.tasks {
        padding: 20px 5px;
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
        overflow-y: scroll;

		&-header {
			display: flex;
			align-items: center;
			flex-direction: column;
			text-align: center;

			img {
				margin-top: 10px;
				width: 100px;
                height: 100px;
			}
		}

		&_title {
			font-weight: 400;
			font-size: 30px;
		}

		&_subtitle {
			margin-top: 10px;
			font-weight: 400;
			color: #b8b8b8;
			font-size: 15px;
		}

		&-blocks {
			margin-top: 30px;
			padding-right: 10px;

			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 20px;
			width: 100%;
		}

		&-block {
			display: flex;
			flex-direction: column;
			gap: 20px;
			width: 100%;

			&_title {
				text-transform: capitalize;
				margin-left: 16px;
				font-size: 18px;
				font-weight: 400;
				text-shadow: 1px 1px 1px black;
			}
			:global(.button) {
				padding: 5px 15px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 5px;
				overflow: visible;

				font-size: 14px;
			}

			// :global(.button[data-done]::before) {
			// 	background-color: #cecece;
			// }

			// :global(.button div) {
			// 	&:nth-child(2) {
			// 		display: flex;
			// 		flex-direction: column;
			// 		text-align-last: left;
			// 		justify-content: space-between;
			// 		gap: 5px;
			// 	}
			// }
		}
	}
</style>
