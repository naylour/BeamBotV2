<script lang="ts">
	import { formatNumber } from '@repo/utils/number';

	import { Spinner } from 'components';
</script>

<section class="spin">
	<header class="spin-header">
		<h1 class="spin_title">Lucky spin</h1>
		<h3 class="spin_subtitle">Spin the wheel and test your luck! 🍀</h3>
	</header>
	
    <div class="spin-main">
        <Spinner />
    </div>

	<footer class="spin-footer recent">
		<h2 class="recent_title">Recent wins!</h2>

		<div class="recent-list--wrapper">
			<ul class="recent-list">
				{#each { length: 10 } as _}
                <li class="recent-list-item" style:--color={"#"+((1<<24)*Math.random()|0).toString(16)}>
					<div>
                        <p class="recent_icon">NE</p>
                        <img src="/ticket.png" alt="" />
                    </div>
					<p class="recent_user">NeatDeveloper</p>
					<p class="recent_amount">{formatNumber(100000)}</p>
				</li>
                {/each}
			</ul>
		</div>
	</footer>
</section>

<style lang="scss">
	.spin {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		width: 100%;

		&_title {
			font-size: 30px;
			font-weight: 400;
		}

		&_subtitle {
			font-size: 20px;
			font-weight: 400;
		}

		&-header {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 20px;
		}

		.recent {
            &_title {
                margin-bottom: 20px;
                text-align: center;
                font-weight: 500;
            }
			&-list {
				&--wrapper {
                    padding: 10px;
                    background-color: rgba(#252762, 1);
                    border-radius: 6px;
                }
                border-radius: 6px;
				display: flex;
				justify-content: space-between;
				gap: 10px;
				overflow-x: scroll;

				&-item {
                    user-select: none;
					min-width: calc(100% / 3 - 10px * 2);
					border-radius: 6px;
					padding: 5px;
					background-color: #4c51f7;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    overflow: hidden;
                    text-align: center;
                    div {
                        display: flex;
                        gap: 10px;
                    }
					img {
						width: 30px;
					}
				}
			}

            &_icon {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--color);
                width: 30px; height: 30px;
                border-radius: 50%;
            }

			&_user {
				overflow: hidden;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;
                font-size: 12px;
			}

            &_amount {
                margin-bottom: -5px;
                padding: 0.4em;
                display: block;
                width: calc(100% + 10px);
                background-color: rgba(black, .3);
            }
		}
	}
</style>
