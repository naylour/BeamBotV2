<script lang="ts">
	import Button from './Button.svelte';

    let tasks = $state< Record<
		string,
		{
			title: string;
			amount: number;
			icon: string;
			type: 'coin' | 'ticket';
		}[]
	>>({
		daily: [
			{
				title: 'Join TG Group',
				amount: 35000,
				icon: '/tg.svg',
				type: 'coin'
			},
			{
				title: 'Follow our telegram channel',
				amount: 10,
				icon: '/tg.svg',
				type: 'ticket'
			}
		],
		general: [
			{
				title: 'Subscribe X channel',
				amount: 10000,
				icon: '/x.svg',
				type: 'coin'
			},
			{
				title: 'The loooooooooooooooooong task title',
				amount: 1400000000,
				icon: '/inst.svg',
				type: 'ticket'
			}
		],
		partners: [
            {
				title: 'Subscribe for BemBot team',
				amount: 1000000,
				icon: '/tg.svg',
				type: 'coin',
			},
        ],
	})
</script>

<section class="tasks">
	<header class="tasks-header">
		<h1 class="tasks_title">Tasks</h1>
		<h2 class="tasks_subtitle">Redeem your reward after<br />each task is completed</h2>
		<img src="/tasks_icon.svg" alt="" />
	</header>

	<div class="tasks-blocks">
		{#each Object.keys(tasks) as taskName, i(i)}
			{#if tasks?.[taskName]?.length > 0}
				<div class="tasks-block tasks-{taskName}">
					<h3 class="tasks-block_title">{taskName} Tasks</h3>
					{#each tasks[taskName] as item, i (i)}
						<Button
							title={item.title}
							amount={item.amount}
							type={item.type}
							icon={item.icon}
						></Button>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</section>

<style lang="scss">
	.tasks {
		height: 100%;
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
			button {
				padding: 15px 25px;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 5px;
				overflow: visible;

				font-size: 14px;

				&[data-done]::before {
					background-color: #cecece;
				}

				div {
					&:nth-child(2) {
						display: flex;
						flex-direction: column;
						text-align-last: left;
						justify-content: space-between;
						gap: 5px;
					}
				}
			}
		}
	}
</style>
