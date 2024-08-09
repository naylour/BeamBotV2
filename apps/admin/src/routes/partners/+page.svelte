<script lang="ts">
    const { data } = $props();

    // data.partners[0].
</script>

<svelte:head>
    <title>Admin | Partners</title>
</svelte:head>

<section class="partners">
    <div class="partners-header">
        <h2 class="partners_title">Partners</h2>
    </div>
    <table class="users-list">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>User count</th>
                <th>Invite Link</th>
            </tr>
        </thead>
        <tbody>
            {#each data.partners as partner(partner.id)}
                <tr>
                    <td>{ partner.id }</td>
                    <td>{ partner.name }</td>
                    <td>{ partner._count.users }</td>
                    <td onclick={() => {
                        navigator.clipboard.writeText(`https://t.me/BeamTapBot/Dapp?startapp=PaRtNeR${partner.inviteCode}`);
                        alert('Скопировано!');
                    }}>{`https://t.me/BeamTapBot/Dapp?startapp=PaRtNeR${partner.inviteCode}`}</td>
                </tr>
            {/each}
        </tbody>
    </table>

</section>

<!-- ns1.pq.hosting. ns2.pq.hosting. -->

<style lang="scss">
    .partners {
        overflow-y: scroll;
        height: 100%;
    }
    table {
        width: 100%;
        text-align: left;
        border-collapse: separate;
        border-spacing: 5px;

        th,
        td {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:nth-child(1) {
                width: 2ch;
            }
            &:nth-child(2) {
                max-width: 10ch;
                min-width: 10ch;
                width: 10ch;
            }
            &:nth-child(3) {
                min-width: 8ch;
                max-width: 8ch;
                width: 8ch;
            }
            &:nth-child(4) {
                cursor: pointer;
                width: 7ch;
            }
        }
        tbody td {
            font-size: 16px;
            padding: 5px 10px;
        }
        thead {
            border-bottom: 2px solid #444444;
            th {
                background: var(--primary-color);
                border-radius: 8px;
                font-size: 16px;
                font-family:
                    system-ui,
                    -apple-system,
                    BlinkMacSystemFont,
                    "Segoe UI",
                    Roboto,
                    Oxygen,
                    Ubuntu,
                    Cantarell,
                    "Open Sans",
                    "Helvetica Neue",
                    sans-serif;
                font-weight: 600;
                color: #ffffff;
                padding: 5px 10px;
                // border-left: 2px solid #d0e4f5;

                &:first-child {
                    border-left: none;
                }
            }
        }
    }
</style>
