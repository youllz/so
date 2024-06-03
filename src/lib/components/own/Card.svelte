<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Carousel from '$lib/components/ui/carousel';
	import {} from 'svelte-radix';
	import Badge from './Badge.svelte';
	import { page } from '$app/stores';

	export let images: string[]
	export let propertyType:string
	export let transactionType: string
	export let city:string
	export let commune:string
	export let price:string
	export let collectionId:string
	export let recordId


</script>

<Carousel.Root class="w-full ">
	<a href="/fr/app/{$page.params.type ?? propertyType}/{recordId}">
		<Carousel.Content class="-ml-1 ">
			{#each images as image}
				<Carousel.Item >
					<div class="p-1 ">
						<div class="h-[18rem] w-[100%] ">
							<img src="http://127.0.0.1:8090/api/files/{collectionId}/{recordId}/{image}" alt="" class="h-full w-full rounded-lg object-cover" />
						</div>
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<div class="mt-4 w-full px-1">
			<div class="flex items-center justify-between">
				<span> {propertyType} </span>
				<Badge />
			</div>
    <div class="grid ">

      <span class="tex-xs font-light text-muted-foreground">
        {transactionType}
      </span>
      <span class="tex-xs font-light text-muted-foreground">
        {city} {commune === "none" ? '' : commune}
      </span>
      <span class=" font-semibold">
        {price} <span>
          fcfa
        </span>
      </span>
    </div>
		</div>
	</a>
	<Carousel.Previous class="z-30" />
	<Carousel.Next class="z-30" />
</Carousel.Root>
