<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
</script>

<Tooltip.Root openDelay={300}>
	<Tooltip.Trigger>
		<Button class="rounded-full" variant="ghost" size="icon">
			<Pencil2 class="icon" />
			<span class="sr-only">Modifier</span>
		</Button>
	</Tooltip.Trigger>
	<Tooltip.Content class="">
		<p>Modifier</p>
	</Tooltip.Content>
</Tooltip.Root>
