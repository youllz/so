<script lang="ts">
	import Send from '$lib/components/own/Send.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, Heart } from 'svelte-radix';


	export let title: string;
	// export let propertyType: string

</script>

<div class="flex items-center justify-between">
	<div class="flex items-center gap-4">
		<!-- <Button href="/fr/app/{propertyType}" variant="ghost" size="icon" class="rounded-full">
			<ChevronLeft class="icon"/>
		</Button> -->

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
