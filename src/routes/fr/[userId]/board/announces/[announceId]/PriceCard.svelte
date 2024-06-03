<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { priceSchema, type PriceSchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { mediaQuery } from 'svelte-legos';
  import { Input } from "$lib/components/ui/input"
  

	export let data: SuperValidated<Infer<PriceSchema>>;
	export let content: string;

  $: number = content
  $: $formData.price = number

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(priceSchema),
    invalidateAll: true,
		onResult({ result }) {
			switch (result.type) {
				case 'success':
					toast.success('La modification a été effectué avec succès !');
					open = false;
					break;
				case 'failure':
					toast.error('Erreur lors de la modification. Veuillez réessayer.');
				default:
					break;
			}
		}
	});
	const { form: formData, enhance } = form;

	$: $formData.price = content;
	
</script>

<div class="rounded-md border bg-background p-4 shadow-sm ">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Prix</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Prix</Dialog.Title>
              <Dialog.Description>Modifier le prix</Dialog.Description>
						</Dialog.Header>
						<form action="?/editPrice" method="POST" use:enhance>
							<Form.Field {form} name="price">
								<Form.Control let:attrs>
									<Form.Label>Prix (fcfa)</Form.Label>
									<Input type="number" min="0" inputmode="numeric" autocomplete="off" {...attrs} bind:value={number} on:change={() => {$formData.price = number}} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
							<div class="mt-4 flex items-center justify-end">
								<Button type="submit" size="sm">Sauvegarder</Button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Root>
			{:else}
				<Drawer.Root bind:open>
					<Drawer.Trigger>
						<Button class="rounded-full" variant="ghost" size="icon">
							<Pencil2 class="icon" />
						</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Prix</Drawer.Title>
							<Drawer.Description>Modifier le prix</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editPrice"
							method="POST"
							use:enhance
							class="mx-auto flex w-[100%] flex-col"
						>
							<div class="px-4">
							<Form.Field {form} name="price">
								<Form.Control let:attrs>
									<Form.Label>Prix (fcfa)</Form.Label>
									<Input type="number" min="0" inputmode="numeric" autocomplete="off" {...attrs} bind:value={number} on:change={() => {$formData.price = number}} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
							</div>
							<Drawer.Footer>
								<Button type="submit" size="sm" class="mt-2 w-full">Sauvegarder</Button>
								<Drawer.Close>
									<Button variant="outline" size="sm" class="w-full">Annuler</Button>
								</Drawer.Close>
							</Drawer.Footer>
						</form>
					</Drawer.Content>
				</Drawer.Root>
			{/if}
		</div>
	</div>
	<p>
		{content}
	</p>
</div>
