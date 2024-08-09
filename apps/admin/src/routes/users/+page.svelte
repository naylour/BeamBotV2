<script lang="ts">
    import { page } from "$app/stores";
    import { format } from "date-fns";

    const { data } = $props();

    let limit = $derived(+($page.url.searchParams.get("l") || 15));
    let skip = $derived(+($page.url.searchParams.get("s") || 0));

    let nextStepUrl = $state(`#`);
    let prevStepUrl = $state(`#`);

    $effect(() => {
        $page.url;

        let newURL = new URL($page.url);

        newURL.searchParams.set("l", `${limit}`);

        newURL.searchParams.set(
            "s",
            `${skip + limit > Math.ceil(data.count / limit) ? Math.ceil(data.count / limit) : skip + limit}`,
        );
        prevStepUrl = newURL.href;

        newURL.searchParams.set("s", `${skip - limit < 0 ? 0 : skip - limit}`);
        nextStepUrl = newURL.href;
    });
</script>

<svelte:head>
    <title>Admin | Users</title>
</svelte:head>

<section class="users">
    <div class="users-header">
        <h1 class="users_title">Users</h1>
        <div class="users-pagination">
            <a href={nextStepUrl}>{"<"}</a>
            <a href={prevStepUrl}>{">"}</a>
        </div>
    </div>

    <table class="users-list">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Premium</th>
                <th>Coins</th>
                <th>Tickets</th>
                <th>Refs</th>
                <th>Spins Count</th>
                <th>Farm Count</th>
                <th>Created at</th>
            </tr>
        </thead>
        <tbody>
            {#each data?.users as user (user.id)}
                <tr>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.username}</td>
                    <td>{user.isPremium}</td>
                    <td>{user.wallet?.coins}</td>
                    <td>{user.wallet?.tickets}</td>
                    <td>{user.account?._count.reffers}</td>
                    <td>{user.wallet?._count.spins}</td>
                    <td>{user.wallet?._count.farms}</td>
                    <td>{format(user.createdAt, "yyyy-MM-dd HH:mm")}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<style lang="scss">
    .users {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 5px;
            margin-bottom: 20px;
        }
        &-list {
            width: 100%;
            // border: 1px solid red;
        }
        &-pagination {
            display: flex;
            gap: 10px;

            a {
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                width: 40px;
                font-weight: 500;
                aspect-ratio: 1.5 / 1;
                background-color: var(--primary-color);
            }
        }
    }
    table {
        // border: 1px solid #1c6ea4;
        // background-color: #eeeeee;
        width: 100%;
        text-align: left;
        border-collapse: separate;
        border-spacing: 5px;
        overflow-x: scroll;

        th,
        td {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:nth-child(1) {
                width: 12ch;
            }
            &:nth-child(2),
            &:nth-child(3) {
                min-width: 180px;
                max-width: 180px;
                width: 180px;
            }
            &:nth-child(4) {
                width: 7ch;
            }
            &:nth-child(5) {
                width: 150px;
            }
            &:nth-child(6) {
                width: 150px;
            }
            &:nth-child(7) {
                width: 100px;
            }
            &:nth-child(8) {
                width: 100px;
            }
            &:nth-child(9) {
                width: 100px;
            }
            &:nth-child(10) {
                width: 100px;
            }
        }
        tbody td {
            font-size: 16px;
        }
        td {
            // border-bottom: 1px solid #aaaaaa;
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
