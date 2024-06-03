<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';

	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import Tooltip from './Tooltip.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { mediaQuery } from 'svelte-legos';
	import { availableSchema, type AvailableSchema } from './schemas';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		today,
		parseDate
	} from '@internationalized/date';
	import { cn } from '$lib/utils';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';

	export let data: SuperValidated<Infer<AvailableSchema>>;
	export let content: string;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	$: date = content;
	$: $formData.available = date;

	const form = superForm(data, {
		validators: zodClient(availableSchema),
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

	// avalaible
	const df = new DateFormatter('fr-FR', {
		dateStyle: 'long'
	});

	let value: DateValue | undefined;

	$: value = $formData.available ? parseDate($formData.available) : undefined;

	let placeholder1: DateValue = today(getLocalTimeZone());
	const { form: formData, enhance } = form;
</script>

<div class="rounded-md border bg-background p-4 text-foreground shadow-sm">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground">Date de disponibilité</h2>
		<div>
			{#if $isDesktop}
				<Dialog.Root bind:open>
					<Dialog.Trigger>
						<Tooltip />
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Date de disponibilité</Dialog.Title>
							<Dialog.Description>Modifier la date de disponibilité</Dialog.Description>
						</Dialog.Header>
						<form action="?/editAvailable" use:enhance method="POST">
							<Form.Field {form} name="available" class="flex flex-col">
								<Form.Control let:attrs>
									<Form.Label>Disponibilité</Form.Label>
									<Popover.Root>
										<Popover.Trigger
											{...attrs}
											class={cn(
												buttonVariants({ variant: 'outline' }),
												'w-full justify-start pl-4 text-left font-normal',
												!value && 'text-muted-foreground'
											)}
										>
											{value ? df.format(value.toDate(getLocalTimeZone())) : 'Choisir une date'}
											<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
										</Popover.Trigger>
										<Popover.Content class="w-auto p-0" side="top">
											<Calendar
												{value}
												bind:placeholder={placeholder1}
												minValue={today(getLocalTimeZone())}
												calendarLabel="Date de disponibilité"
												initialFocus
												onValueChange={(v) => {
													if (v) {
														$formData.available = v.toString();
													} else {
														$formData.available = '';
													}
												}}
											/>
										</Popover.Content>
									</Popover.Root>
									<!-- <Form.Description>Your date of birth is used to calculator your age</Form.Description> -->
									<Form.FieldErrors />
									<input hidden value={$formData.available} name={attrs.name} />
								</Form.Control>
							</Form.Field>
							<div class="mt-4 flex w-full items-center justify-end">
								<Button type="submit" size="sm">Sauvegarder</Button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Root>
			{:else}
				<Drawer.Root>
					<Drawer.Trigger>
						<Button variant="ghost" size="icon" class="rounded-full">
							<Pencil2 class="icon" />
						</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Date de disponibilité</Drawer.Title>
							<Drawer.Description>Modifier la date de disponibilité</Drawer.Description>
						</Drawer.Header>
						<form
							action="?/editAvailable"
							method="POST"
							use:enhance
							class="mx-auto flex w-[100%] flex-col"
						>
							<div class="px-4">
								<Form.Field {form} name="available" class="flex flex-col">
									<Form.Control let:attrs>
										<Form.Label>Disponibilité</Form.Label>
										<Popover.Root>
											<Popover.Trigger
												{...attrs}
												class={cn(
													buttonVariants({ variant: 'outline' }),
													'w-full justify-start pl-4 text-left font-normal',
													!value && 'text-muted-foreground'
												)}
											>
												{value ? df.format(value.toDate(getLocalTimeZone())) : 'Choisir une date'}
												<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
											</Popover.Trigger>
											<Popover.Content class="w-auto p-0" side="top">
												<Calendar
													{value}
													bind:placeholder={placeholder1}
													minValue={today(getLocalTimeZone())}
													calendarLabel="Date de disponibilité"
													initialFocus
													onValueChange={(v) => {
														if (v) {
															$formData.available = v.toString();
														} else {
															$formData.available = '';
														}
													}}
												/>
											</Popover.Content>
										</Popover.Root>
										<!-- <Form.Description>Your date of birth is used to calculator your age</Form.Description> -->
										<Form.FieldErrors />
										<input hidden value={$formData.available} name={attrs.name} />
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

	{df.format(new Date(content))}
</div>
