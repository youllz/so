<script lang="ts">
	import { fade, fly, slide } from 'svelte/transition';
	import { DateFormatter } from '@internationalized/date';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { expoInOut } from 'svelte/easing';
	import { CaretLeft, CaretRight, Cross1, Download } from 'svelte-radix';
	import { Button } from '$lib/components/ui/button';

	export let message: string;
	export let date: string;
	export let contenType: string;
	export let collectionId: string;
	export let recordId: string;
	export let images: string[] | undefined = undefined;

	let displayImages = false;
	let index = 0;

	const df = new DateFormatter('fr-FR', {
		dateStyle: 'medium',

		timeStyle: 'medium'
	});
</script>

<div
	transition:fade={{ delay: 2000, duration: 1000 }}
	class="min-h-[30px] max-w-[80%] self-end rounded-md"
>
	{#if contenType === 'message'}
		<div class=" box bg-primary text-primary-foreground">
			<p class="text-balance p-4">
				{message}
			</p>
		</div>
		<p class="mt-2 text-right text-xs text-muted-foreground">
			{df.format(new Date(date))}
		</p>
	{/if}

	{#if contenType === 'photo'}
		<div class="box bg-primary p-6 text-primary-foreground">
			<ScrollArea orientation="vertical" class="h-[220px]">
				<div class="mx-4 grid gap-2">
					{#if images}
						{#each images as image, idx}
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
									src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{image}"
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

{#if images}
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
						download={images[0]}
						target="_blank"
						href="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{images[index]}"
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
							src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{images[index]}"
							alt=""
						/>
					</figure>
				</div>
				<Button
					disabled={index === images.length - 1}
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
				<span>{images.length}</span>
			</div>
		</div>
	{/if}
{/if}

<style>
	.box {
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		border-bottom-right-radius: 30px;
	}
</style>
