<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { equipmentsSchema, equipments, type EquipmentsSchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { firstCapitalize } from '$lib/utils';
	import { mediaQuery } from 'svelte-legos';
	import { cityObjects } from '$lib/data';

	export let data: SuperValidated<Infer<EquipmentsSchema>>;
	export let content: string[];

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(equipmentsSchema),
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

	$: selectedEquipment = $formData?.equipments.map((c) => ({ label: equipments[c], value: c }));
</script>

<div class="rounded-md border bg-background p-4 shadow-sm">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Equipements</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Modifier les Equipements</Dialog.Title>
							<Dialog.Description>Modifier les equipements disponibles</Dialog.Description>
						</Dialog.Header>
						<form action="?/editEquipments" method="POST" use:enhance>
							<Form.Field {form} name="equipments">
								<Form.Control let:attrs>
									<Form.Label>Les equipements</Form.Label>
									<Select.Root
										multiple
										selected={selectedEquipment}
										onSelectedChange={(s) => {
											if (s) {
												$formData.equipments = s.map((c) => c.value);
											} else {
												$formData.equipments = [];
											}
										}}
									>
										{#each $formData.equipments as item}
											<input name={attrs.name} hidden value={item} />
										{/each}
										<Select.Trigger {...attrs}>
											<Select.Value placeholder="Sélectionner les équipements " />
										</Select.Trigger>
										<Select.Content>
											{#each Object.entries(equipments) as [value, label]}
												<Select.Item {value} {label} />
											{/each}
										</Select.Content>
									</Select.Root>
									<Form.FieldErrors class="text-sm text-destructive" />
								</Form.Control>
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
							<Drawer.Title>Les equipements</Drawer.Title>
							<Drawer.Description>Modifier les equipements disponibles.</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editEquipments"
							method="POST"
							use:enhance
							class="mx-auto flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="equipments">
									<Form.Control let:attrs>
										<Form.Label>Les equipements</Form.Label>
										<Select.Root
											multiple
											selected={selectedEquipment}
											onSelectedChange={(s) => {
												if (s) {
													$formData.equipments = s.map((c) => c.value);
												} else {
													$formData.equipments = [];
												}
											}}
										>
											{#each $formData.equipments as item}
												<input name={attrs.name} hidden value={item} />
											{/each}
											<Select.Trigger {...attrs}>
												<Select.Value placeholder="Sélectionner les équipements " />
											</Select.Trigger>
											<Select.Content>
												{#each Object.entries(equipments) as [value, label]}
													<Select.Item {value} {label} />
												{/each}
											</Select.Content>
										</Select.Root>
										<Form.FieldErrors class="text-sm text-destructive" />
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
	<p class="flex gap-4">
		{#each content as item}
			<span>
				{item}
			</span>
		{/each}
	</p>
</div>
