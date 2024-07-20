<script lang="ts">
	import Theme from '$lib/components/own/Theme.svelte';
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { onNavigate } from '$app/navigation';
	import { Toaster } from 'svelte-sonner';
	import { isDesktop } from '$lib/store';

	export let data: LayoutData;

	const navItems = [
		{
			url: `/fr/host/new/${data.user?.id}/house`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
			title: 'Maisons'
		},
		{
			url: `/fr/host/new/${data.user?.id}/apartment`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
			title: 'Appartements'
		},

		{
			url: `/fr/host/new/${data.user?.id}/land`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>`,
			title: 'Terrains'
		},
		{
			url: `/fr/host/new/${data.user?.id}/store`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`,
			title: 'Magasins'
		},

		{
			url: `/fr/host/new/${data.user?.id}/office`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>`,
			title: 'Burreaux'
		},

		{
			url: `/fr/host/new/${data.user?.id}/local`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
			title: 'locaux'
		}
	];
</script>

<Toaster position={$isDesktop ? 'bottom-right' : 'top-center'} richColors />
<header class="fixed z-40 w-full border-b border-input bg-background">
	<nav class="flex items-center justify-between px-[3vw] py-2">
		<div>
			<a href="/fr/app" class="text-2xl font-semibold"> SO </a>
		</div>
		<ul class="flex items-center gap-4">
			<li>
				<AccountDrop
					name={data.user?.name}
					lastname={data.user?.lastname}
					userId={data.user?.id}
					avatar={data.user?.avatar}
					collectionId={data.user?.collectionId}
				/>
			</li>
		</ul>
	</nav>
</header>
<div class=" title flex items-center justify-center pt-[7rem]">
	<div class="">
		<h1 class="text-4xl">Poster une annonce sur SO</h1>
		<p class="mt-1">
			Le tableau nº 1 pour la recherche et de l'annonce dans le domaine de l'immobilier
		</p>
	</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card-container relative mt-8 flex w-full items-center justify-center gap-3">
	{#each navItems as item}
		<Button
			href={item.url}
			size="sm"
			variant={$page.url.pathname === item.url ? 'default' : 'ghost'}
			class="rounded-full border border-input "
		>
			<span class="pointer-events-none mr-4">
				{@html item.icon}
			</span>
			<span class="pointer-events-none">
				{item.title}
			</span>
		</Button>
	{/each}
	<!-- <div bind:this={slideEl} class="h-full absolute rounded-full bg-primary w-[50px] z-[-1]"> 

	</div> -->
</div>

<main class="px-[3vw]">
	<slot><!-- optional fallback --></slot>
</main>

<style lang="postcss">
	/* Define the scrollbar style */
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}

	/* Define the thumb style */
	::-webkit-scrollbar-thumb {
		background: theme(backgroundColor.green.800);
		border-radius: 100px;
	}

	/* Define the track style */
	::-webkit-scrollbar-track {
		background-color: theme(backgroundColor.muted.foreground);
		/* border: 1px solid #ccc; */
		margin-inline: 0.5rem;
		border-radius: 200px;
	}

	/* Define the button style */
	::-webkit-scrollbar-button {
		border-radius: 5px;
		height: 0px;
		width: 0px;
	}

	/* Define the button style when being hovered over */
	::-webkit-scrollbar-button:hover {
		background-color: #999999;
	}
</style>
