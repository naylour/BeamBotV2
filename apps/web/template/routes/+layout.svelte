<script lang="ts">
	import 'styles/index.scss';

	import { user, tg, app } from 'stores';
	import { onMount } from 'svelte';
	import { Loader } from 'components';
	import { beforeNavigate } from '$app/navigation';


	onMount(() => {
		if (
			(!data.isAuth && !data.user) ||
			tg.webapp?.initDataUnsafe.user.username !== data.user?.username
		)
			tg.afterInit(() => user.init(tg.webapp.initData));
		else {
            user.value = data.user as App.User;

            setTimeout(() => app.value.loader.isLoad = true, 1000);
        }
	});

	beforeNavigate((navigate) => {
		if (!app.value.loader.isLoad) navigate.cancel();
	});

	const { children, data } = $props();

	$inspect(user.value);
</script>

{@render children()}
<div class="bg"></div>
<Loader />
