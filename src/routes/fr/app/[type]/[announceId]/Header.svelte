<script lang="ts">
	import { page } from '$app/stores';
	import Send from '$lib/components/own/Send.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, Heart } from 'svelte-radix';

	export let title: string;
	export let propertyType: string;
	// export let propertyType: string

	$: console.log($page.url.searchParams.get('from'));
</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-4">
		<!-- {#if !$page.url.pathname.includes("/search")}
			<Button href="/fr/app/{propertyType}" variant="ghost" size="icon" class="rounded-full">
				<ChevronLeft class="icon"/>
			</Button>
	{/if} -->

		<h1 class="text-2xl font-semibold">
			{title}
		</h1>
	</div>

	<ul class="flex items-center gap-4">
		<li>
			<!-- <Send /> -->
		</li>
		<li>
			<slot><!-- optional fallback --></slot>
		</li>
	</ul>
</div>
