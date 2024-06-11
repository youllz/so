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


	const svgH = 16;
	const svgW = 16;

	const navItems = [
		{
			url: `/fr/host/new/${data.user?.id}/house`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M12 5C6.5 5 2 9.5 2 15v6h20v-6c0-5.5-4.5-10-10-10m0 2c2.53 0 4.78 1.17 6.25 3H5.76C7.22 8.17 9.47 7 12 7M8 19H4v-4c0-1.06.21-2.07.58-3H8zm6 0h-4v-7h4zm6 0h-4v-7h3.42c.37.93.58 1.94.58 3z"/></svg>`,
			title: 'Maisons'
		},
		{
			url: `/fr/host/new/${data.user?.id}/apartment`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M19 3v18h-6v-3.5h-2V21H5V3zm-4 4h2V5h-2zm-4 0h2V5h-2zM7 7h2V5H7zm8 4h2V9h-2zm-4 0h2V9h-2zm-4 0h2V9H7zm8 4h2v-2h-2zm-4 0h2v-2h-2zm-4 0h2v-2H7zm8 4h2v-2h-2zm-8 0h2v-2H7zM21 1H3v22h18z"/></svg>`,
			title: 'Appartements'
		},

		{
			url: `/fr/host/new/${data.user?.id}/land`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="M20 20c-1.39 0-2.78-.47-4-1.33c-2.44 1.71-5.56 1.71-8 0C6.78 19.53 5.39 20 4 20H2v2h2c1.37 0 2.74-.35 4-1c2.5 1.3 5.5 1.3 8 0c1.26.65 2.62 1 4 1h2v-2zm.78-1H20c-1.18 0-2.36-.4-3.42-1.15l-.58-.4l-.58.4c-1.03.72-2.21 1.1-3.42 1.1c-1.23 0-2.41-.38-3.44-1.1l-.56-.4l-.57.4C6.36 18.6 5.18 19 4 19h-.78c.53-1.46 2.36-4 8.78-4c2 0 3 .24 3 .24c.68-1.37 1.83-4.47 1-8.42l1.06.71c.33 1.43.94 4.22-.26 8.12c2.63.85 3.62 2.35 3.98 3.35M22 7.59c-.79-1.09-2-1.88-3.42-2.06c.12.14.23.3.34.47a5.03 5.03 0 0 1-.45 5.95c.59-1.45.53-3.16-.39-4.59c-.08-.08-.12-.16-.18-.25c-.4-.58-.94-1.05-1.52-1.39c-2.03.65-3.5 2.55-3.5 4.78c0 .53.08 1.03.22 1.5c-.6-.83-.94-1.83-.94-2.93c0-1.66.8-3.12 2.04-4.04c-1.04-.08-2.11.15-3.06.75c-.44.27-.82.6-1.14.98c.39-.94 1.05-1.76 2-2.36a4.85 4.85 0 0 1 3.39-.71a5.2 5.2 0 0 0-1.06-1.09c-.41-.31-.86-.55-1.33-.72c1 .03 2.04.36 2.91 1.01c.44.33.79.73 1.09 1.16c.06 0 .12-.01.19-.01A5.03 5.03 0 0 1 22 7.59"/></svg>`,
			title: 'Terrains'
		},
		{
			url: `/fr/host/new/${data.user?.id}/store`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 24 24"><path fill="currentColor" d="m18.36 9l.6 3H5.04l.6-3zM20 4H4v2h16zm0 3H4l-1 5v2h1v6h10v-6h4v6h2v-6h1v-2zM6 18v-4h6v4z"/></svg>`,
			title: 'Magasins'
		},

		{
			url: `/fr/host/new/${data.user?.id}/office`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 14 14"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M5.272 6.346h3.455s1 0 1 1v2.456s0 1-1 1H5.272s-1 0-1-1V7.346s0-1 1-1m.474 0v-.572a1 1 0 0 1 1-1h.51a1 1 0 0 1 1 1v.572"/><path d="M13.5 6.94a.999.999 0 0 0-.32-.74L7 .5L.82 6.2a1 1 0 0 0-.32.74v5.56a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1z"/></g></svg>`,
			title: 'Burreaux'
		},

		{
			url: `/fr/host/new/${data.user?.id}/local`,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" width=${svgW} height=${svgH} viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M7.25 2H6.5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-.75v1.75a.75.75 0 0 1-1.5 0zM6.5.5A2.5 2.5 0 0 0 4 3v3c0 .356.074.694.208 1H3A2.5 2.5 0 0 0 .5 9.5v3A2.5 2.5 0 0 0 3 15h10a2.5 2.5 0 0 0 2.5-2.5v-3A2.5 2.5 0 0 0 13 7h-1.208c.134-.306.208-.644.208-1V3A2.5 2.5 0 0 0 9.5.5zm.75 9a1 1 0 0 0-1-1h-1v1.75a.75.75 0 0 1-1.5 0V8.5H3a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3.25a1 1 0 0 0 1-1zm1.5 3a1 1 0 0 0 1 1H13a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-.75v1.75a.75.75 0 0 1-1.5 0V8.5h-1a1 1 0 0 0-1 1z" clip-rule="evenodd"/></svg>`,
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
				<Theme />
			</li>
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
