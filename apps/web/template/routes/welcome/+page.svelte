<script lang="ts">
	import { Button } from 'components';
	import { user } from 'stores';
	import Checker from './Checker.svelte';
	import { formatWithSpaces, getRandom } from '@repo/utils/number';
	import { goto } from '$app/navigation';

	let step = $state(0);
	let progress = $state<number[]>([0, 0, 0, 0]);

    $effect(() => {
        if(progress.reduce((elem, sum) => sum + elem, 0) / progress.length === 100) setTimeout(() => { step = 2 }, 1000);
    });
</script>

<section class="welcome">
	{#if step === 0}
        <img class="welcome_image" src="/coin_large.png" alt="Loading..." />

		<div class="welcome-content">
			<p>Hey {user.value?.username || 'Anonimus'}!</p>

			<p>Welcome to a galaxy far, far away.</p>

			<p>Here, memes are money and HODLing is a lifestyle.</p>

			<p>It’s time to build your fortune💰</p>
		</div>

		<Button
			class="welcome_button"
			onclick={() => {
				step++;
			}}
		>
			Blast off!
		</Button>
	{:else if step === 1}
        <h2 class="welcome_title">Let's see if you've got the skills<br />to unlock some extra bonuses!</h2>

		<div class="welcome-content">
			<div class="welcome-checks">
				<Checker bind:progress={progress[0]} title="Account Age Check!"></Checker>
				<Checker bind:progress={progress[1]} title="Telegram Premium Check!"></Checker>
				<Checker bind:progress={progress[2]} title="OG Status Check!"></Checker>
				<Checker bind:progress={progress[3]} title="Harvesting daily rewards!"></Checker>
			</div>
		</div>
        <div class="welcome-loader">
            <img class="welcome-loader_image" src="/coin_large.png" alt="">
            <div
                class="welcome-loader-progress"
                style:--progress={`${progress.reduce((elem, sum) => sum + elem, 0) / progress.length}%`}
            ></div>
            <p>Loading...</p>
        </div>
    {:else if step === 2}
        <h2 class="welcome_title">Congrats you've made it this far! Here’s your reward!</h2>

        <div class="welcome-content">
            <div class="claim_balance">
                <img class="claim_icon" src="/coin.png" alt="">
                <p>{formatWithSpaces(user.value?.wallet.coins || 0)}</p>
            </div>
        </div>

        <p class="claim_text">
            You are amongs the {getRandom(.4, 40)}% of lucky ones to get the higest
            reward possible
            share with your friends to see if they are lucky as you 👀
        </p>

        <Button onclick={async () => {
            const response = await fetch('/welcome', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if(response.status === 200) {
                (user.value as App.User).account.heSeeWelcomeScreen = true;
                goto('/lootbox');
            }
        }}>Continue</Button>
	{/if}
</section>

<style lang="scss">
	.welcome {
		height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;

        &_title {
            text-align: center;
            font-size: 24px;
            font-weight: 400;
        }
        &_subtitle {
            font-size: 20px;
            font-weight: 400;
        }

        .claim {
            &_text {
                text-align: center;
                color: #DADADA;
                text-shadow: 1px 1px 1px black;
            }
            &_icon {
                width: 70px;
            }
            &_balance {
                display: flex;
                align-items: center;
                gap: 10px;
                
                p {
                    font-size: 56px;
                }
            }
        }

		&_image {
			width: 150px;
		}

        &-loader {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            p {
                font-size: 20px;
            }
            &_image {
                width: 60px;
            }

			&-progress {
				position: relative;
				width: 80%;
				height: 20px;
				background-color: rgba(#100f41, 0.8);
				border-radius: 4px;
				clip-path: polygon(0% 5%, 100% 0%, 95% 100%, 0% 100%);
				overflow: hidden;

				&::after {
					content: '';

					position: absolute;
					top: 4px;
					left: 4px;
					width: calc(var(--progress) - 10px);
					height: calc(100% - 8px);
					background-color: #0fa4f9;
					clip-path: polygon(0% 5%, 100% 0%, 96% 100%, 0% 100%);
				}
			}
        }

		&-checks {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&-content {
			margin-top: -10%;
			padding: 40px 20px;
			position: relative;
			background-color: #878afa;
			clip-path: polygon(0 5%, 100% 10%, 100% 95%, 0% 100%);
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			gap: 20px;
			width: 100%;

			p {
				font-size: 20px;
			}

			&::after {
				content: '';

				clip-path: polygon(0 5%, 100% 15%, 100% 90%, 0% 100%);
				position: absolute;
				top: 10px;
				left: 10px;
				width: calc(100% - 20px);
				height: calc(100% - 20px);
				background-color: #2a2d88;
				z-index: -1;
			}
		}

		:global(.welcome_button) {
			text-transform: uppercase;
		}
	}
</style>
