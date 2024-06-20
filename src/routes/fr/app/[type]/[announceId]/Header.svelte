<script lang="ts">
	export let title: string;
	// export let propertyType: string
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
			<slot name="send"><!-- optional fallback --></slot>
		</li>
		<li>
			<slot name="save"><!-- optional fallback --></slot>
		</li>
	</ul>
</div>
