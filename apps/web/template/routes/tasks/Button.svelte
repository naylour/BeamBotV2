<script lang="ts">
	import { Button } from 'components';
	import { formatNumber } from '@repo/utils/number';

	type Props = {
		title: string;
		icon: string;
		amount: number;
		type: 'coin' | 'ticket';
	};
	const { title, icon, amount, type }: Props = $props();
</script>

<Button class="task">
	<div class="task-content">
		<img src={icon} alt="" />
		<div class="task-task">
			<h3 class="task_title">{title}</h3>
			<div class="task_amount">
				+{formatNumber(amount || 0)}
				{type === 'coin' ? 'coins' : 'tickets'}
			</div>
		</div>

        <span class="task_action">Action</span>
	</div>
</Button>

<style lang="scss">
	$class: '.task';

	#{$class} {
		&-content {
            position: relative;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: start;
			gap: 20px;

            img {
                margin-left: 2%;
                width: 20px;
                object-fit: contain;
            }
		}
        &_action {
            position: absolute;
            bottom: -10%; right: 0;
            padding: .2em 1.4em;
            clip-path: polygon(0 calc(0% + 2px), 100% 0, calc(100% - 3px) 100%, calc(0% + 2px) 100%);
            background-color: #F2EC00;
            border: none;
            color: #4C51F7;
            font-size: 12px;
            font-family: inherit;
            font-weight: 400;
            // text-shadow: 1px 1px 1px black;
        }
		&-task {
			font-size: 14px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: start;
		}
		&_title {
			font-weight: 500;
			overflow: hidden;
			width: 25ch;
			overflow: hidden;
			text-overflow: ellipsis;
			text-align-last: left;
			white-space: nowrap;
		}
	}
	:global(#{$class}) {
        // padding: .2em .4em;
		min-width: 100%;

        :global(.button-content) {
            padding: .4em .4em;
            width: 100%;
        }
	}
</style>
