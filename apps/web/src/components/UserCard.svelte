<script lang="ts">
	import { user } from 'stores';
	import Link from './Link.svelte';
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="user">
    <Link href="/daily">
        <img src="./user.svg" alt={ user.value?.username } class="user_avatar">

        <div class="user-data">
            <p class="user_username">{ user.value?.username || 'Anonimus' }</p>
            <p class="user_level">Day: { user.value?.account.reward.day || 0 }</p>
        </div></Link>
</div>

<style lang="scss">
    .user {
        user-select: none;
        position: relative;
        padding: 10px 25px 10px 10px;
        
        width: fit-content;
        background: #878AFA;
        clip-path: polygon(5% 2%, 95% 12%, 95% 90%, 2% 95%);
        width: 50%;
        height: 70px;

        :global(.link img) {
            margin-left: -2px;
        }
        :global(.link) {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        &::before {
            content: '';
            position: absolute;
            top: 50%; left: 50%;
            translate: -50% -50%;
            width: 90%; height: 75%;
            background-color: #040D55;
            clip-path: polygon(2% 0, 95% 5%, 98% 98%, 10% 100%);
            z-index: -1;
        }

        &-data {
            display: flex;
            flex-direction: column;
            gap: 6px;

            font-size: 15px;
        }

        &_username {
            overflow: hidden;
            width: 9ch;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>