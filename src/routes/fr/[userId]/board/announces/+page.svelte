<script lang="ts">
	import type { PageData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { DotsVertical, Plus } from 'svelte-radix';
	import { enhance } from '$app/forms';
	import Card from './Card.svelte';

	export let data: PageData;

	$: ({ allAnnounces, activatedAnnounces, disabledAnnounces, archivedAnnounces } = data);
</script>

<div class="w-full px-2">
	<Tabs.Root value="announce" class="w-[100%]  ">
		<Tabs.List
			class="  my-4 flex justify-between overflow-y-clip bg-transparent max-sm:overflow-x-scroll  "
		>
			<div class="flex-shrink-0 rounded-lg bg-accent p-1 max-sm:items-center max-sm:justify-center">
				<Tabs.Trigger value="announce">Annonces ({allAnnounces.length })</Tabs.Trigger>
				<Tabs.Trigger value="active">Actives ({activatedAnnounces.length })</Tabs.Trigger>
				<Tabs.Trigger value="disabled">Désactivées ({disabledAnnounces.length })</Tabs.Trigger>
				<Tabs.Trigger value="archives">archives ({archivedAnnounces.length })</Tabs.Trigger>
			</div>
			<!-- <div class="flex items-center">
					<Input type="search" placeholder="Recherche" class="bg-background border border-input"/>
				</div> -->
		</Tabs.List>

		<div></div>
		<Tabs.Content value="announce">
			<div class="content p-4">
				{#each allAnnounces as announce (announce.id)}
					<Card
						collectionId={announce.collectionId}
						recordId={announce.id}
						image={announce.images[0]}
						created={announce.created.split(' ')[0]}
						description={announce.description}
						status={announce.status}
						title={announce.title}
						userId={data.user?.id}
					/>
				{:else}
					<div class="flex items-start justify-center gap-4 flex-col">
						<p>Aucune announce trouvé</p>
						<Button href="/fr/host/new/{data.user?.id}" size="sm">
							<Plus class="icon mr-4" />
							Ajouter une annonce
						</Button>
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="active">
			<div class="content p-4">
				{#each activatedAnnounces as announce (announce.id)}
					<Card
						collectionId={announce.collectionId}
						recordId={announce.id}
						image={announce.images[0]}
						created={announce.created.split(' ')[0]}
						description={announce.description}
						status={announce.status}
						title={announce.title}
						userId={data.user?.id}
					/>
				{:else}
					<div class="flex flex-col gap-4 items-center justify-center">
						<p>Aucune annonce n'est active</p>
						<Button href="/fr/host/new/{data.user?.id}" size="sm">
							<Plus class="icon mr-4" />
							Ajouter une annonce
						</Button>
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="disabled">
			<div class="content p-4">
				{#each disabledAnnounces as announce (announce.id)}
					<Card
						collectionId={announce.collectionId}
						recordId={announce.id}
						image={announce.images[0]}
						created={announce.created.split(' ')[0]}
						description={announce.description}
						status={announce.status}
						title={announce.title}
						userId={data.user?.id}
					/>
				{:else}
					<div class="flex items-center justify-center">
						<p>Aucune announce désactivée</p>
					</div>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="archives">
			<div class="content p-4">
				{#each archivedAnnounces as announce (announce.id)}
					<Card
						collectionId={announce.collectionId}
						recordId={announce.id}
						image={announce.images[0]}
						created={announce.created.split(' ')[0]}
						description={announce.description}
						status={announce.status}
						title={announce.title}
						userId={data.user?.id}
					/>
				{:else}
					<div class="flex items-center justify-center">
						<p>Aucune announce archiver</p>
					</div>
				{/each}
			</div>
		</Tabs.Content>
	</Tabs.Root>

	<!-- "http://127.0.0.1:8090/api/files/{announce.collectionId}/{announce.id}/{announce
												.images[0]}?thumb=100x200" -->
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
		grid-auto-rows: minmax(20rem, auto);
		gap: 1.5rem;
		border-radius: 10px;
	}
</style>
