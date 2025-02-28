<script lang="ts">
	import { onMount } from 'svelte';
	import { formatNumber } from '@repo/utils/number';
	import { fade } from 'svelte/transition';
	import { tg, user } from 'stores';
	import Button from './Button.svelte';
	import { beforeNavigate, goto } from '$app/navigation';

	const {
		rouletteData,
        callback
	}: {
		rouletteData: {
			items: App.SpinType[];
			winId: number;
		};
        callback: () => Promise<void>
	} = $props();

	let wheel = $state<HTMLDivElement>();
	let wheelList = $state<HTMLUListElement>();

	let left = $state(0);
	let wheelElemWidth = $derived((wheelList?.clientWidth || 1) / 3 - 15 * 2);
	let step = $state(0);

	let speed = $state(50);

	let lastTimestamp = $state(0);

	let animId = $state(0);

	let startTime = $state<Date>();
	let isRunning = $state(false);
	let isStopped = $state(false);

    beforeNavigate(nav => {
        if(isRunning) nav.cancel()
    })

	const movement = (timeStamp: number) => {
		const deltaTime = (timeStamp - lastTimestamp) / 1000;

		lastTimestamp = timeStamp;

		if (wheelList) {
			if (wheelElemWidth - left < 0) {
				const items = Array.from(wheelList.children) as HTMLLIElement[];

				const firstChild = wheelList.removeChild(items[0]);
				wheelList.insertAdjacentElement('beforeend', firstChild);

				// left = (wheel?.getBoundingClientRect().width || 1) / (wheelElemWidth * 3 + );
				left = -16;
			}

			step++;

			left += speed * deltaTime;

			if (isRunning && new Date().getSeconds() - (startTime?.getSeconds() || 0) > 1) {
				const elem = document.querySelector(
					`[data-id="${rouletteData.winId}"]`
				) as HTMLLIElement;

				const elemLeft = elem.getBoundingClientRect().left;

                if (
					// speed <= 250 &&
					elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 <= 5 &&
					elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 >= -5
				) return stop();

				if (
					elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 > wheelElemWidth * 4 &&
					speed > 450
				)
					speed = Math.max(speed - 750 * deltaTime, 850);

				if (
					elemLeft + wheelElemWidth / 1.5 - (wheel?.offsetWidth || 1) / 2 > wheelElemWidth &&
					speed > 200
				)
					speed = Math.max(speed - 2050 * deltaTime, 220);
			}

			const items = Array.from(wheelList.children) as HTMLLIElement[];

			for (const item of items) {
				item.style.translate = `${-left}px 0`;
			}

			start();
		}
	};

	const start = () => {
		animId = requestAnimationFrame(movement);
	};

	const stop = () => {
		if (animId) cancelAnimationFrame(animId);
		speed = 50;
		isRunning = false;
		isStopped = true;
		startTime = undefined;
		setTimeout(start, 1000);
	};

	const getWinId = async (callback: () => Promise<void>) => {
		const response = await fetch('/lootbox');

		if (response.status === 200) {
			const data = await response.json();

			rouletteData.winId = data.winId;

			callback();
		}

		if (response.status == 401) {
			tg.webapp.showAlert('Not enough tickets!');
		}
	};

	const run = async () => {
		getWinId(async () => {
			stop();
			left = 0;
			speed = 1200;
			startTime = new Date();
			isRunning = true;
			isStopped = false;
			start();
		});
	};
	const close = async () => {
		if (user.value?.wallet.spins?.length !== 0) {
            isStopped = false;
            await callback()
        } else {
            goto('/daily');
        }
        const updatedData = await fetch('/api/user', {
            method: 'get'
        });
        if (updatedData.status === 200) {
            user.value = await updatedData.json();
        }
	};

	let showCongrat = $derived(isStopped && !isRunning);

	onMount(start);
</script>

