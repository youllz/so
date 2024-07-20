<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import { DateFormatter } from '@internationalized/date';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { expoInOut } from 'svelte/easing';
	import { CaretLeft, CaretRight, Cross1, Download } from 'svelte-radix';
	import { Button } from '$lib/components/ui/button';
	import type { AnnouncesResponse, MessagesContentTypeOptions } from '$lib/pocketbaseType';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { firstCapitalize, formatFCFA } from '$lib/utils';

	export let message: string;
	export let date: string;
	export let contenType: MessagesContentTypeOptions;
	export let collectionId: string;
	export let recordId: string;
	export let photos: string[] | undefined = undefined;
	export let announceData: AnnouncesResponse | undefined = undefined;

	let displayImages = false;
	let index = 0;

	const df = new DateFormatter('fr-FR', {
		dateStyle: 'medium',

		timeStyle: 'short'
	});
</script>

<div
	transition:fade={{ delay: 2000, duration: 1000 }}
	class="min-h-[30px] w-fit max-w-[80%] self-end rounded-md"
>
	{#if contenType === 'message'}
		<div class=" box w-fit bg-primary text-primary-foreground">
			<p class="text-balance p-4 text-left">
				{message}
			</p>
		</div>
		<p class="mt-2 text-right text-xs text-muted-foreground">
			{df.format(new Date(date))}
		</p>
	{/if}

	{#if contenType === 'photos'}
		<div class="box bg-primary p-4 text-primary-foreground">
			<ScrollArea orientation="vertical" class="h-[220px]">
				<div class="mx-4 grid gap-2">
					{#if photos}
						{#each photos as photo, idx}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<figure
								on:click={() => {
									displayImages = true;
									index = idx;
								}}
								class="h-[200px] w-[250px] cursor-pointer"
							>
								<img
									src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{photo}"
									alt=""
									class="aspect-square h-full w-full rounded-md object-cover"
								/>
							</figure>
						{/each}
					{/if}
				</div>
			</ScrollArea>
			{#if message}
				<p class="mt-2 max-w-[250px] text-balance">{message}</p>
			{/if}
		</div>
		<p class="mt-2 text-right text-xs text-muted-foreground">
			{df.format(new Date(date))}
		</p>
	{/if}
</div>

{#if photos}
	{#if displayImages}
		<div
			transition:slide={{ axis: 'y', duration: 800, easing: expoInOut }}
			class="fixed bottom-0 left-0 z-40 flex h-[100dvh] w-[100dvw] flex-col justify-between bg-card p-6 text-card-foreground"
		>
			<div class="flex items-center justify-between">
				<div>
					<Button on:click={() => (displayImages = false)} variant="ghost" size="sm">
						<Cross1 class="icon mr-4" />
						Fermer
					</Button>
				</div>
				{#if message}
					<p>{message}</p>
				{/if}
				<div>
					<Button
						download={photos[0]}
						target="_blank"
						href="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{photos[index]}"
						variant="ghost"
						size="sm"
					>
						<Download class="icon mr-4" />
						Télécharger
					</Button>
				</div>
			</div>
			<div class="flex items-center justify-around">
				<Button
					disabled={index === 0}
					on:click={() => (index -= 1)}
					variant="outline"
					size="icon"
					class="rounded-full"
				>
					<CaretLeft class="icon" />
				</Button>
				<div class=" ">
					<figure>
						<img
							class="h-full w-full rounded-md object-cover"
							src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{photos[index]}"
							alt=""
						/>
					</figure>
				</div>
				<Button
					disabled={index === photos.length - 1}
					on:click={() => (index += 1)}
					variant="outline"
					size="icon"
					class="rounded-full"
				>
					<CaretRight class="icon" />
				</Button>
			</div>
			<div class="text-center">
				<span>{index + 1}</span> /
				<span>{photos.length}</span>
			</div>
		</div>
	{/if}
{/if}
{#if contenType === 'announceLink' && announceData}
	<div class="box w-fit max-w-[80%] self-end bg-primary p-4 text-primary-foreground">
		<div>
			<HoverCard.Root>
				<HoverCard.Trigger
					href="/fr/app/{announceData.propertyType}
				/{announceData.id}"
					class="underline underline-offset-2 ">Motif de la conversation</HoverCard.Trigger
				>
				<HoverCard.Content>
					<div>
						<figure>
							<img
								src="{PUBLIC_POCKETBASE}/api/files/{announceData?.collectionId}/{announceData?.id}/{announceData
									?.images[0]}"
								class="h-full w-full rounded-md object-cover"
								alt=""
							/>
						</figure>
						<div class="mt-4 text-sm">
							<p class="font-semibold">
								{firstCapitalize(announceData?.propertyType)}
							</p>
							<p class="font-semibold">
								{firstCapitalize(announceData?.transactionType)}
							</p>
							<p class="text-muted-foreground">
								{firstCapitalize(announceData?.city)}
							</p>

							<p class="mt-4">
								{formatFCFA(announceData?.price.toString())}
							</p>
						</div>
					</div>
				</HoverCard.Content>
			</HoverCard.Root>
			<div class="mt-4">
				<p class="text-balance">
					{message}
				</p>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.box {
		/* border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px; */
		border-radius: theme(borderRadius.lg);
	}
</style>
