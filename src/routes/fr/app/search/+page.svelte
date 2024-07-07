<script lang="ts">
	import type { PageData } from './$types';
	import Card from '$lib/components/own/Card.svelte';
	import { resultFound } from '$lib/store';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ searchAnnounces, saved, user } = data);
	$: $resultFound = searchAnnounces.length;
</script>

<section class="px-[2vw] pb-4">
	<div class="cards-container">
		{#each searchAnnounces as announce}
			<Card
				images={announce.images}
				city={announce.city}
				collectionId={announce.collectionId}
				recordId={announce.id}
				commune={announce.commune}
				price={announce.price}
				transactionType={announce.transactionType}
				propertyType={announce.propertyType}
				{user}
				{saved}
				href="/fr/app/{announce.propertyType}/{announce.id}{$page.url.search}"
				target="_self"
			/>
		{:else}
			<div class="absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[50%]">
				<p class="text-2xl text-muted-foreground">Aucun résultat trouvé</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.cards-container {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: 20px;
		grid-auto-rows: minmax(18rem, auto);
	}
</style>
