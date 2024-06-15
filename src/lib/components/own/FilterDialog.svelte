<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { MixerHorizontal } from 'svelte-radix';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import { firstCapitalize } from '$lib/utils';
	import { cityObjects, communeAbidjanObject } from '$lib/data';
	import * as Select from '../ui/select';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { page } from '$app/stores';
	import { resultFound } from '$lib/store';
	import { enhance } from '$app/forms';

	let open = true;

	const propertyTypeList = ['maison', 'appartement', 'terrain', 'bureau', 'magasin', 'local'];
	const equipementsList = [
		{
			id: 'balcon',
			label: 'Balcon'
		},
		{
			id: 'arrièreCour',
			label: 'arrière-cour'
		},
		{
			id: 'avantCour',
			label: 'avant-cour'
		},
		{
			id: 'garage',
			label: 'garage'
		},
		{
			id: 'terrasse',
			label: 'terrasse'
		},
		{
			id: 'jardin',
			label: 'jardin'
		},
		{
			id: 'piscine',
			label: 'piscine'
		}
	];

	const equipments = queryParam('equipments', ssp.object(['']));
	$: equipmentsV = $page.url.searchParams.getAll('equipments'); //[''] //$equipments as string[]

	const minPrice = queryParam('minPrice', ssp.number(0));
	const maxPrice = queryParam('maxPrice', ssp.number(10000000000));

	const propertyType = queryParam('propertyType', ssp.string(''));
	$: propertyTypeV = $propertyType as string;

	const transactionType = queryParam('transactionType', ssp.string(''));
	$: transactionTypeV = $transactionType as string;

	const state = queryParam('state', ssp.string(''));
	$: stateV = $state as string;

	const city = queryParam('city', ssp.string(''));
	$: cityV = $city as string;

	const commune = queryParam('commune', ssp.string(''));
	$: communeV = $commune as string;

	const district = queryParam('district', ssp.string(''));

	const numOfRoom = queryParam('numOfRoom', ssp.number(0));
	$: numOfRoomV = $numOfRoom as number;

	const numOfBath = queryParam('numOfBath', ssp.number(0));
	$: numOfBathV = $numOfBath as number;

	const minSurface = queryParam('minSurface', ssp.number(0));
	const maxSurface = queryParam('maxSurface', ssp.number(100000));

	$: selectCity = {
		label: firstCapitalize(cityV),
		value: cityV
	};
	$: selectCommune = {
		label: firstCapitalize(communeV),
		value: communeV
	};
	let formEl: HTMLFormElement;

	function addItem(id: string) {
		equipmentsV = [...equipmentsV, id.toLowerCase()];
		// $equipments = equipmentsV
	}

	function removeItem(id: string) {
		equipmentsV = equipmentsV.filter((i) => i !== id);
		// $equipments = equipmentsV
	}

	$: if ($city !== 'abidjan') {
		$commune = '';
	}

	// $: console.log($equipments)

	function resetForm() {
		$propertyType = '';
		$transactionType = '';
		$state = '';
		$city = '';
		$commune = '';
	}
</script>

