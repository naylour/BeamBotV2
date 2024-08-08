<script lang="ts">
    import { Link } from 'components';
	import { tg } from '../../lib/stores';
</script>

<section class="menu">
    <ul class="menu-list">
        <li class="menu-item">
            <Link class="menu_link" href="/tasks">
                <img width="50px" height="50px" src="/tasks.svg" alt="">
                Tasks
            </Link>
        </li>
        <li class="menu-item">
            <Link class="menu_link" href="/lootbox">
                <img width="50px" height="50px" src="/lootbox.svg" alt="">
                Lootbox
            </Link>
        </li>
        <li class="menu-item">
            <Link class="menu_link" href="/shop" onclick={__event__ => {
                __event__.preventDefault();
                tg.webapp.showAlert('Coming soon...')
            }}>
                <img width="50px" height="50px" src="/shop.svg" alt="">
                Shop
            </Link>
        </li>
        <li class="menu-item">
            <Link class="menu_link" href="/treasury" onclick={__event__ => {
                __event__.preventDefault();
                tg.webapp.showAlert('Coming soon...')
            }}>
                <img width="50px" height="50px" src="/treasury.svg" alt="">
                Treasury
            </Link>
        </li>
    </ul>
</section>

<style lang="scss">
    .menu {
        position: relative;
        margin-top: 30px;
        padding: 10px;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        border-radius: 8px;
        overflow: hidden;
        
        &::before {
            background: linear-gradient(120deg, rgba(#4E4E4E, 0.2), #0C2087);
            // background-color: darken(#0029FF, 0%);
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            opacity: 1;
            z-index: -1000;
        }

        &-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            gap: 10px;
        }

        &-item {
            position: relative;
            border: 1px solid black;
            border-radius: 8px;
            background: linear-gradient(120deg, rgba(#4E4E4E, .2), rgba(#000000, .2));
            overflow: hidden;

            :global(.menu_link) {
                padding: 5px;
                height: 60px;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                align-items: end;
                gap: 5px;
                font-size: 18px;
                box-shadow: 1px 1px 2px black;
                text-align: right;
            }

            :global(.menu_link img) {
                // width: auto;
                height: 100%;
                aspect-ratio: 1 / 1;
                object-fit: contain;
            }

            &::before {
                content: '';
                position: absolute;
                top: -135%; right: 0%;
                width: 180%;
                border-radius: 50%;
                aspect-ratio: 2 / 1;
                background-color: #fff;
                opacity: .1;
                z-index: -1;
            }
        }
    }
</style>