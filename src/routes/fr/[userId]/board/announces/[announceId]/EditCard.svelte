<script lang="ts">
	import { Pencil2 } from 'svelte-radix';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let header: string;
	export let content: string;
	export let editable = true;
	let showEdit = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="  w-full rounded-md border bg-background p-4 shadow-sm">
	<div class="relative flex min-h-[35px] w-full items-center justify-between">
		<h2 class="text-xs font-semibold text-muted-foreground">
			{header}
		</h2>

		{#if editable}
			<div class="">
				<Dialog.Root>
					<Dialog.Trigger>
						<Tooltip.Root openDelay={300}>
							<Tooltip.Trigger asChild let:builder>
								<Button builders={[builder]} variant="ghost" size="icon" class="rounded-full">
									<Pencil2 class="size-4" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content class="bg-accent text-accent-foreground">
								<p>Modifier</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Dialog.Trigger>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>{header}</Dialog.Title>
							<Dialog.Description>
								Modifier l'élément {header}
							</Dialog.Description>
						</Dialog.Header>
						<div>
							<slot><!-- optional fallback --></slot>
						</div>
						<Dialog.Footer>
							<Button type="submit" size="sm">Sauvegarder</Button>
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		{/if}
	</div>
	<p>
		{content}
	</p>
</div>
