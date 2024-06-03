<script lang="ts">
	import type { PageData } from './$types';
	import EditCard from './EditCard.svelte';
	import EditImage from './EditImage.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/';
	import { Button } from '$lib/components/ui/button';
	import { Rocket, ChevronLeft } from 'svelte-radix';
	import { DateFormatter } from '@internationalized/date';
	import { superForm } from 'sveltekit-superforms';
	import DescriptionCard from './DescriptionCard.svelte';
	import TransactionCard from './TransactionCard.svelte';
	import StateCard from './StateCard.svelte';
	import CityCard from './CityCard.svelte';
	import CommuneCard from './CommuneCard.svelte';
	import RoomCard from './RoomCard.svelte';
	import BathCard from './BathCard.svelte';
	import SurfaceCard from './SurfaceCard.svelte';
	import PriceCard from './PriceCard.svelte';
	import AvailableCard from './AvailableCard.svelte';
	import EndOfAvailableCard from './EndOfAvailableCard.svelte';
	import EquipmentCard from './EquipmentCard.svelte';
	import AnnounceState from './AnnounceState.svelte';
	import Chart from './Chart.svelte';
	import { mediaQuery } from 'svelte-legos';
	import TitleCard from './TitleCard.svelte';
	import { onMount } from 'svelte';
	import Skeleton from './Skeleton.svelte';
	import Send from '$lib/components/own/Send.svelte';

	export let data: PageData;

	const isDesktop = mediaQuery('(min-width: 768px)');
	let open = false;

	$: ({ announce } = data);

	const df = new DateFormatter('fr-FR', {
		dateStyle: 'full'
	});

	// created
	$: created = announce.created.split(' ')[0];
	$: createDay = new Date(created);

	// available
	$: available = announce.available.split(' ')[0];

	let load = true;
	onMount(() => {
		load = false;
	});
</script>

{#if !load}
	<section class="">

		<div>
			<div class="flex justify-between items-center px-4">
				<Button variant="outline" class="rounded-full " size="icon">
					<ChevronLeft class="icon "/>
				</Button>
				<Send img={announce.images[0]} announceId={announce.id} collectionId={announce.collectionId} city={announce.city} property={announce.propertyType} transaction={announce.transactionType}/>
			</div>	

			<div class="px-4 mt-4">
				<TitleCard content={announce.title} data={data.titleForm}/>
			</div>


		</div>

		<!-- images -->
		<div class="w-full">
			<EditImage
				{data}
				collectionId={announce.collectionId}
				announceId={announce.id}
				images={announce.images}
			/>
		</div>

		<div class="card-container mt-6 grid grid-cols-2 gap-4 max-md:grid-cols-1">
			<!-- card-container_1 -->
			<ScrollArea
				class=" layer h-[400px] whitespace-nowrap rounded-md border p-4"
				orientation="vertical"
			>
				<div class="  grid grid-cols-2 gap-2 max-md:grid-cols-1">
					<EditCard header="Type" editable={false} content={announce.propertyType}></EditCard>
					<TransactionCard content={announce.transactionType} data={data.transactionForm} />
					<SurfaceCard content={announce.surface} data={data.surfaceForm} />
					<PriceCard content={announce.price} data={data.priceForm} />
					<CityCard content={announce.city} data={data.cityForm} />
					<!-- commune -->
					{#if announce.commune === 'none' && announce.city === 'abidjan'}
						<CommuneCard content={announce.commune} data={data.communeForm} />
					{/if}
					{#if announce.commune !== 'none' && announce.city === 'abidjan'}
						<CommuneCard content={announce.commune} data={data.communeForm} />
					{/if}

					<AvailableCard content={announce.available.split(' ')[0]} data={data.availableForm} />

					{#if announce.transactionType === 'saisonnière'}
						<EndOfAvailableCard
							content={announce.endOfAvailability.split(' ')[0]}
							data={data.endOfAvaibleForm}
						/>
					{/if}

					<!-- variable -->
					{#if announce.propertyType === 'maison' || announce.propertyType === 'appartement'}
						<RoomCard content={announce.numOfRoom} data={data.roomForm} />
						<BathCard
							content={announce.numOfBath}
							data={data.bathForm}
							propertyType={announce.propertyType}
						/>
						<StateCard content={announce.state} data={data.stateForm} />
					{/if}

					{#if announce.propertyType === 'bureau'}
						<BathCard
							content={announce.numOfBath}
							data={data.bathForm}
							propertyType={announce.propertyType}
						/>
					{/if}
				</div>
				{#if announce.propertyType === 'maison' || announce.propertyType === 'appartement' || announce.propertyType === 'bureau'}
					<div class="mt-2 w-full">
						<EquipmentCard content={announce.equipments} data={data.equipmentsForm} />
					</div>
				{/if}
				<!--  -->
			</ScrollArea>

			<!-- card container 2 -->
			<ScrollArea
				class=" layer h-[400px] whitespace-nowrap rounded-md border p-4 "
				orientation="vertical"
			>
				<DescriptionCard data={data.descriptionForm} content={announce.description} />
			</ScrollArea>
		</div>
		<div class="stat-container layer rounded-md border p-4 max-md:grid-cols-1">
			<div>
				<Chart />
			</div>
			<div class=" stat-card rounded-md border p-4">
				<div class="rounded-md border bg-background p-4 text-foreground shadow-sm">
					<h2 class="text-sm font-medium text-muted-foreground">Nombre total de clics</h2>
					<p>400</p>
				</div>
				<AnnounceState content={announce.announceState} />
				<div
					class="flex items-center justify-center rounded-md border bg-background p-4 text-foreground shadow-sm"
				>
					<Button>
						<Rocket class="icon mr-4" /> Mettre en avant
					</Button>
				</div>
			</div>
		</div>

		<!-- <ChartStat/> -->
	</section>
{:else}
	<Skeleton />
{/if}

<style lang="postcss">
	.stat-container {
		display: grid;
		grid-template-columns: 3fr 1fr;
		min-height: 300px;
		gap: 5px;
	}

	.stat-card {
		display: grid;
		grid-auto-rows: minmax(100px, auto);
		gap: 1rem;
	}

	@media (width < 768px) {
		.stat-container {
			grid-template-columns: 1fr;
		}

		.stat-card {
			order: 0;
		}
	}
</style>
