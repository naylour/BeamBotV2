<script lang="ts">
	import { user } from 'stores';
	import { Button } from 'components';
	import { goto } from '$app/navigation';
	import UserCard from '../../../src/components/UserCard.svelte';

    const { data } = $props();
</script>

<section class="daily">
	<header class="daily-header">
		<img src="/daily.svg" alt="" />
		<div class="daily_streak">{data.reward?.day} Day streak</div>
	</header>

	<div class="daily-prizes">
		<div class="daily-prize">
			<img src="/coin.svg" alt="" />
			<div class="daily-prize-amount">
				<span>{data.reward?.coinsCount}</span>
				<span>Coins</span>
			</div>
		</div>
		<div class="daily-prize">
			<img src="/ticket.svg" alt="" />
			<div class="daily-prize-amount">
				<span>{data.reward?.ticketCount}</span>
				<span>Tickets</span>
			</div>
		</div>
	</div>

	<footer class="daily-footer">
		<p class="daily_text">
            Come back tomorrow for more!
		</p>

		<Button class="daily_button" onclick={() => { 
            (user.value as App.User).wallet = {
                ...data.wallet,
                reward: data.reward
            };
            goto('/');
        }}>Continue</Button>
	</footer>
</section>

<style lang="scss">
	.daily {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		// gap: 20px;
		height: 100%;

		&-header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 30px;

			img {
				width: 80%;
			}
		}

		&-footer {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
			width: 100%;
			text-align: center;
		}

		:global(.daily_button) {
			margin-bottom: 20%;
			width: 80%;
			padding: 10px 20px;
		}

		&_streak {
			font-size: 36px;
			font-weight: 400;
		}

		&-prizes {
			margin-top: 20px;
			width: 100%;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 10%;
		}

		&_text {
			color: #fff;
            font-size: 18px;
            text-shadow: 1px 1px 1px black;
		}

		&-prize {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 10px;
			padding: 20px;
			border-radius: 8px;
			aspect-ratio: 1 / 1;
			background: linear-gradient(120deg, rgba(#4e4e4e, 0.2), #0c2087);
			backdrop-filter: blur(5px);
			overflow: hidden;
			img {
				margin-top: -10px;
				width: 70%;
				object-fit: cover;
			}
			&-amount {
				// margin-top: -10px;
				display: flex;
				flex-direction: column;
				align-items: center;

				span {
					&:first-child {
						font-size: 26px;
					}
				}
			}
		}
	}
</style>
