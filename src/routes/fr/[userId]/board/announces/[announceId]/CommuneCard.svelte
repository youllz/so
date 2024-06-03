<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { communeSchema, type CommuneSchema } from './schemas';
	import Tooltip from './Tooltip.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { firstCapitalize } from '$lib/utils';
	import { mediaQuery } from 'svelte-legos';
	import { communeAbidjanObject } from '$lib/data';

	export let data: SuperValidated<Infer<CommuneSchema>>;
	export let content: string;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	const form = superForm(data, {
		validators: zodClient(communeSchema),
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

	$: $formData.commune = content;
	$: selectCommune = $formData.commune
		? {
				label: $formData.commune,
				value: $formData.commune
			}
		: {
				label: firstCapitalize(content),
				value: content
			};
</script>

<div class="rounded-md border bg-background p-4 shadow-sm" class:border-destructive={content === "none"}>
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground max-md:text-xs">Commune</h2>

		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
              <!-- <SuperDebug data={$formData}/> -->
							<Dialog.Title>Modifier la commune</Dialog.Title>
						</Dialog.Header>
						<form action="?/editCommune" method="POST" use:enhance>
							<Form.Field {form} name="commune">
								<Form.Control let:attrs>
									<Form.Label>Commune</Form.Label>
									<Select.Root
										selected={selectCommune}
										onSelectedChange={(v) => {
											v && ($formData.commune = v.value);
										}}
									>
										<Select.Trigger {...attrs} class="w-full">
											<Select.Value placeholder="Sélectionner le type de transaction" />
										</Select.Trigger>
										<Select.Content class="h-[200px] overflow-y-scroll">
											{#each communeAbidjanObject as commune}
												<Select.Item label={commune.label} value={commune.value}
													>{commune.label}
												</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
									<input hidden bind:value={$formData.commune} name={attrs.name} />
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
							<Drawer.Title>Modifier l'état du bâtiment</Drawer.Title>
							<!-- <Drawer.Description>This action cannot be undone.</Drawer.Description> -->
						</Drawer.Header>
						<form
							action="?/editCommune"
							method="POST"
							use:enhance
							class="mx-auto flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="commune">
									<Form.Control let:attrs>
										<Form.Label>Commune</Form.Label>
										<Select.Root
											selected={selectCommune}
											onSelectedChange={(v) => {
												v && ($formData.commune = v.value);
											}}
										>
											<Select.Trigger {...attrs} class="w-full">
												<Select.Value placeholder="Sélectionner la commune" />
											</Select.Trigger>
											<Select.Content class="h-[200px] overflow-y-scroll">
												{#each communeAbidjanObject as commune}
													<Select.Item label={commune.label} value={commune.value}
														>{commune.label}
													</Select.Item>
												{/each}
											</Select.Content>
										</Select.Root>
										<input hidden bind:value={$formData.commune} name={attrs.name} />
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
  {#if content === "none"}
    <p class="text-sm text-destructive">
      Veillez sélectionner la commune
    </p>
    {:else}
    <p>
      {content}
    </p>
  {/if}
  
	<p>
		
	</p>
</div>
