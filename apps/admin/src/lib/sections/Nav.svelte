<aside class="sidebar">
    <nav class="nav">
        <ul class="nav-list">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/users">Users</a>
            </li>
            <li>
                <a href="/partners">Partners</a>
            </li>
        </ul>
    </nav>
</aside>

<style lang="scss">
    .sidebar {
        position: absolute;
        top: var(--header-height); left: 0;
        width: var(--sidebar-width); 
        height: calc(100% - var(--header-height));
        background-color: var(--section-color);
        padding: 10px;
        z-index: 3;
    }

    .nav {
        &-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
</style>