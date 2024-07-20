<script lang="ts">
	import type { LayoutData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';

	export let data: LayoutData;

	$: ({ user } = data);
</script>

<header class="fixed z-40 w-full bg-background px-[10vw] py-4 text-foreground">
	<nav
		class="my-2 flex w-full items-center justify-between rounded-full bg-primary px-6 py-2 text-primary-foreground"
	>
		<div>
			<a href="/fr/app" class="text-xl font-semibold"> SO </a>
		</div>
		<ul class="flex items-center gap-6">
			<li>
				<a href="/fr/host/pricing">Tarifs</a>
			</li>
			<li>
				<a href="/fr/host/new/{user?.id}">Commencer</a>
			</li>
		</ul>

		<div class="rounded-full bg-background text-foreground">
			<AccountDrop
				avatar={user?.avatar}
				collectionId={user?.collectionId}
				name={user?.name}
				userId={user?.id}
				lastname={user?.lastname}
			/>
		</div>
	</nav>
</header>

<main class="pt-[100px]">
	<slot />
</main>