<!-- {#if dev}
    <div class="dev">
        <p>Elem width: { wheelElemWidth }</p>
        <p>List ml: { left.toFixed(2) }</p>
        <p>Speed: { speed.toFixed() }</p>
        <p>isRunning: { isRunning }</p>
        <p>isStopped: { isStopped }</p>
    </div>
{/if} -->

<div class="wheel">
	<div class="wheel_indicator"></div>
    {#if user.value?.wallet.spins?.length !== 0}
         <p class="wheel_message">
             Open for 1 ticket
         </p>
         <p class="wheel_balance"><b>{user.value?.wallet.tickets}</b> tickets</p>
    {/if}
	<div class="wheel-wrapper" bind:this={wheel}>
		<ul class="wheel-elems" bind:this={wheelList} style:--width={`${wheelElemWidth}px`}>
			{#each rouletteData.items as item (item.id)}
				<li data-id={item.id}>
					<img src={item.type === 'coin' ? '/coin.png' : '/ticket.png'} alt="" />
					<p class="total">{formatNumber(item.total)}</p>
				</li>
			{/each}
		</ul>
	</div>

	<Button class="wheel_button" onclick={run} disabled={isRunning}>Spin</Button>
</div>
{#if showCongrat}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div in:fade out:fade class="wheel-congrat" onclick={close}>
		<h2>Congratulations!<br />You won</h2>

		<div class="wheel-congrat-prize">
			<div class="icon">
				<img
					src={rouletteData.items[rouletteData.winId]?.type === 'coin'
						? '/coin.png'
						: '/ticket.png'}
					alt=""
				/>
				<p>{formatNumber(rouletteData.items[rouletteData.winId]?.total || 0)}</p>
			</div>
			<div class="sun">
				<span></span><span></span><span></span><span></span><span></span><span></span><span
				></span><span></span><span></span><span></span>
			</div>
		</div>
		<p>
			You’re amongst the luckiest {rouletteData.items[rouletteData.winId]?.chance}% of players!
			Share with your friends to see if they can compete!
		</p>
		<div class="buttons">
			<Button
				onclick={() => {
					let url = `https://t.me/BeamTapBot/?start=${user.value?.account.inviteCode}`;
					let shareText = `
                    I just won an INCREDIBLE ${formatNumber(rouletteData.items[rouletteData.winId].total || 0)} ${rouletteData.items[rouletteData.winId].type === 'coin' ? 'coins' : 'tickets'} from BeamBot’s official Lootbox! 🤗\n\nCheck the epic rewards out now! 🔥\n\nJoin me on BeamBot and grab your own special surprise Lootbox ☘️\n\nLet’s see what you win 🏆 you won’t want to miss this! 👀
                    `.trim();

					tg.webapp.openTelegramLink(
						'https://t.me/share/url?url=' +
							encodeURIComponent(url) +
							'&text=' +
							encodeURIComponent(shareText)
					);
					isStopped = false;
				}}>Share</Button
			>
			<Button onclick={close}>Close</Button>
		</div>
	</div>
{/if}

<style lang="scss">
    .dev {
        position: absolute;
        top: 5px; left: 5px;
        padding: 10px;
        font-size: 18px;
        background-color: red;
        border-radius: 12px;
    }
	.wheel {
		margin-bottom: -10%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: 20px;
		width: 100%;
		position: relative;

		&_message,
		&_balance {
			position: absolute;
			bottom: calc(100% + 10px);
			font-size: 16px;
			text-shadow: 1px 1px 1px black;
		}
		&_message {
			left: 0;
		}
		&_balance {
			right: 0;
			b {
				font-weight: 400;
				font-size: 18px;
				color: #f2ec00;
			}
		}

		&-congrat {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(#252762, 0.96);
			backdrop-filter: blur(5px);
			z-index: 1;

			padding-top: 5%;
			padding-bottom: 10%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			// gap: 20px;
			p {
				margin-bottom: 10%;
				// display: block;
				width: 85%;
				text-align: center;
			}

			.buttons {
				display: grid;
				grid-template-columns: 1fr 2fr;
				gap: 10px;
				width: 70%;
				margin-bottom: 10%;
				:global(.button) {
                    padding: .2em;
                }
				:global(.button:nth-child(2)) {
					width: 100%;
				}
			}

			h2 {
				text-align: center;
				font-size: 44px;
				font-weight: 500;
			}

			&-prize {
				position: relative;
				width: 100%;
				aspect-ratio: 1 / 1;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: -10%;
				.sun {
					position: relative;
					width: 90%;
					aspect-ratio: 1 / 1;
					animation: rotate 30s linear infinite;
				}

				.icon {
					position: absolute;
					top: 50%;
					left: 50%;
					translate: -50% -30%;
					min-width: 120px;
					width: fit-content;
					aspect-ratio: 1 / 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					z-index: 1;
					text-align: center;
					img {
						width: 60%;
						aspect-ratio: 1 / 1;
					}
					p {
						font-size: 56px;
						color: #fff326;
					}
				}

				span {
					position: absolute;
					top: 50%;
					left: 0%;
					translate: 0% -50%;
					display: block;
					width: 50%;
					height: 30px;
					clip-path: polygon(0% 0%, 100% 50%, 100% 50%, 0% 100%);
					transform-origin: 100%;
					background: linear-gradient(90deg, #ffffff00, rgba(#fff, 0.2));

					&:nth-child(2) {
						height: 55px;
						rotate: 35deg;
					}
					&:nth-child(3) {
						height: 60px;
						rotate: -20deg;
					}
					&:nth-child(4) {
						height: 90px;
						rotate: 90deg;
					}
					&:nth-child(5) {
						height: 40px;
						rotate: -45deg;
					}
					&:nth-child(6) {
						height: 40px;
						rotate: -80deg;
					}
					&:nth-child(7) {
						height: 100px;
						rotate: 180deg;
					}
					&:nth-child(8) {
						height: 90px;
						rotate: 130deg;
					}
					&:nth-child(9) {
						height: 80px;
						rotate: 220deg;
					}
					&:nth-child(10) {
						height: 50px;
						rotate: 250deg;
					}
				}
			}
		}
		&_indicator {
			padding: 5px;
			position: absolute;
			bottom: 100%;
			left: 50%;
			translate: -50% 75%;
			width: 60px;
			height: 50px;
			background-color: #fff;

			clip-path: polygon(0 50%, 30% 0, 100% 50%, 30% 100%);
			rotate: 90deg;
			background-color: #f2ec00;
			z-index: 1;

			&::after {
				content: '';
				position: absolute;
				top: 4px;
				left: 4px;
				width: calc(100% - 8px);
				height: calc(100% - 8px);
				clip-path: polygon(0 50%, 30% 0, 100% 50%, 30% 100%);
				background-color: #252762;
				z-index: 1;
			}
		}
		&-wrapper {
			position: relative;
			margin-left: calc(-1 * (100vw - 100%) / 2);
			width: 100vw;
			// height: 162px;
			background-color: #252762;
			overflow: hidden;

			&::before {
				content: '';

				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #f2ec00;
			}
			&::after {
				content: '';

				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: #f2ec00;
			}
		}

		&_button {
			margin: 0 auto;
			width: 50%;
			font-size: 24px;
		}

		&-elems {
			margin-left: calc(-1 * var(--width));
			padding: 15px;
			display: flex;
			width: 100%;
			height: 100%;
			gap: 15px;

			li {
				// padding-top: 5px;
				position: relative;
				min-width: var(--width);
				display: flex;
				justify-content: center;
				aspect-ratio: 1 / 1;

				overflow: hidden;
				width: 100%;
				height: 100%;
				background-color: #4c51f7;
				border-radius: 6px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: column;
				gap: 15px;

				p {
					margin-top: -20px;
					padding: 0.4em 0.4em;
					font-size: 18px;
					background-color: rgba(black, 0.3);
					width: 100%;
					text-align: center;
				}

				img {
					height: 60%;
					aspect-ratio: 1 / 1;
				}
			}
		}
	}

	@keyframes rotate {
		from {
			rotate: 0deg;
		}
		to {
			rotate: 360deg;
		}
	}
</style>
