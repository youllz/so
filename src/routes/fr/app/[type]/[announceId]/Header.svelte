<script lang="ts">
	import Send from '$lib/components/own/Send.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Heart } from 'svelte-radix';

	export let title: string;
</script>

<div class="flex items-center justify-between">
	<h1 class="text-2xl font-semibold">
		{title}
	</h1>

	<ul class="flex items-center gap-4">
		<li>
			<Send />
		</li>
		<li>
			<Button variant="ghost" size="sm">
				<Heart class="icon mr-4" />
				Enregistrer
			</Button>
		</li>
	</ul>
</div>
