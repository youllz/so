<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Tooltip from './Tooltip.svelte';
	export let content: string = 'activé';
</script>

<div class="rounded-md border bg-background p-4 text-foreground shadow-sm">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-medium text-muted-foreground">Status</h2>
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Tooltip />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<form method="POST">
							<DropdownMenu.Item><button formaction="?/active">Activé</button></DropdownMenu.Item>
							<DropdownMenu.Item
								><button formaction="?/disabled">Désactivé</button></DropdownMenu.Item
							>
							<DropdownMenu.Item><button formaction="?/archive">Archivé</button></DropdownMenu.Item>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<p class="flex gap-4">
		<span>Activé</span>
		<span
			class="size-4 rounded-full"
			class:bg-green-500={content === 'activé'}
			class:bg-orange-500={content === 'désactivé'}
			class:bg-red-500={content === 'archivé'}
		></span>
	</p>
</div>
