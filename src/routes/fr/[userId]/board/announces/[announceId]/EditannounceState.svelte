<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	export let content: string;
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Pencil2 } from 'svelte-radix';
	import * as Tooltip from '$lib/components/ui/tooltip';
</script>

<div class="grid w-full gap-1 rounded-md border bg-background p-4 shadow-md">
	<div class="flex min-h-[40px] items-center justify-between">
		<h2 class="text-xs font-semibold text-muted-foreground">Status de l'annonce</h2>

		<div class="">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Tooltip.Root openDelay={300}>
						<Tooltip.Trigger>
							<Button variant="outline" size="icon" class="rounded-full">
								<Pencil2 class="size-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content class="bg-accent text-accent-foreground">
							<p>Modifier</p>
						</Tooltip.Content>
					</Tooltip.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<form action="" method="POST">
							<DropdownMenu.Item
								><button formaction="" class="w-full text-left">Activé</button></DropdownMenu.Item
							>
							<DropdownMenu.Item
								><button formaction="" class="w-full text-left">Désactivé</button
								></DropdownMenu.Item
							>
							<DropdownMenu.Item
								><button formaction="" class="w-full text-left">Archivé</button></DropdownMenu.Item
							>
						</form>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>

	<p>
		{content || 'Activé'}
	</p>
</div>
