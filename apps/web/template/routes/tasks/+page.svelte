<section class="tasks">
	<header class="tasks-header">
		<h1 class="tasks_title">Tasks</h1>
		<h2 class="tasks_subtitle">Redeem your reward after<br />each task is completed</h2>
		<img src="/tasks_icon.svg" alt="" />
	</header>

	<div class="tasks-blocks">
		<div class="tasks-block tasks-daily">
			<h3 class="tasks-block_title">Daily Tasks</h3>
			<button type="button" data-done>
                <img src="/tg.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
			<button type="button">
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
		</div>
		<div class="tasks-block tasks-general">
			<h3 class="tasks-block_title">General Tasks</h3>
			<button type="button">
                <img src="/tg.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
			<button type="button">
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
			<button type="button">
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
			<button type="button" data-done>
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
		</div>
		<div class="tasks-block tasks-partners">
			<h3 class="tasks-block_title">Partners</h3>
			<button type="button" data-done>
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
			<button type="button">
                <img src="/x.svg" alt="">
                <div>
                    <span>Follow our telegram channel</span>
                    <span>+35k coins</span>
                </div>
                <img src="/arrow.svg" alt="">
            </button>
		</div>
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
            padding-top: 5px;

			display: flex;
			flex-direction: column;
			align-items: start;
			gap: 40px;
		}

		&-block {
			display: flex;
			flex-direction: column;
			gap: 5px;
			width: 100%;
            padding: 0 5px;
			&_title {
                margin-left: 16px;
				font-size: 15px;
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
                    background-color: #CECECE;
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
