<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Image } from 'svelte-radix';

	export let allImages: string[];
	export let collectionId: string;
	export let announceId: string;
	export let propertyType: string;

	$: images = allImages;
	 $: imageSlice = [...images.slice(1)]
</script>

<div class="relative mt-6 grid h-[400px] grid-cols-2 gap-2 rounded-md">
	<div class="h-[400px] overflow-hidden">
		<a href="/fr/app/{propertyType}/{announceId}/images">
			<img
				src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{allImages[0]}"
				alt="maison"
				class="rounded-s-md"
			/>
		</a>
	</div>
	<div class="img-container">
		{#each imageSlice as img}
			<div class="overflow-hidden">
				<a href="/fr/app/{propertyType}/{announceId}/images">
					<img
						src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{img}"
						alt="maison"
					/>
				</a>
			</div>
		{/each}
		<!-- <div class="overflow-hidden"> 
			<img
				src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{allImages[1]}"
				alt="maison"
			/>
		</div>
		<div class="overflow-hidden">
			<img
				src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{allImages[2]}"
				alt="maison"
        class="rounded-se-md"
			/>
		</div>
		<div class="overflow-hidden">
			<img
				src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{allImages[
          3
        ]}"
				alt="maison"
			/>
		</div>
		<div class="overflow-hidden">
			<img
				src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{allImages[
          4
        ]}"
				alt="maison"
        class="rounded-ee-md "
			/>
		</div> -->
	</div>
	<div class="absolute bottom-[10%] right-[2%]">
		<Button href="/fr/app/{propertyType}/{announceId}/images" variant="outline" size="sm">
			<Image class="icon mr-4" />
			Affichier toutes les images
		</Button>
	</div>
</div>

<style lang="postcss">
	img {
		@apply h-full w-full object-cover transition-transform hover:scale-[1.03];
	}

	.img-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		/* grid-auto-rows: minmax(400px, auto); */
		gap: 0.5rem;
		height: 100%;
		height: 400px;
	}
</style>
