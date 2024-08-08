<script lang="ts">
    import { page } from "$app/stores";
    import { format } from "date-fns";
    // import { URL } from "svelte/reactivity";

    const { data } = $props();

    let pageSize = $state(15);

    let totalPages = $derived(Math.ceil((data.count as number) / pageSize));
    let currentPage = $derived(
        (Number($page.url.searchParams.get("skip")) || 0) / pageSize,
    );

    // let filtersState = $state<Record<string, "asc" | "desc" | null>>({
    //     coins: null,
    // });

    let filtersUrl = $derived({
        coins: (() => {
            let newURL = new URL($page.url);
            newURL.searchParams.append('filter', 'd')
            return newURL.toString()
        })(),
    });

    $inspect(filtersUrl);
</script>

<svelte:head>
    <title>Admin | Users</title>
</svelte:head>

<section class="users">
    <div class="users-header">
        <h1 class="users_title">Users</h1>
        <div class="users-pagination">
            <a href="#">-10</a>
            <a href="">{"<"}</a>
            <a href="#">{">"}</a>
            <a href="#">+10</a>
        </div>
    </div>

    <table class="users-list">
        <thead>
            <tr>
                <th><a href="#">ID</a></th>
                <th><a href="#">Name</a></th>
                <th><a href="#">Username</a></th>
                <th><a href="#">Premium</a></th>
                <th>
                    <a href={filtersUrl.coins}>Coins</a>
                </th>
                <th><a href="#">Tickets</a></th>
                <th><a href="#">Refs</a></th>
                <th><a href="#">SC</a></th>
                <th><a href="#">FC</a></th>
                <th><a href="#">Created at</a></th>
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
    }
    table td {
        // border-bottom: 1px solid #aaaaaa;
        padding: 5px 10px;
    }
    table tbody td {
        font-size: 16px;
    }
    table tr:nth-child(even) {
        // background: #d0e4f5;
    }
    table thead {
        border-bottom: 2px solid #444444;
    }
    table thead th {
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
        a {
            padding: 5px 10px;
            display: block;
            width: 100%;
        }
        // border-left: 2px solid #d0e4f5;
    }
    table thead th:first-child {
        border-left: none;
    }
</style>