{#if !$page.url.pathname.includes('/search')}
	<Button href="/fr/app/search" variant="secondary">
		<MixerHorizontal class="icon mr-4" />
		Recherche avec filtre
	</Button>
{:else}
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<Button variant="secondary">
				<MixerHorizontal class="icon mr-4" />
				Recherche avec filtre
			</Button>
		</Dialog.Trigger>
		<Dialog.Content class="h-[90dvh] max-w-[800px]">
			<Dialog.Header>
				<Dialog.Title>Filtres</Dialog.Title>

				<!-- <Dialog.Description>
					This action cannot be undone. This will permanently delete your account and remove your data
					from our servers.
				</Dialog.Description> -->
			</Dialog.Header>

			<ScrollArea orientation="vertical" class="h-[60dvh]">
				<div class="mt-6">
					<form action="/fr/app/search" method="GET" bind:this={formEl} class="grid gap-6 px-2">
						<!-- price -->
						<div class="field">
							<p class="title">Fourchette de prix</p>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label for="min" class="label"> Minimun</label>
									<Input
										type="number"
										inputmode="numeric"
										id="min"
										name="minPrice"
										min="0"
										bind:value={$minPrice}
									/>
								</div>
								<div>
									<label for="max" class="label">Maximun</label>
									<Input
										type="number"
										inputmode="numeric"
										id="max"
										name="maxPrice"
										min={$minPrice}
										bind:value={$maxPrice}
									/>
								</div>
							</div>
						</div>

						<Separator />

						<!-- property type -->

						<div class="field">
							<p class="title">Type de propriété</p>

							<ScrollArea orientation="horizontal">
								<ToggleGroup.Root
									onValueChange={(v) => {
										if (v) {
											$propertyType = v;
										} else {
											$propertyType = '';
										}
									}}
									value={propertyTypeV}
									type="single"
									size="lg"
									variant="outline"
									class="mb-2 justify-start"
								>
									<ToggleGroup.Item value="" class="flex-1 rounded-full">Tout</ToggleGroup.Item>
									{#each propertyTypeList as item}
										<ToggleGroup.Item value={item} class="flex-1 rounded-full"
											>{firstCapitalize(item)}</ToggleGroup.Item
										>
									{/each}
								</ToggleGroup.Root>
							</ScrollArea>
							<Input type="hidden" name="propertyType" value={$propertyType} />
						</div>
						<!-- <Separator /> -->

						<!-- transaction type -->

						<div class="field">
							<p class="title">Type de transaction</p>
							<div>
								<ScrollArea orientation="horizontal">
									<ToggleGroup.Root
										onValueChange={(v) => {
											if (v) {
												$transactionType = v;
											} else {
												$transactionType = '';
											}
										}}
										value={transactionTypeV}
										type="single"
										size="lg"
										variant="outline"
										class="mb-2 justify-start"
									>
										<ToggleGroup.Item value="" class="flex-1 rounded-full">Tout</ToggleGroup.Item>
										<ToggleGroup.Item value="location" class="flex-1 rounded-full"
											>Location</ToggleGroup.Item
										>
										<ToggleGroup.Item value="vente" class="flex-1 rounded-full"
											>Vente</ToggleGroup.Item
										>
										<ToggleGroup.Item value="location saisonnière" class="flex-1 rounded-full"
											>Location saisonnière</ToggleGroup.Item
										>
									</ToggleGroup.Root>
								</ScrollArea>
							</div>
							<Input type="hidden" name="transactionType" value={$transactionType} />
						</div>

						<!-- state -->
						{#if $propertyType !== 'terrain'}
							<div class="field">
								<p class="title">Etat de la propriété</p>
								<ScrollArea orientation="horizontal">
									<ToggleGroup.Root
										type="single"
										variant="outline"
										size="lg"
										onValueChange={(v) => {
											if (v) {
												$state = v;
											} else {
												$state = '';
											}
										}}
										value={stateV}
										class="justify-start"
									>
										<ToggleGroup.Item class="flex-1 rounded-full" value="">Tout</ToggleGroup.Item>
										<ToggleGroup.Item class="flex-1 rounded-full" value="neuf"
											>Neuf</ToggleGroup.Item
										>
										<ToggleGroup.Item class="flex-1 rounded-full" value="occasion"
											>Occasion</ToggleGroup.Item
										>
										<ToggleGroup.Item class="flex-1 rounded-full" value="en construction"
											>En construction</ToggleGroup.Item
										>
									</ToggleGroup.Root>
								</ScrollArea>

								<Input type="hidden" name="state" value={$state} />
							</div>
						{/if}
						<Separator />

						<!-- city -->
						<div class="field">
							<p class="title">Ville</p>

							<div class="">
								<Select.Root
									bind:selected={selectCity}
									onSelectedChange={(v) => {
										if (v) {
											$city = v.value;
										} else {
											$city = '';
										}
									}}
								>
									<Select.Trigger class="w-full">
										<Select.Input
											id="city"
											name="city"
											autocomplete="off"
											value={selectCity.value}
										/>
										<Select.Value placeholder="Sélectionner la ville" />
									</Select.Trigger>
									<Select.Content class="">
										<ScrollArea orientation="vertical" class="h-[200px]">
											<Select.Item value="" label="tout">Tout</Select.Item>
											{#each cityObjects as city}
												<Select.Item value={city.value} label={city.label}>{city.label}</Select.Item
												>
											{/each}
										</ScrollArea>
									</Select.Content>
								</Select.Root>
							</div>
						</div>

						<!-- <Separator /> -->

						<!-- commune -->

						{#if selectCity.value === 'abidjan'}
							<div class="field">
								<p class="title">Commune</p>

								<div class="">
									<Select.Root
										bind:selected={selectCommune}
										onSelectedChange={(v) => {
											if (v) {
												$commune = v.value;
											} else {
												$commune = '';
											}
										}}
									>
										<Select.Trigger class="w-full">
											<Select.Input
												id="commune"
												name="commune"
												autocomplete="off"
												value={selectCommune.value}
											/>
											<Select.Value placeholder="Sélectionner la commune" />
										</Select.Trigger>
										<Select.Content class="">
											<ScrollArea orientation="vertical" class="h-[200px]">
												<Select.Item value="tout" label="tout">Tout</Select.Item>
												<Select.Item value="" label="Tout">Tout</Select.Item>
												{#each communeAbidjanObject as commune}
													<Select.Item value={commune.value} label={commune.label}
														>{commune.label}</Select.Item
													>
												{/each}
											</ScrollArea>
										</Select.Content>
									</Select.Root>
								</div>
							</div>
						{/if}

						<!-- district -->
						<div class="field">
							<p class="title">Quartier</p>
							<Input type="text" name="district" autocomplete="off" bind:value={$district} />
						</div>
						<!-- surface -->

						<div class="field">
							<p class="title">Superficie</p>
							<div class="grid grid-cols-2 gap-4">
								<div>
									<label class="label" for="minSurface">Minimun</label>
									<Input
										type="number"
										min="0"
										inputmode="numeric"
										name="minSurface"
										bind:value={$minSurface}
									/>
								</div>
								<div>
									<label class="label" for="maxSurface">Maximun</label>
									<Input
										type="number"
										min="0"
										inputmode="numeric"
										name="maxSurface"
										bind:value={$maxSurface}
									/>
								</div>
							</div>
						</div>

						<!-- Room -->

						{#if $propertyType === 'maison' || $propertyType === 'appartement'}
							<div class="field">
								<p class="title">Chambres</p>

								<ScrollArea orientation="horizontal">
									<ToggleGroup.Root
										onValueChange={(v) => {
											if (v) {
												$numOfRoom = Number(v);
											} else {
												$numOfRoom = 0;
											}
										}}
										value={numOfRoomV.toString()}
										type="single"
										size="lg"
										variant="outline"
										class="mb-2 justify-start"
									>
										<ToggleGroup.Item value="" class="flex-1 rounded-full">Tout</ToggleGroup.Item>

										{#each { length: 7 } as _, idx}
											<ToggleGroup.Item value={String(idx + 1)} class="flex-1 rounded-full"
												>{idx + 1}</ToggleGroup.Item
											>
										{/each}
										<ToggleGroup.Item value="8" class="flex-1 rounded-full">8+</ToggleGroup.Item>
									</ToggleGroup.Root>
								</ScrollArea>
								<Input type="hidden" name="numOfRoom" value={$numOfRoom} />
							</div>
						{/if}

						<!-- Bath -->

						{#if $propertyType === 'maison' || $propertyType === 'appartement' || $propertyType === 'burreau'}
							<div class="field">
								<p class="title">
									{$propertyType === 'burreau' ? 'Toilettes' : 'Salle de bains'}
								</p>
								<ScrollArea orientation="horizontal">
									<ToggleGroup.Root
										onValueChange={(v) => {
											if (v) {
												$numOfBath = Number(v);
											} else {
												$numOfBath = 0;
											}
										}}
										value={numOfBathV.toString()}
										type="single"
										size="lg"
										variant="outline"
										class="mb-2 justify-start"
									>
										<ToggleGroup.Item value="" class="flex-1 rounded-full">Tout</ToggleGroup.Item>

										{#each { length: 7 } as _, idx}
											<ToggleGroup.Item value={String(idx + 1)} class="flex-1 rounded-full"
												>{idx + 1}</ToggleGroup.Item
											>
										{/each}
										<ToggleGroup.Item value="8" class="flex-1 rounded-full">8+</ToggleGroup.Item>
									</ToggleGroup.Root>
								</ScrollArea>
								<Input type="hidden" name="numOfBath" value={$numOfBath} />
							</div>
						{/if}

						<Separator />

						<!-- equipments -->
						<!-- <div class="field">
							<p class="title">EquipementsList</p>
							<div class="grid grid-cols-2 gap-3">
								{#each equipementsList as item}
									{@const checked = equipmentsV?.includes(item.label)}
									<div class="flex items-center gap-3">
										<Checkbox
											{checked}
											onCheckedChange={(v) => {
												if (v) {
													addItem(item.label.toLowerCase());
												} else {
													removeItem(item.label.toLowerCase());
												}
											}}
											id={item.id}
											name="equipments"
											value={item.label}
										/>
										<label for={item.id}>{item.label} </label>
										<input
											hidden
											type="checkbox"
											name="equipments"
											value={item.label.toLowerCase()}
											{checked}
										/>
									</div>
								{/each}
							</div>
						</div> -->
					</form>
				</div>
			</ScrollArea>
			<div class="flex items-center justify-between">
				<Button
					on:click={() => {
						formEl.reset();
						resetForm()
					}}
					variant="ghost">Tout effacer</Button
				>
				<Button
					variant="secondary"
					on:click={() => {
						// formEl.submit()
						open = false;
					}}
					>Résultat(s) trouvé(s) : {$resultFound}
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<style lang="postcss">
	.title {
		@apply text-lg font-semibold;
	}

	.label {
		@apply text-sm font-light;
	}

	.field {
		@apply grid gap-3;
	}
</style>
