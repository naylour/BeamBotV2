<script lang="ts">
	import 'styles/index.scss';

	import { user, tg, app } from 'stores';
	import { onMount } from 'svelte';
	import { Loader } from 'components';
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';


	onMount(() => {
		if (
			(!data.isAuth && !data.user) ||
			tg.webapp?.initDataUnsafe.user.username !== data.user?.username
		)
			tg.afterInit(() => user.init(tg.webapp.initData));
		else {
            user.value = data.user as App.User;

            setTimeout(() => app.value.loader.isLoad = true, 600);
        }
        if (user.value?.account.heSeeWelcomeScreen && $page.url.pathname === '/welcome') goto('/');

        else if (user.value?.wallet.spins.length === 0  && $page.url.pathname !== '/lootbox') goto('/lootbox');

        else if (!user.value?.wallet.reward.lastReward) {
            // goto('/daily');
        }
	});

	beforeNavigate((navigate) => {
		if (!app.value.loader.isLoad) navigate.cancel();
        if (!user.value?.account.heSeeWelcomeScreen && navigate.to?.url.pathname === '/welcome') navigate.cancel();
	});

	const { children, data } = $props();

	$inspect(user.value);
    $inspect(tg.value)
</script>

{@render children()}
<div class="bg"></div>
<Loader />
