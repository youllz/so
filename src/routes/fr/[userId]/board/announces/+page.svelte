<script lang="ts">
	import type { PageData } from './$types';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { DotsVertical } from 'svelte-radix';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: ({ allUserAnnounces } = data);
</script>

<div class="w-full px-2">
	<Tabs.Root value="announce" class="w-[100%]  ">
		<Tabs.List
			class="  my-4 flex justify-between overflow-y-clip bg-transparent max-sm:overflow-x-scroll  "
		>
			<div class="flex-shrink-0 rounded-lg bg-accent p-1 max-sm:items-center max-sm:justify-center">
				<Tabs.Trigger value="announce">Annonces</Tabs.Trigger>
				<Tabs.Trigger value="active">Actives</Tabs.Trigger>
				<Tabs.Trigger value="disabled">Désactivées</Tabs.Trigger>
				<Tabs.Trigger value="archives">archives</Tabs.Trigger>
			</div>
			<!-- <div class="flex items-center">
					<Input type="search" placeholder="Recherche" class="bg-background border border-input"/>
				</div> -->
		</Tabs.List>

		<div></div>
		<Tabs.Content value="announce">
			<div class="content p-4">
				{#each allUserAnnounces as announce}
					<a href="/fr/{data.user?.id}/board/announces/{announce.id}">
						<div class="transition-transform hover:scale-[0.99]">
							<figure class="relative h-[200px] min-w-[200px]">
								<img
									src="http://127.0.0.1:8090/api/files/{announce.collectionId}/{announce.id}/{announce
										.images[0]}?thumb=100x200"
									alt=""
									class="h-full w-full rounded-md object-cover"
								/>
								<div class="absolute bottom-[3%] right-[3%]">
									<DropdownMenu.Root>
										<DropdownMenu.Trigger>
											<Button variant="secondary" size="icon" class="rounded-full">
												<DotsVertical class="icon" />
											</Button>
										</DropdownMenu.Trigger>
										<DropdownMenu.Content>
											<DropdownMenu.Group>
												<form method="POST" use:enhance>
													<DropdownMenu.Item
														><button formaction="?/editAnnounceState&state=acitvé&id={announce.id}"
															>Activé</button
														></DropdownMenu.Item
													>
													<DropdownMenu.Item
														><button
															formaction="?/editAnnounceState&state=désactivéid={announce.id}"
															>Désactivé</button
														></DropdownMenu.Item
													>
													<DropdownMenu.Item
														><button formaction="?/editAnnounceState&state=archivéid={announce.id}"
															>Archivé</button
														></DropdownMenu.Item
													>
												</form>
											</DropdownMenu.Group>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</div>
							</figure>
							<div class="grid gap-4 py-3">
								<span class="line-clamp-1 text-sm font-semibold">
									{announce.title}
								</span>
								<p class="line-clamp-4 text-xs">
									{announce.description}
								</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</Tabs.Content>
		<Tabs.Content value="active">actives</Tabs.Content>
		<Tabs.Content value="disabled">désactivé</Tabs.Content>
		<Tabs.Content value="archives">archive</Tabs.Content>
	</Tabs.Root>

	<!-- "http://127.0.0.1:8090/api/files/{announce.collectionId}/{announce.id}/{announce
												.images[0]}?thumb=100x200" -->
</div>

<style>
	.content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
		grid-auto-rows: minmax(20rem, auto);
		gap: 1rem;
		border-radius: 10px;
	}
</style>
