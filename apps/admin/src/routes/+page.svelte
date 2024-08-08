<script lang="ts">
    import { formatNumber } from "@repo/utils/number";

    const { data } = $props();
</script>

<svelte:head>
    <title>Admin | Home</title>
</svelte:head>

<section class="home">
    <section class="stat">
        <h2>Statistic</h2>
        <ul class="stat-list">
            <li class="stat-elem daily-users">
                <p>Daily New Users</p>
                <p>{data.stat.lastCreatedUsersCount}</p>
            </li>
            <li class="stat-elem daily-users">
                <p>Reffered users</p>
                <p>{data.stat.refferedUsersCount}</p>
            </li>
            <li class="stat-elem daily-users">
                <a href="/users">
                    <p>Total Wallet</p>
                    <p>
                        {formatNumber(data.stat.totalWallet._sum.coins || 0)} /
                        {formatNumber(data.stat.totalWallet._sum.tickets || 0,)}
                    </p>
                </a>
            </li>
            <li class="stat-elem daily-users">
                <a href="/partners">
                    <p>Invited by partners</p>
                    <p>{data.stat.invitedByPartners}</p>
                </a>
            </li>
        </ul>
    </section>
</section>

<style lang="scss">
    $color: lighten(#17B1EA, 0%);
    .stat {
        &-list {
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            justify-content: space-between;
        }
        &-elem {
            padding: 20px;
            border-radius: 12px;
            background-color: var(--section-color);
            border: 1px solid transparent;

            &:has(a):hover {
                box-shadow: 0 0 5px 1px rgba(black, .2);
            }

            &,
            a {
                display: flex;
                flex-direction: column;
                gap: 10px;

                p {
                    &:last-child {
                        font-size: 24px;
                        font-weight: 600;
                        color: $color;
                    }
                }
            }
        }
    }
</style>
