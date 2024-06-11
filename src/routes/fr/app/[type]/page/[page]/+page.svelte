<script lang="ts">
	import Card from '$lib/components/own/Card.svelte';
	import { isDesktop } from '$lib/store';
	import type { PageData } from './$types';
	import { ChevronLeft, ChevronRight } from 'svelte-radix';
	import { goto } from '$app/navigation';
	import * as Pagination from '$lib/components/ui/pagination';
	import { page } from '$app/stores';
	export let data: PageData;

	$: ({ allAnnounces } = data);
	$: ({ user, saved } = data);

	// $: loadAnnounces = writable<RecordModel[]>(allAnnounces.items);

	$: count = allAnnounces.totalItems;
	$: perPage = allAnnounces.perPage;
	$: siblingCount = 2;
</script>

<section class="px-[2vw] pb-4">
	<div class="cards-container">
		{#each allAnnounces.items as announce}
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
			/>
		{:else}
			<p class="text-7xl text-muted-foreground">Aucun résultat trouvé</p>
		{/each}
	</div>

	{#if allAnnounces.totalPages !== 1}
		<div class="mt-14">
			<Pagination.Root
				{count}
				{perPage}
				{siblingCount}
				let:pages
				let:currentPage
				onPageChange={(item) => {
					goto(`/fr/app/${$page.params.type}/page/${item}`, { replaceState: true, invalidateAll: true });
				}}
			>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton>
							<ChevronLeft class="h-4 w-4" />
							<span class="hidden sm:block">Précédent</span>
						</Pagination.PrevButton>
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={Number(allAnnounces.page) === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton>
							<span class="hidden sm:block">Suivant</span>
							<ChevronRight class="h-4 w-4" />
						</Pagination.NextButton>
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
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
