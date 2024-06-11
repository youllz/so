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
	import {isDesktop} from '$lib/store'
	import Saved from '$lib/components/own/Saved.svelte';



	export let data: LayoutData;

	$: ({savedData} = data)

	const svgH = 16;
	const svgW = 16;

	const subNavItems = [
		{
			type: 'maison',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M12 5C6.5 5 2 9.5 2 15v6h20v-6c0-5.5-4.5-10-10-10m0 2c2.53 0 4.78 1.17 6.25 3H5.76C7.22 8.17 9.47 7 12 7M8 19H4v-4c0-1.06.21-2.07.58-3H8zm6 0h-4v-7h4zm6 0h-4v-7h3.42c.37.93.58 1.94.58 3z"/></svg>`,
			title: 'Maisons'
		},
		{
			type: 'appartement',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M19 3v18h-6v-3.5h-2V21H5V3zm-4 4h2V5h-2zm-4 0h2V5h-2zM7 7h2V5H7zm8 4h2V9h-2zm-4 0h2V9h-2zm-4 0h2V9H7zm8 4h2v-2h-2zm-4 0h2v-2h-2zm-4 0h2v-2H7zm8 4h2v-2h-2zm-8 0h2v-2H7zM21 1H3v22h18z"/></svg>`,
			title: 'Appartements'
		},

		{
			type: 'terrain',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M20 20c-1.39 0-2.78-.47-4-1.33c-2.44 1.71-5.56 1.71-8 0C6.78 19.53 5.39 20 4 20H2v2h2c1.37 0 2.74-.35 4-1c2.5 1.3 5.5 1.3 8 0c1.26.65 2.62 1 4 1h2v-2zm.78-1H20c-1.18 0-2.36-.4-3.42-1.15l-.58-.4l-.58.4c-1.03.72-2.21 1.1-3.42 1.1c-1.23 0-2.41-.38-3.44-1.1l-.56-.4l-.57.4C6.36 18.6 5.18 19 4 19h-.78c.53-1.46 2.36-4 8.78-4c2 0 3 .24 3 .24c.68-1.37 1.83-4.47 1-8.42l1.06.71c.33 1.43.94 4.22-.26 8.12c2.63.85 3.62 2.35 3.98 3.35M22 7.59c-.79-1.09-2-1.88-3.42-2.06c.12.14.23.3.34.47a5.03 5.03 0 0 1-.45 5.95c.59-1.45.53-3.16-.39-4.59c-.08-.08-.12-.16-.18-.25c-.4-.58-.94-1.05-1.52-1.39c-2.03.65-3.5 2.55-3.5 4.78c0 .53.08 1.03.22 1.5c-.6-.83-.94-1.83-.94-2.93c0-1.66.8-3.12 2.04-4.04c-1.04-.08-2.11.15-3.06.75c-.44.27-.82.6-1.14.98c.39-.94 1.05-1.76 2-2.36a4.85 4.85 0 0 1 3.39-.71a5.2 5.2 0 0 0-1.06-1.09c-.41-.31-.86-.55-1.33-.72c1 .03 2.04.36 2.91 1.01c.44.33.79.73 1.09 1.16c.06 0 .12-.01.19-.01A5.03 5.03 0 0 1 22 7.59"/></svg>`,
			title: 'Terrains'
		},
		{
			type: 'magasin',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="m18.36 9l.6 3H5.04l.6-3zM20 4H4v2h16zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2zM6 18v-4h6v4z"/></svg>`,
			title: 'Magasins'
		},

		{
			type: 'bureau',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M5.272 6.346h3.455s1 0 1 1v2.456s0 1-1 1H5.272s-1 0-1-1V7.346s0-1 1-1m.474 0v-.572a1 1 0 0 1 1-1h.51a1 1 0 0 1 1 1v.572"/><path d="M13.5 6.94a.999.999 0 0 0-.32-.74L7 .5L.82 6.2a1 1 0 0 0-.32.74v5.56a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1z"/></g></svg>`,
			title: 'Burreaux'
		},

		{
			type: 'local',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.25 2H6.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-.75v1.75a.75.75 0 0 1-1.5 0zM6.5.5A2.5 2.5 0 0 0 4 3v3c0 .356.074.694.208 1H3A2.5 2.5 0 0 0 .5 9.5v3A2.5 2.5 0 0 0 3 15h10a2.5 2.5 0 0 0 2.5-2.5v-3A2.5 2.5 0 0 0 13 7h-1.208c.134-.306.208-.644.208-1V3A2.5 2.5 0 0 0 9.5.5zm.75 9a1 1 0 0 0-1-1h-1v1.75a.75.75 0 0 1-1.5 0V8.5H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.25a1 1 0 0 0 1-1zm1.5 3a1 1 0 0 0 1 1H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.75v1.75a.75.75 0 0 1-1.5 0V8.5h-1a1 1 0 0 0-1 1z" clip-rule="evenodd"/></svg>`,
			title: 'Locaux'
		}
	];
</script>

<Toaster richColors  />

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
				<Button size="sm" variant="default">Mettre son annonce sur SO</Button>
			</li>
			<li>
				<Saved savedData={savedData?.saved.reverse()}/>
			</li>
			<li>
				<Theme />
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
				size="default"
				href="/fr/app"
				variant={$page.url.pathname === '/fr/app' ? 'outline' : 'ghost'}
			>
				<span class="mr-2 size-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="${svgW}"
						height="${svgH}"
						viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M5.1 16.05q-.55-.95-.825-1.95T4 12.05q0-3.35 2.325-5.7T12 4h.175l-1.6-1.6l1.4-1.4l4 4l-4 4l-1.4-1.4l1.6-1.6H12Q9.5 6 7.75 7.763T6 12.05q0 .65.15 1.275t.45 1.225zM12.025 23l-4-4l4-4l1.4 1.4l-1.6 1.6H12q2.5 0 4.25-1.763T18 11.95q0-.65-.15-1.275T17.4 9.45l1.5-1.5q.55.95.825 1.95T20 11.95q0 3.35-2.325 5.7T12 20h-.175l1.6 1.6z"
						/></svg
					>
				</span>
				<span> Tous </span>
			</Button>
			{#each subNavItems as item}
				<li>
					<Button
						size="default"
						href="/fr/app/{item.type}"
						class=" "
						variant={$page.url.pathname === `/fr/app/${item.type}` ? 'outline' : 'ghost'}
					>
						<span class="mr-2 size-4">{@html item.icon}</span>
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
