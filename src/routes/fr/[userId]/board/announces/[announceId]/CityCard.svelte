<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { citySchema, type CitySchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { firstCapitalize } from '$lib/utils';
	import { mediaQuery } from 'svelte-legos';
	import { cityObjects } from '$lib/data';

	export let data: SuperValidated<Infer<CitySchema>>;
	export let content: string;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(citySchema),
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

	$: $formData.city = content;
	$: selectCity = $formData.city
		? {
				label: $formData.city,
				value: $formData.city
			}
		: {
				label: firstCapitalize(content),
				value: content
			};
</script>

<div class="rounded-md border bg-background p-4 shadow-sm">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Ville</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Ville</Dialog.Title>
							<Dialog.Description>Modifier la ville</Dialog.Description>
						</Dialog.Header>
						<form action="?/editCity" method="POST" class="mt-3" use:enhance>
							<Form.Field {form} name="city">
								<Form.Control let:attrs>
									<Form.Label>Ville</Form.Label>
									<Select.Root
										selected={selectCity}
										onSelectedChange={(v) => {
											v && ($formData.city = v.value);
										}}
									>
										<Select.Trigger {...attrs} class="w-full">
											<Select.Value placeholder="Sélectionner le type de transaction" />
										</Select.Trigger>
										<Select.Content class="h-[200px] overflow-y-scroll">
											{#each cityObjects as city}
												<Select.Item label={city.label} value={city.value}
													>{city.label}
												</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
									<input hidden bind:value={$formData.city} name={attrs.name} />
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
							<Drawer.Title>Ville</Drawer.Title>
							<Drawer.Description>Modifier la ville</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editCity"
							method="POST"
							use:enhance
							class="mx-auto mt-3 flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="city">
									<Form.Control let:attrs>
										<Form.Label>Ville</Form.Label>
										<Select.Root
											selected={selectCity}
											onSelectedChange={(v) => {
												v && ($formData.city = v.value);
											}}
										>
											<Select.Trigger {...attrs} class="w-full">
												<Select.Value placeholder="Sélectionner la ville" />
											</Select.Trigger>
											<Select.Content class="h-[200px] overflow-y-scroll">
												{#each cityObjects as city}
													<Select.Item label={city.label} value={city.value}
														>{city.label}
													</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
										<input hidden bind:value={$formData.city} name={attrs.name} />
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
