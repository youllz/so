<script lang="ts">
	import type { PageData } from './$types';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { formSchema, transactionTypes } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { Field, Control, FieldErrors, Description } from 'formsnap';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Select from '$lib/components/ui/select';
	import * as Form from '$lib/components/ui/form';
	import SuperDebug from 'sveltekit-superforms';
	import {
		CalendarDate,
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
		parseDate,
		today
	} from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import { Calendar } from '$lib/components/ui/calendar';
	import CalendarIcon from 'svelte-radix/Calendar.svelte';
	import Reload from 'svelte-radix/Reload.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { cityObjects, communeAbidjanObject } from '$lib/data';
	import { loadTimerForm } from '$lib/store';
	import { goto, invalidate, invalidateAll, replaceState } from '$app/navigation';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Trash } from 'svelte-radix';

	export let data: PageData;

	const { delayMs, timeOutMs } = loadTimerForm();
	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		invalidateAll: true,
		applyAction: true,
		delayMs: $delayMs,
		timeoutMs: $timeOutMs,
		onResult: async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Votre annonce a été créee avec succès.', {});
					await goto(`/fr/${data.user?.id}/board/announces`, {
						replaceState: true,
						invalidateAll: true
					});
					break;
				case 'failure':
					toast.error("Désolé, une erreur s'est produite.", {});
					break;
				default:
					break;
			}
		},
		onSubmit: async ({ formData, cancel }) => {
			let data = Object.fromEntries(formData);
			console.log(data);

			if (data.city === 'abidjan' && data.commune === 'undefined') {
				toast.error('Veillez sélectionner une commune', {});
				cancel();
				communeIsValid = false;
			}
		}
	});
	const { form: formData, enhance, errors, delayed } = form;

	// userId
	$: $formData.userId = $page.params.userId;

	// select  transaction type
	$: selectedTransactionType = $formData.transactionType
		? {
				label: $formData.transactionType,
				value: $formData.transactionType
			}
		: undefined;

	// slect state

	// $: selectState = {
	// 	label: states[$formData.state],
	// 	value: $formData.state
	// };

	// Select equipment
	// $: selectedEquipment = $formData.equipments.map((c) => ({ label: equipments[c], value: c }));

	// selectCity
	$: selectCity = $formData.city
		? {
				label: $formData.city,
				value: $formData.city
			}
		: undefined;

	// selectCommune

	$: selectCommune = $formData.commune
		? {
				label: $formData.commune,
				value: $formData.commune
			}
		: undefined;

	// get commune

	let communeIsValid = true;
	$: if ($formData.city !== 'abidjan') {
		$formData.commune = undefined;
	}

	// avalaible
	const df1 = new DateFormatter('fr-FR', {
		dateStyle: 'long'
	});

	let value1: DateValue | undefined;

	$: value1 = $formData.available ? parseDate($formData.available) : undefined;

	let placeholder1: DateValue = today(getLocalTimeZone());

	// en of avalaible
	const df2 = new DateFormatter('fr-FR', {
		dateStyle: 'long'
	});

	let value2: DateValue | undefined;

	$: value2 = $formData.endOfAvailability ? parseDate($formData.endOfAvailability) : undefined;

	let placeholder2: DateValue = today(getLocalTimeZone());

	// dinamic file input
	function removeImageByIndex(index: number) {
		$formData.images = $formData.images.filter((_, i) => i !== index);
	}

	let file: File;
	function addImage() {
		$formData.images = [...$formData.images, file];
	}
</script>

<!-- <div class="">
	<SuperDebug data={$formData} />
