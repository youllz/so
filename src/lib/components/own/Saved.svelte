<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Heart } from 'svelte-radix';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { isDesktop } from '$lib/store';
	import { formatFCFA, firstCapitalize } from '$lib/utils';
	import { Trash, ArrowRight } from 'svelte-radix';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { fly } from 'svelte/transition';
	import type { AnnouncesResponse } from '$lib/pocketbaseType';

	export let savedData: AnnouncesResponse[] | undefined;

	const deleteSaved: SubmitFunction = async () => {
		return async ({ update }) => {
			// switch (result.type) {
			// 	case 'success':
			// 		toast.success('Opération effectué avec succès');
			// 		break;

			// 	case 'failure':
			// 		toast.error("L'enregistrement a échoué");
			// 		break;

			// 	default:
			// 		break;
			// }

			await update({ invalidateAll: true });
		};
	};
</script>

<Sheet.Root>
	<Sheet.Trigger>
		<Button variant="ghost" size="sm">
			<Heart class="icon mr-4" /> Favoris
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side={$isDesktop ? 'left' : 'bottom'}>
		<Sheet.Header>
			<Sheet.Title>Favoris</Sheet.Title>
			<!-- <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description> -->
		</Sheet.Header>

		<ScrollArea orientation="vertical" class="h-full py-6">
			<div class=" mx-4 grid gap-6">
				{#if savedData !== undefined}
					{#each savedData as item (item.id)}
						<div class="relative grid gap-3" transition:fly>
							<p>{item.title}</p>
							<!--  -->
							<figure class="h-[10rem] w-full">
								<img
									src="http://127.0.0.1:8090/api/files/{item.collectionId}/{item.id}/{item
										.images[0]}"
									alt={item.propertyType}
									class="block h-full w-full rounded-md object-cover"
								/>
							</figure>
							<!--  -->
							<div class="grid gap-1 text-sm">
								<p>
									{firstCapitalize(item.propertyType)}
								</p>
								<p>
									{firstCapitalize(item.transactionType)}
								</p>
								<p>
									{firstCapitalize(item.city)}
									{#if item.city === 'abidjan' && item.commune !== 'none'}
										{'- ' + item.commune}
									{/if}

									{#if item.district}
										{'- ' + item.district}
									{/if}
								</p>
								<p>
									{formatFCFA(item.price.toString())}
								</p>
							</div>
						</div>
						<div class="flex items-center justify-end gap-2">
							<form
								action="/fr/app?/deleteSaved&recordId={item.id}"
								method="POST"
								use:enhance={deleteSaved}
							>
								<Button type="submit" size="sm" variant="ghost">
									<Trash class="icon mr-4" />
									Retirer
								</Button>
							</form>
							<Button size="sm" variant="secondary" href="/fr/app/{item.propertyType}/{item.id}">
								Voir
								<ArrowRight class="icon ml-4" />
							</Button>
						</div>
					{/each}
				{:else}
					<div class="mt-[30dvh]">
						<p class="text-center text-lg text-muted-foreground">Aucune annonce enregistrée</p>
					</div>
				{/if}
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
