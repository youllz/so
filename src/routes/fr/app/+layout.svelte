<script lang="ts">
	import type { LayoutData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { MixerHorizontal } from 'svelte-radix';
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';
	import Theme from '$lib/components/own/Theme.svelte';
	import { page } from '$app/stores';
	import FilterDialog from '$lib/components/own/FilterDialog.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { Heart } from 'svelte-radix';
	import { isDesktop } from '$lib/store';
	import Saved from '$lib/components/own/Saved.svelte';

	export let data: LayoutData;

	$: ({ savedData } = data);

	const subNavItems = [
		{
			type: 'maison',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
			title: 'Maisons'
		},
		{
			type: 'appartement',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>`,
			title: 'Appartements'
		},

		{
			type: 'terrain',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>`,
			title: 'Terrains'
		},
		{
			type: 'magasin',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>`,
			title: 'Magasins'
		},

		{
			type: 'bureau',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>`,
			title: 'Burreaux'
		},

		{
			type: 'local',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
			title: 'Locaux'
		}
	];
</script>

<!-- <Toaster richColors /> -->

<header class="fixed top-0 z-40 flex w-full flex-col gap-6 border-b border-input bg-background">
	<nav class="flex items-center justify-between px-[3vw] py-2">
		<div>
			<div>
				<a href="/fr" class="text-xl font-bold"> SO </a>
			</div>
		</div>

		<div>
			<FilterDialog />
		</div>

		<ul class="flex items-center gap-4">
			<li>
				<Button href="/fr/host/home" size="sm" variant="ghost">Mettre son annonce sur SO</Button>
			</li>
			<li>
				<Saved savedData={savedData?.saved?.reverse()} />
			</li>

			<li>
				<AccountDrop
					userId={data.user?.id}
					name={data.user?.name}
					lastname={data.user?.lastname}
					avatar={data.user?.avatar}
					collectionId={data.user?.collectionId}
				/>
			</li>
		</ul>
	</nav>

	<!-- subnav -->
	<div class="   sticky flex items-center justify-center bg-background px-[3vw] py-1">
		<ul class="flex">
			<Button
				size="sm"
				href="/fr/app"
				variant={$page.url.pathname === '/fr/app' ? 'secondary' : 'ghost'}
				class={$page.url.pathname === '/fr/app' ? 'opacity-100' : 'opacity-50	'}
			>
				<span class="mr-4 size-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.875"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-rotate-ccw"
						><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path
							d="M3 3v5h5"
						/></svg
					>
				</span>
				<span> Tous </span>
			</Button>
			{#each subNavItems as item}
				<li>
					<Button
						size="sm"
						href="/fr/app/{item.type}"
						class="{$page.url.pathname === `/fr/app/${item.type}` ? 'opacity-100' : 'opacity-50'} "
						variant={$page.url.pathname === `/fr/app/${item.type}` ? 'secondary' : 'ghost'}
					>
						<span class="icon mr-4">{@html item.icon}</span>
						<span>
							{item.title}
						</span>
					</Button>
				</li>
			{/each}
		</ul>
	</div>
</header>

<main class="pt-[9rem]">
	<slot />
</main>

<style>
</style>