</div> -->
<!-- <Toaster position="bottom-right" richColors /> -->
<section class="flex items-center justify-center pb-6">
	<form
		method="POST"
		use:enhance
		enctype="multipart/form-data"
		class="mt-[5rem] grid w-[30rem] gap-6"
	>
		<div class="field">
			<Label for="type">Type</Label>
			<Input disabled type="text" name="idType" id="type" value="terrain" />
		</div>
		<input type="hidden" name="userId" bind:value={$formData.userId} />
		<div class="field">
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Titre de l'annonce</Form.Label>
					<Input {...attrs} bind:value={$formData.title} />
				</Form.Control>
				<Form.FieldErrors class="text-xs" />
			</Form.Field>
		</div>

		<!-- description -->
		<div class="field">
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<Form.Label>Description</Form.Label>
					<Textarea
						{...attrs}
						placeholder="Toutes les informations supplémentaires sont les bienvenues"
						class="resize-none"
						bind:value={$formData.description}
					/>
					<!-- <Form.Description>
						Toutes les informations supplémentaires sont les bienvenues
					</Form.Description> -->
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<!-- city -->

		<Form.Field {form} name="city">
			<Form.Control let:attrs>
				<Form.Label>Ville</Form.Label>
				<Select.Root
					preventScroll={false}
					selected={selectCity}
					onSelectedChange={(s) => {
						s && ($formData.city = s.value);
					}}
				>
					<Select.Trigger class="w-full">
						<Select.Input {...attrs} bind:value={$formData.city} />
						<Select.Value placeholder="Sélectionner une ville" />
					</Select.Trigger>
					<Select.Content>
						<ScrollArea class="h-[200px]" orientation="vertical">
							{#each cityObjects as city}
								<Select.Item value={city.value} label={city.label}>{city.label}</Select.Item>
							{/each}
						</ScrollArea>
					</Select.Content>
				</Select.Root>
			</Form.Control>
			<Form.FieldErrors class="text-xs text-destructive" />
		</Form.Field>

		<!-- commune -->

		{#if $formData.city === 'abidjan'}
			<Form.Field {form} name="commune">
				<Form.Control let:attrs>
					<Form.Label class={!communeIsValid ? 'text-destructive' : ''}>Commune</Form.Label>
					<Select.Root
						disabled={$formData.city !== 'abidjan'}
						selected={selectCommune}
						onSelectedChange={(s) => {
							s && ($formData.commune = s.value);
							communeIsValid = true;
						}}
					>
						<Select.Trigger class="w-full">
							<Select.Input {...attrs} bind:value={$formData.commune} />
							<Select.Value placeholder="Sélectionner une ville" />
						</Select.Trigger>
						<Select.Content>
							<ScrollArea orientation="vertical" class="h-[200px]">
								{#each communeAbidjanObject as commune}
									<Select.Item value={commune.value} label={commune.label}
										>{commune.label}</Select.Item
									>
								{/each}
							</ScrollArea>
						</Select.Content>
					</Select.Root>
				</Form.Control>
				<Form.FieldErrors class="text-xs text-destructive" />
				{#if !communeIsValid}
					<span class="text-sm text-destructive"> Veillez sélectionner une commune </span>
				{/if}
			</Form.Field>
		{:else}
			<input type="hidden" name="commune" bind:value={$formData.commune} />
		{/if}

		<!-- #district -->

		<div class="field">
			<Form.Field {form} name="district">
				<Form.Control let:attrs>
					<Form.Label>Quartier</Form.Label>
					<Input
						type="text"
						bind:value={$formData.district}
						placeholder="exemple: Angré"
						autocomplete="off"
						{...attrs}
					/>
				</Form.Control>
				<Form.FieldErrors class="text-xs text-destructive" />
			</Form.Field>
		</div>

		<!-- Transaction type -->
		<div class="field">
			<Form.Field {form} name="transactionType">
				<Form.Control let:attrs>
					<Form.Label>Type de transaction</Form.Label>
					<Select.Root
						selected={selectedTransactionType}
						onSelectedChange={(v) => {
							v && ($formData.transactionType = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Selectionner le type de transaction" />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(transactionTypes) as [value, label]}
								<Select.Item {value} {label} />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.transactionType} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>

		<!-- state -->

		<!-- <div class="field">
			<Form.Field {form} name="state">
				<Form.Control let:attrs>
					<Form.Label>L'etat</Form.Label>
					<Select.Root
						selected={selectState}
						onSelectedChange={(s) => {
							s && ($formData.state = s.value);
						}}
					>
						<Select.Trigger class="w-full">
							<Select.Input {...attrs} bind:value={$formData.state} />
							<Select.Value placeholder="" />
						</Select.Trigger>
						<Select.Content>
							{#each Object.entries(states) as [value, label]}
								<Select.Item {value} {label}>{label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Form.Control>
				<Form.Description>Sélectionner l'etat du batiment (neuf par défaut)</Form.Description>
				<Form.FieldErrors class="text-xs text-destructive" />
			</Form.Field>
		</div> -->

		<!-- #calandare -->
		<div class=" grid gap-6">
			<!-- ##avalaible -->
			<div class="field">
				<Form.Field {form} name="available" class="flex flex-col">
					<Form.Control let:attrs>
						<Form.Label>Disponibilité</Form.Label>
						<Popover.Root>
							<Popover.Trigger
								{...attrs}
								class={cn(
									buttonVariants({ variant: 'outline' }),
									'w-full justify-start pl-4 text-left font-normal',
									!value1 && 'text-muted-foreground'
								)}
							>
								{value1 ? df1.format(value1.toDate(getLocalTimeZone())) : 'Choisir une date'}
								<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
							</Popover.Trigger>
							<Popover.Content class="w-auto p-0" side="top">
								<Calendar
									value={value1}
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
			<!-- ##end of availability -->
			{#if $formData.transactionType === 'saisonnière'}
				<div>
					<div class="field">
						<Form.Field {form} name="endOfAvailability" class="flex flex-col">
							<Form.Control let:attrs>
								<Form.Label>Fin de la disponibilité</Form.Label>
								<Popover.Root>
									<Popover.Trigger
										{...attrs}
										class={cn(
											buttonVariants({ variant: 'outline' }),
											'w-full justify-start pl-4 text-left font-normal',
											!value2 && 'text-muted-foreground'
										)}
									>
										{value2 ? df2.format(value2.toDate(getLocalTimeZone())) : 'Choisir une date'}
										<CalendarIcon class="ml-auto h-4 w-4 opacity-50" />
									</Popover.Trigger>
									<Popover.Content class="w-auto p-0" side="top">
										<Calendar
											value={value2}
											bind:placeholder={placeholder2}
											minValue={today(getLocalTimeZone())}
											calendarLabel="Date de disponibilité"
											initialFocus
											onValueChange={(v) => {
												if (v) {
													$formData.endOfAvailability = v.toString();
												} else {
													$formData.endOfAvailability = '';
												}
											}}
										/>
									</Popover.Content>
								</Popover.Root>
								<!-- <Form.Description>Your date of birth is used to calculator your age</Form.Description> -->
								<Form.FieldErrors />
								<input hidden value={$formData.endOfAvailability} name={attrs.name} />
							</Form.Control>
						</Form.Field>
					</div>
				</div>
			{/if}
		</div>
		<!-- #equipments -->
		<!-- <div class="field">
			<Field {form} name="equipments">
				<Control let:attrs>
					<Label>Les equipements</Label>
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
					<FieldErrors class="text-sm text-destructive" />
				</Control>
			</Field>
		</div> -->

		<!-- ## number of room -->
		<!-- <div>
			<div class="field">
				<Form.Field {form} name="numOfRoom">
					<Form.Control let:attrs>
						<Form.Label>Nombre de Chambres</Form.Label>
						<Input
							type="number"
							inputmode="numeric"
							min="0"
							autocomplete="off"
							{...attrs}
							bind:value={$formData.numOfRoom}
						/>
					</Form.Control>
					<Form.FieldErrors class="text-xs" />
				</Form.Field>
			</div>
		</div> -->

		<!-- <div>
			<div class="field">
				<Form.Field {form} name="numOfBath">
					<Form.Control let:attrs>
						<Form.Label>Nombre de salles de bains</Form.Label>
						<Input
							type="number"
							inputmode="numeric"
							min="0"
							autocomplete="off"
							{...attrs}
							bind:value={$formData.numOfBath}
						/>
					</Form.Control>
					<Form.FieldErrors class="text-xs" />
				</Form.Field>
			</div>
		</div> -->

		<!-- surface -->
		<div>
			<div class="field">
				<Form.Field {form} name="surface">
					<Form.Control let:attrs>
						<Form.Label>Superficie (m2)</Form.Label>
						<Input
							type="number"
							inputmode="numeric"
							min="0"
							autocomplete="off"
							{...attrs}
							bind:value={$formData.surface}
						/>
					</Form.Control>
					<Form.FieldErrors class="text-xs" />
				</Form.Field>
			</div>
		</div>

		<!-- images -->
		<div>
			<div class="field">
				<fieldset>
					<legend
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>Images</legend
					>
					{#each $formData.images as _, i}
						<label for="image {i + 1}" class="sr-only">
							image {i + 1}
						</label>
						<div class="mt-1 flex items-center gap-4">
							<Input
								accept="image/png, image/jpeg, image/webp, image/avif, image/svg"
								type="file"
								id="image {i + 1}"
								name="images"
								on:input={(e) => ($formData.images[i] = e.currentTarget.files?.item(0) ?? file)}
							/>
							<Button
								type="button"
								variant="destructive"
								on:click={() => {
									removeImageByIndex(i);
								}}
								size="icon"
							>
								<Trash class="icon" />
							</Button>
						</div>
					{/each}
					{#if $errors.images}
						<span class="text-xs text-destructive">{$errors.images[0] || ''}</span>
					{/if}
					{#if $errors.images?._errors}
						<span class="text-xs text-destructive">{$errors.images._errors[0] || ''}</span>
					{/if}
					<Button
						class="mt-2 w-full"
						type="button"
						variant="secondary"
						size="sm"
						on:click={addImage}>Ajouter une image</Button
					>
				</fieldset>
			</div>
		</div>

		<div>
			<div class="field">
				<Form.Field {form} name="price">
					<Form.Control let:attrs>
						<Form.Label>Prix (fcfa)</Form.Label>
						<Input
							type="number"
							inputmode="numeric"
							min="0"
							autocomplete="off"
							{...attrs}
							bind:value={$formData.price}
						/>
					</Form.Control>
					<Form.FieldErrors class="text-xs" />
				</Form.Field>
			</div>
		</div>

		<div>
			{#if $delayed}
				<Button class="w-full" disabled>
					<Reload class="mr-2 h-4 w-4 animate-spin" />
					Veillez patienter
				</Button>
			{:else}
				<Button type="submit" class="w-full">Créer</Button>
			{/if}
		</div>
	</form>
</section>
