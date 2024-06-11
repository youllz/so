<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import Send from '$lib/components/own/Send.svelte';
	import { ChevronLeft, Heart } from 'svelte-radix';
	import Slide from './Slide.svelte';
	import { slide } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	import SaveBtn from '$lib/components/own/SaveBtn.svelte'

	export let data: PageData;
	$: ({ announce, user, saved } = data);

	let openSlider = false;
	let idx = 0;
</script>

<header class="fixed top-0 z-40 flex w-full items-center justify-between bg-background px-4 py-3">
	<Button
		href="/fr/app/{announce.propertyType}/{announce.id}"
		class="rounded-full"
		variant="ghost"
		size="icon"
	>
		<ChevronLeft class="icon" />
	</Button>

	<ul class="flex items-center gap-4">
		<li>
			<Send
				announceId={announce.id}
				city={announce.city}
				collectionId={announce.collectionId}
				img={announce.images[0]}
				property={announce.propertyType}
				transaction={announce.transactionType}
			/>
		</li>
		<li>
			<SaveBtn 
			{user}
			{saved}
			recordId={announce.id}
			state="sm"
			/>
		</li>
	</ul>
</header>

<section class="h-[100dvh] overflow-y-scroll">
	<ul class="mx-auto my-0 mt-[100px] flex max-w-[1000px] flex-wrap gap-[2vmin] px-4 py-3">
		{#each announce.images as image, i}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li class="h-[300px] flex-grow">
				<img
					src="http://127.0.0.1:8090/api/files/{announce.collectionId}/{announce.id}/{image}"
					alt=""
					class="h-full w-full cursor-pointer object-cover"
					on:click={() => {
						openSlider = true;
						idx = i;
					}}
				/>
			</li>
		{/each}
	</ul>
</section>

{#if openSlider}
	<div
		transition:slide={{ axis: 'y', duration: 800, easing: expoInOut }}
		class="fixed bottom-0 z-50 w-full"
	>
		<Slide
			{idx}
			on:close={() => (openSlider = !openSlider)}
			announceId={announce.id}
			collectionId={announce.collectionId}
			images={announce.images}
		>
		<div slot="send">
			<Send
				announceId={announce.id}
				city={announce.city}
				collectionId={announce.collectionId}
				img={announce.images[0]}
				property={announce.propertyType}
				transaction={announce.transactionType}
			/>
		</div>
		<div slot="save">
			<SaveBtn 
			{user}
			{saved}
			recordId={announce.id}
			state="sm"
			/>
		</div>
	</Slide>
	</div>
{/if}

<style lang="postcss">
	ul::after {
		content: '';
		display: block;
		flex-grow: 10;
	}
</style>
