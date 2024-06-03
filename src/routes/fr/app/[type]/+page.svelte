<script lang="ts">
	import Card from '$lib/components/own/Card.svelte';
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	import { infiniteScrollAction } from 'svelte-legos';
	import type { RecordModel } from 'pocketbase';
	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import {page} from '$app/stores'

	export let data: PageData;

	$: ({ allAnnounces, totalItems } = data.announceData);

	$: loadAnnounces = writable<RecordModel[]>(allAnnounces);


	let start = 2;
	let end = 20;

	let isLoading = false;

	async function loadItems() {
		if (isLoading) return;
		isLoading = true;

		setTimeout(async () => {
			const res = await fetch(`http://localhost:5173/api/announces?start=${start}&end=${end}&type=${$page.params.type}`);
			const data = await res.json();
			$loadAnnounces = $loadAnnounces.concat(data.items);
			isLoading = false;
			start += 1;
		}, 2000);

		// load your data here
	}

	loadItems()
</script>

<section class="px-[2vw] pb-4">
	<div class="cards-container">
		{#each $loadAnnounces as announce}
			<Card
				images={announce.images}
				city={announce.city}
				collectionId={announce.collectionId}
				recordId={announce.id}
				commune={announce.commune}
				price={announce.price}
				transactionType={announce.transactionType}
				propertyType={announce.propertyType}
			/>
		{/each}
		{#if isLoading}
			{#each { length: 4 } as _}
				<div class="grid gap-4">
					<Skeleton class="h-[18rem] w-full rounded-md" />
					<div class="grid gap-2">
						<div class="flex items-center justify-between">
							<Skeleton class="h-[20px] w-[80px] rounded-sm" />
							<Skeleton class="h-[20px] w-[80px] rounded-sm" />
						</div>
						<Skeleton class="h-[20px] w-[180px] rounded-sm" />
						<Skeleton class="h-[20px] w-[150px] rounded-sm" />
						<Skeleton class="h-[20px] w-[200px] rounded-sm" />
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if $loadAnnounces.length != totalItems}
		<div
			use:infiniteScrollAction={{
				cb: loadItems,
				distance: 100
			}}
			class="h-20"
		>
			<!-- <Button on:click={loadItems}>Button</Button> -->
		</div>
	{/if}
</section>

<style>
	.cards-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 20px;
		grid-auto-rows: minmax(18rem, auto);
	}
</style>
