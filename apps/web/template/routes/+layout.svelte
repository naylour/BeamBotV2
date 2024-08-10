<script lang="ts">
	import 'styles/index.scss';

	import { user, tg, app } from 'stores';
	import { onMount } from 'svelte';
	import { Loader } from 'components';
	import { beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';

	// function isMoreThan24HoursAgo(date: Date, dayCount = 1): boolean {
	// 	// Текущая дата и время
	// 	const now = new Date();

	// 	// Разница во времени в миллисекундах
	// 	const diffInMillis = now.getTime() - date.getTime();

	// 	// Переводим миллисекунды в часы
	// 	const diffInHours = diffInMillis / (1000 * 60 * 60);

	// 	// Проверяем, прошло ли более 24 часов
	// 	return diffInHours > 24 * dayCount;
	// }

	// onMount(() => {
	// 	if (
	// 		(!data.isAuth && !data.user) ||
	// 		tg.webapp?.initDataUnsafe.user.username !== data.user?.username
	// 	)
	// 		tg.afterInit(() => user.init({
    //             initData: tg.webapp.initData,
    //             initDataUnsafe: tg.webapp.initDataUnsafe,
    //         }));
	// 	else {
	// 		user.value = data.user as App.User;

	// 		setTimeout(() => (app.value.loader.isLoad = true), 1000);
	// 	}
	// 	if (user.value?.account.heSeeWelcomeScreen && $page.url.pathname === '/welcome') goto('/');
	// 	else if (!user.value?.wallet?.reward.lastReward || isMoreThan24HoursAgo(new Date(user.value?.wallet.reward.lastReward))) {
	// 		goto('/daily');
	// 	};
	// });

	// beforeNavigate((navigate) => {
    //     // if(user.value?.wallet.spins?.length == 0 && $page.url.pathname !== '/lootbox') goto('/lootbox');
	// 	if (!user.value?.account.heSeeWelcomeScreen && navigate.to?.url.pathname === '/welcome')
	// 		navigate.cancel();
	// });

	const { children, data } = $props();

	// $inspect(user.value);
	// $inspect(tg.value);
</script>

{@render children()}
<!-- {#if app.value.loader.isLoad}
<div class="bg"></div>
{/if}
<Loader /> -->
