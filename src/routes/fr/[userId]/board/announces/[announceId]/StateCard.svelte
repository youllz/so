<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { stateSchema, type StateSchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { firstCapitalize } from '$lib/utils';
	import { mediaQuery } from 'svelte-legos';

	export let data: SuperValidated<Infer<StateSchema>>;
	export let content: string;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(stateSchema),
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

	$: $formData.state = content;
	$: selectState = $formData.state
		? {
				label: $formData.state,
				value: $formData.state
			}
		: {
				label: firstCapitalize(content),
				value: content
			};
</script>

<div class="rounded-md border bg-background p-4 shadow-sm">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Etat du bâtiment</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>L'ètat du bâtiment</Dialog.Title>
							<Dialog.Description>Modifier l'ètat du bâtiment</Dialog.Description>
						</Dialog.Header>
						<form action="?/editState" method="POST" class="mt-3" use:enhance>
							<Form.Field {form} name="state">
								<Form.Control let:attrs>
									<Form.Label>L'état du bâtiment</Form.Label>
									<Select.Root
										selected={selectState}
										onSelectedChange={(v) => {
											v && ($formData.state = v.value);
										}}
									>
										<Select.Trigger {...attrs} class="w-full">
											<Select.Value placeholder="Sélectionner le type de transaction" />
										</Select.Trigger>
										<Select.Content>
											<Select.Item value="neuf" label="Neuf">Neuf</Select.Item>
											<Select.Item value="occasion" label="Occasion">Occasion</Select.Item>
											<Select.Item value="en construction" label="En construction"
												>En construction</Select.Item
											>
										</Select.Content>
									</Select.Root>
									<input hidden bind:value={$formData.state} name={attrs.name} />
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
							<Drawer.Title>L'état du bâtiment</Drawer.Title>
							<Drawer.Description>Modifier l'état du batiment</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editState"
							method="POST"
							use:enhance
							class="mx-auto mt-3 flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="state">
									<Form.Control let:attrs>
										<Form.Label>L'état du bâtiment</Form.Label>
										<Select.Root
											selected={selectState}
											onSelectedChange={(v) => {
												v && ($formData.state = v.value);
											}}
										>
											<Select.Trigger {...attrs} class="w-full">
												<Select.Value placeholder="Sélectionner le type de transaction" />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="neuf" label="Neuf">Neuf</Select.Item>
												<Select.Item value="occasion" label="Occasion">Occasion</Select.Item>
												<Select.Item value="en construction" label="En construction"
													>En construction</Select.Item
												>
											</Select.Content>
										</Select.Root>
										<input hidden bind:value={$formData.state} name={attrs.name} />
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
	<p>
		{firstCapitalize(content)}
	</p>
</div>
