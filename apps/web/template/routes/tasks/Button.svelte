<script lang="ts">
	import { Button } from 'components';
	import { formatNumber } from '@repo/utils/number';
	import { tg, user } from 'stores';

    const icons = {
        'Telegram': "/tg.svg",
        'X': "/x.svg",
        'Instagram': "/inst.svg",
    }

	type Props = {
		title: string;
		icon: keyof typeof icons;
		amount: number;
		type: 'Coin' | 'Ticket';
        link: string;
        id: number;
        chatId: string | null;
	};

	const { title, icon, amount, type, link, id, chatId }: Props = $props();

    let action = $state<'start' | 'check'>('start');
    let isDone = $derived(!!user.value?.account.completedTasks.find(elem => elem.id === id));
    let checks = $state(10);

    $inspect(isDone)
</script>

<Button class="task{isDone ? ' complete' : ''}" disabled={checks > 0 && checks < 10} onclick={async () => {

    if(action == 'start') {
        if(link.startsWith('https://t.me')) {
            tg.webapp.openTelegramLink(link);
            action = 'check';
        }
        else {
            const interval = setInterval(() => {
                if(checks === 1) {
                    action = 'check';
                    clearInterval(interval);
                }
                checks--;
            }, 1000);
            tg.webapp.openLink(link);
        }
    } else if(action == 'check' && !isDone) {
        const response = await fetch('/tasks', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: chatId ? 'tg-task' : 'task',
                taskId: id
            })
        });

        if(response.status === 200) {
            const data = await response.json()
            user.value?.account.completedTasks.push(data.task);
            (user.value as App.User).wallet = data.wallet;

            tg.webapp.showAlert(`You’ve received ${amount} ${type}!`);
        }
        else {
            tg.webapp.showAlert('Task not complete!');
            action = 'start'
        }
    }
}}>
	<div class="task-content">
		<img src={icons[icon]} alt="" />
		<div class="task-task">
			<h3 class="task_title">{title}</h3>
			<div class="task_amount">
				+{formatNumber(amount || 0)}
				{type === 'Coin' ? 'coins' : 'tickets'}
			</div>
		</div>

        <span class="task_action">{ isDone ? 'DONE' : checks > 0 && checks < 9 ? checks : action.toUpperCase() }</span>
	</div>
</Button>

<style lang="scss">
	$class: '.task';

    :global(.complete .button-bg--blue) {
        background-color: darken(grey, 30%);
    }
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
            width: 8ch;
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
			width: 22ch;
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
