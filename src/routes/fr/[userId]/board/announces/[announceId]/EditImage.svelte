<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Pencil1, Plus, DotsVertical } from 'svelte-radix';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Drawer from '$lib/components/ui/drawer';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import type { PageData } from './$types.js';
	import { imageSchema } from './schemas';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { Toaster, toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { mediaQuery } from 'svelte-legos';
	import { Label } from '$lib/components/ui/label';

	const isDesktop = mediaQuery('(min-width: 768px)');

	export let data: PageData;

	export let images: string[] = [];
	export let collectionId: string;
	export let announceId: string;

	let open = false;

	$: imgs = images.map((item, id) => {
		return {
			img: item,
			id: id
		};
	});

	const {
		form: addForm,
		enhance: addEnhance,
		errors: addErrors
	} = superForm(data.imageForm, {
		validators: zodClient(imageSchema),
		resetForm: true,
		onResult: async ({ result }) => {
			switch (result.type) {
				case 'failure':
					toast.error("Erreur lors de l'ajout des images. Veuillez réessayer.");
					break;
				case 'success':
					toast.success('Images ajoutées avec succès!	');
					open = !open;
				default:
					break;
			}
		}
	});
</script>

<div class="flex w-full items-center justify-end px-4 py-2 pt-[5rem]">
	{#if $isDesktop}
		<Dialog.Root bind:open>
			<Dialog.Trigger>
				<Button variant="outline" size="sm">
					<Plus class="mr-4 size-4" />
					Ajouter des images
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Ajouter des images</Dialog.Title>
					<Dialog.Description></Dialog.Description>
				</Dialog.Header>
				<div>
					<form action="?/addImage" method="POST" use:addEnhance enctype="multipart/form-data">
						<div class="field">
							<Label for="images">Les images</Label>

							<Input
								type="file"
								multiple
								accept="image/png, image/avif, image/jpeg, image/webp"
								name="images"
								id="image"
								on:input={(e) => ($addForm.images = Array.from(e.currentTarget.files ?? []))}
							/>
							<span class="text-xs text-muted-foreground">Sélectionner une ou plusieurs images</span
							>

							{#if $addErrors.images}
								<span class="text-xs text-destructive">{$addErrors.images[0] || ''}</span>
							{/if}
							<!-- {#if $errors.images?._errors}
						<span class="text-xs text-destructive">{$errors.images._errors[0] || ''}</span>
					{/if} -->
						</div>

						<div class="flex w-full items-center justify-end">
							<Button type="submit">Ajouter</Button>
						</div>
					</form>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	{:else}
		<Drawer.Root bind:open>
			<Drawer.Trigger>
				<Button variant="outline" size="sm">
					<Plus class="mr-4 size-4" />
					Ajouter des images
				</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Images</Drawer.Title>
					<Drawer.Description>Ajouter des images</Drawer.Description>
				</Drawer.Header>
				<form action="?/addImage" method="POST" use:enhance>
					<div class="field px-4">
						<Label for="image">Images</Label>
						<Input
							type="file"
							multiple
							accept="image/png, image/avif, image/jpeg, image/webp"
							name="images"
							id="image"
							on:input={(e) => ($addForm.images = Array.from(e.currentTarget.files ?? []))}
						/>
						<span class="text-xs text-muted-foreground">Sélectionner une ou plusieurs images</span>

						{#if $addErrors.images}
							<span class="text-xs text-destructive">{$addErrors.images[0] || ''}</span>
						{/if}
					</div>
					<Drawer.Footer>
						<Button>Submit</Button>
						<Drawer.Close>Annuler</Drawer.Close>
					</Drawer.Footer>
				</form>
			</Drawer.Content>
		</Drawer.Root>
	{/if}
</div>

<div class="  grid">
	<ScrollArea class=" whitespace-nowrap rounded-md border  " orientation="horizontal">
		<div class="flex w-max space-x-4 p-4">
			{#each imgs as img (img.id)}
				<figure transition:fade class="relative shrink-0">
					<div class=" img-container h-[200px] w-[300px] overflow-hidden rounded-md">
						<img
							src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{img.img}"
							alt="maison"
							class="  h-fit w-fit rounded-md object-cover object-center"
						/>
					</div>
					<div class="absolute bottom-[5%] right-[5%]">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger disabled={images.length === 1}>
								<Button
									variant="secondary"
									disabled={images.length === 1}
									size="icon"
									class="size-8 rounded-full  "
								>
									<DotsVertical class="size-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<!-- <DropdownMenu.Label>My Account</DropdownMenu.Label> -->
									<!-- <DropdownMenu.Separator /> -->
									<form action="" method="POST" use:enhance>
										<!-- <DropdownMenu.Item>
										<button type="submit" formaction="?/editImage&image={image}">Modifier</button>
									</DropdownMenu.Item> -->
										<DropdownMenu.Item>
											<button
												type="submit"
												class="text-center"
												formaction="?/deleteImage&image={img.img}">Supprimer</button
											>
										</DropdownMenu.Item>
									</form>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</figure>
			{/each}
		</div>
	</ScrollArea>
</div>

<style>
	@media (width < 300px) {
		.img-container {
			width: 200px;
			height: auto;
		}
	}
</style>
