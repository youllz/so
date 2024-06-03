<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Heart, Cross1, Share1, ChevronLeft, ChevronRight } from 'svelte-radix';
	import Send from '$lib/components/own/Send.svelte';
	import { createEventDispatcher } from 'svelte';

	export let images: string[];
	export let collectionId: string;
	export let announceId: string;

	export let idx: number;

	const dispatch = createEventDispatcher();
	function closeSlide() {
		dispatch('close');
	}
</script>

<div class=" flex h-[100dvh] w-[100%] items-center justify-center bg-background px-6">
	<div class="flex h-full w-full flex-col justify-around gap-4">
		<div class="flex items-center justify-between">
			<Button on:click={closeSlide} variant="ghost">
				<Cross1 class="icon mr-4" />
				Fermer
			</Button>

			<span> {idx + 1} / {images.length} </span>

			<ul class="flex items-center gap-2">
				<li>
					<Button variant="ghost" size="icon" class="rounded-full">
						<Share1 class="icon" />
					</Button>
				</li>
				<li>
					<Button variant="ghost" size="icon" class="rounded-full">
						<Heart class="icon" />
					</Button>
				</li>
			</ul>
		</div>

		<div class="flex items-center justify-between">
			<Button
				on:click={() => (idx = idx - 1)}
				disabled={idx === 0}
				size="icon"
				variant="outline"
				class="rounded-full"
			>
				<ChevronLeft class="icon" />
			</Button>
			<div class="h-[60dvh] w-[600px] border">
				<img
					src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{images[idx]}"
					alt=""
				/>
			</div>
			<Button
				on:click={() => (idx = idx + 1)}
				disabled={idx === images.length - 1}
				size="icon"
				variant="outline"
				class="rounded-full"
			>
				<ChevronRight class="icon" />
			</Button>
		</div>
	</div>
</div>
