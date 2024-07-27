<script lang="ts">
	import { onMount } from 'svelte';
    import { tg, user } from 'stores';

	const { data } = $props();

	const 
        invite = () => {
            let url = `https://t.me/BeamBotDevRobot/?start=${user.value?.account.inviteCode}`;
            let shareText = `Earn with me on BeamBot 🤩\nJoin now and claim your coin bonus!`;

            tg.webapp.openTelegramLink(
                'https://t.me/share/url?url=' +
                    encodeURIComponent(url) +
                    '&text=' +
                    encodeURIComponent(shareText)
            );
        },
        copy = () => {
            navigator.clipboard.writeText(`https://t.me/BeamBotDevRobot/?start=${user.value?.account.inviteCode}`);
            tg.webapp.showAlert('Referral link copied!')
        };

	onMount(() => {
		console.log(window.Telegram);
	});

	$inspect(data);
</script>

<main class="reffers">
	<header class="reffers-header">
		<h1 class="reffers_title">Invite friends<br /> and get more rewards</h1>

		<img class="reffers_img" src="/reffers_beam.svg" alt="" />
	</header>

	<section class="reffers-main">
		<p class="reffers_count">
			{data.user?.account._count.reffers} Friend{(data?.reffers.length || 0) > 1 ? 's' : ''}
		</p>
		<ul
			class="reffers-list"
			data-count={data.user?.account._count.reffers}
			data-text={(data.user?.account._count.reffers || 0) > 1 ? 'Friends' : 'Friend'}
		>
			{#if data.reffers}
				{#each data.reffers as reffer, i (i)}
					<li class="reffers-item">
                        <div>
                            <span style:--color={"#"+((1<<24)*Math.random()|0).toString(16)}>{ reffer.User?.username?.slice(0, 2) }</span>
						<p>{reffer.User?.username}</p>
                        </div>
						<p>+{reffer.earnedCoins}</p>
					</li>
				{/each}
			{/if}
		</ul>
	</section>

	<footer class="reffers-footer">
		<button type="button" onclick={invite}>Invite friends <img src="./send.svg" alt="" /></button>
		<button type="button" onclick={copy}><img src="./copy.svg" alt="" /></button>
	</footer>
</main>

<style lang="scss">
	.reffers {
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: space-between;
		height: 100%;
		gap: 20px;

        &_img {
            width: 200px !important;
            aspect-ratio: 1 / 1;
            object-fit: contain;
        }

		&-header {
			display: flex;
			align-items: center;
			flex-direction: column;
            gap: 15px;
		}

		&_count {
			padding-bottom: 5px;
			font-size: 27px;
			text-shadow: 0 0 3px black;
		}

		&-main {
			width: 100%;
		}

		&-footer {
            // padding-top: 10px;
			width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;

            button:first-child {
                width: 100%;
            }
		}

		&_title {
			font-weight: 400;
			font-size: 26px;
			text-align: center;
		}

		&_img {
			margin: 0 auto;
			aspect-ratio: 1 / 1;
			width: 200px;
		}

        &_count {
            margin-top: -30px;
            font-size: 18px;
        }

		&-item {
			font-size: 18px;
			display: flex;
			align-items: center;
			justify-content: space-between;
            text-align-last: left;

            div {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            span {
                display: block;
                width: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                aspect-ratio: 1 / 1;
                background-color: var(--color);
                text-transform: uppercase;
            }

			&:not(:last-child) {
				padding-bottom: 18px;
			}
		}

		&-list {
            // margin-top: -30px;
			position: relative;
			padding: 18px 20px;
			width: 100%;
			background: linear-gradient(120deg, rgba(#4E4E4E, 0.2), #0C2087);
			backdrop-filter: blur(40px);
			border-radius: 8px;
			min-height: calc(31px + 20px * 2);
			max-height: calc(31px * 4 + 18px * 3 + 18px * 2);
			overflow-y: scroll;
			display: flex;
			flex-direction: column;
		}
	}
</style>
