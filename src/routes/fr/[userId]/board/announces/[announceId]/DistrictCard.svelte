<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { districtSchema, type DistrictSchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { firstCapitalize } from '$lib/utils';
	import { mediaQuery } from 'svelte-legos';
	import { Input } from '$lib/components/ui/input';

	export let data: SuperValidated<Infer<DistrictSchema>>;
	export let content: string;

	$: value = content;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(districtSchema),
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

	$: $formData.district = value;
</script>

<div
	class="rounded-md border bg-background p-4 shadow-sm"
	class:border-destructive={content === 'undefined'}
>
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Quartier</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<!-- <SuperDebug data={$formData}/> -->
							<Dialog.Title>Quartier</Dialog.Title>
							<Dialog.Description>Modifier le quartier</Dialog.Description>
						</Dialog.Header>
						<form action="?/editDistrict" method="POST" class="mt-3" use:enhance>
							<Form.Field {form} name="district">
								<Form.Control let:attrs>
									<Form.Label>Quartier</Form.Label>
									<Input
										bind:value
										on:change={() => {
											$formData.district = value;
										}}
										{...attrs}
										autocomplete="off"
										autocapitalize="off"
									/>
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
							<Drawer.Title>Quartier</Drawer.Title>
							<Drawer.Description>Modifier le quartier.</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editDistrict"
							method="POST"
							use:enhance
							class="mx-auto mt-3 flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="district">
									<Form.Control let:attrs>
										<Form.Label>Quartier</Form.Label>
										<Input {...attrs} autocapitalize="off" autocomplete="off" />
									</Form.Control>
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
	{#if !content}
		<p></p>
	{:else}
		<p>
			{firstCapitalize(content)}
		</p>
	{/if}
</div>
