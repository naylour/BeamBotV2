<script lang="ts">
	import { dev } from '$app/environment';
	import Button from './Button.svelte';

	let claimInterval = $state<ReturnType<typeof setInterval>>();
	let farmDate = $state<Date>();

	const calculateDateDifferenceInSeconds = (pastDate: Date): number => {
		const currentDate = new Date();
		const differenceInMillis = currentDate.getTime() - pastDate.getTime();
		const differenceInSeconds = Math.floor(differenceInMillis / 1000);
		return differenceInSeconds;
	};
	const formatSeconds = (seconds: number): string => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);

		return `${hours}h ${minutes}m`;
	};

	const peerASecond = 0.01;
	const totalSeconds = 8 * 60 * 60;

	let current = $state(calculateDateDifferenceInSeconds(farmDate || new Date()) * peerASecond);

	let leftSeconds = $state(0);

	let status = $state<'start' | 'process' | 'claim'>('start');

	const start = () => {
		status = 'process';

		farmDate = new Date();

		leftSeconds = calculateDateDifferenceInSeconds(farmDate || new Date());

		claimInterval = setInterval(() => {
			if (leftSeconds < totalSeconds) {
				current += 0.01;
				leftSeconds += 1;
			} else {
				status = 'claim';
			}
		}, 1);
	};

	const claim = () => {
		status = 'start';
		current = 0;
		farmDate = undefined;

		claimInterval && clearInterval(claimInterval);
	};
</script>

<div class="farm">
	<img src="./tasks_icon.svg" alt="" />
	{#if status === 'start'}
    <Button onclick={start}>Start farm</Button>
	{:else if status === 'process'}
		<div class="farm-header">
			Farming: <b>{current.toFixed(2)}</b>
		</div>
		<div class="farm-loader">
			<div
				class="farm-loader_indicator"
				style:--process={`${(leftSeconds * 100) / totalSeconds}%`}
			></div>
			<div class="farm-loader_leftTime">{formatSeconds(totalSeconds - leftSeconds)}</div>
		</div>
	{:else if status === 'claim'}
		<div class="farm-claim">Claim: {current.toFixed(2)}</div>
        <Button onclick={claim}>Claim</Button>
	{/if}
</div>

<style lang="scss">
	.farm {
		position: relative;
		margin-top: 20px;
		height: 88px;
		background-color: rgba(#2a2d88, 0.65);
		backdrop-filter: blur(5px);
		border-radius: 8px;
		border: 1px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 15px;
		overflow: hidden;

		img {
			position: absolute;
			top: 0;
			left: -20px;
			width: 100px;
			rotate: -45deg;
			opacity: 0.2;
		}

		button {
			padding: 5px 20px;
		}

		&-loader {
			position: relative;
			padding: 4px;
			height: 20px;
			background-color: #100f41;
			width: 80%;
			overflow: hidden;
			border-radius: 2px;
			clip-path: polygon(0 0, 100% 0, 98% 100%, 0% 100%);

			&_indicator {
				position: absolute;
				top: 50%;
				left: 4px;
				translate: 0 -50%;
				background-color: #fcb500;
				height: 14px;
				width: calc(var(--process) - 8px);
				border-radius: 2px;
				clip-path: polygon(0 0, 100% 0, 99% 100%, 0% 100%);
			}
			&_leftTime {
				position: absolute;
				top: 50%;
				left: 50%;
				translate: -50% -50%;
				font-size: 12px;
			}
		}
	}
</style>
