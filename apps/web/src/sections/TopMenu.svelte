<script lang="ts">
	import { Link } from 'components';
	import { user, tg } from 'stores';

	import { formatNumber, formatWithSpaces } from '@repo/utils/number'
</script>

<section class="menu">
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<ul class="menu-list">
		<li
			class="menu-item"
			style:--color="#FFF326"
			onclick={() => {
				tg.webapp.showAlert(`You have a ${formatWithSpaces(user.value?.wallet.coins || 0)} coins!`);
			}}
		>
			<div class="menu-item_content">
				<img
					width="256"
					height="256"
					src="./coin.svg"
					alt={`Coins: ${user.value?.wallet.coins || 0}`}
				/>
				{formatNumber(user.value?.wallet.coins || 0)}
			</div>
			<span class="menu-item_label">Coins</span>
		</li>
		<li class="menu-item" style:--color="#009BF2">
			<Link href="/reffers">
				<div class="menu-item_content">
					<img
						width="256"
						height="256"
						src="./frens.svg"
						alt={`Frens: ${user.value?.account._count.reffers || 0}`}
					/>
					{user.value?.account._count.reffers || 0}
				</div>
				<span class="menu-item_label">Friends</span>
			</Link>
		</li>
		<li
			class="menu-item"
			style:--color="#1DD788"
			onclick={() => {
				tg.webapp.showAlert(`You have a ${formatWithSpaces(user.value?.wallet.tickets || 0)} tickets!`);
			}}
		>
			<div class="menu-item_content">
				<img
					width="256"
					height="256"
					src="./ticket.svg"
					alt={`Tickets: ${user.value?.wallet.tickets || 0}`}
				/>
				{formatNumber(user.value?.wallet.tickets || 0)}
			</div>
			<span class="menu-item_label">Tickets</span>
		</li>
	</ul>
</section>

<style lang="scss">
	.menu {
		// padding-top: 20px;

		&-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10px;
		}

		&-item {
            user-select: none;
			position: relative;
			padding: 5px 0 0;
			aspect-ratio: 1 / 1.3;
			backdrop-filter: blur(5px);
			-webkit-backdrop-filter: blur(5px);
			background: linear-gradient(rgba(#fff, 0.2), rgba(#000, 0.2));
			border: 1px solid black;
			border-radius: 8px;
			font-size: 20px;
			overflow: hidden;

			&,
			:global(.link) {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-between;
				gap: 10px;
			}

			:global(.link) {
				width: 100%;
				height: 100%;
			}

			&_content {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				// gap: 10px;
				height: 55%;
				color: var(--color);
				text-shadow: 0px 0px 1px #000;

				img {
					width: 60px !important;
					height: 60px;
				}
			}

			&_label {
				padding-top: 5px;
				position: relative;
				height: 40%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 16px;
				vertical-align: baseline;
				width: 100%;
				background-color: #1d1d1d;
				clip-path: polygon(0% 20%, 100% 0%, 100% 100%, 0 100%);

				&::before {
					content: '';
					position: absolute;
					top: 3px;
					left: 0;
					rotate: -4.5deg;
					width: 100%;
					height: 4px;
					background-color: var(--color);
				}
			}
		}
	}
</style>
