<script lang="ts">
	import { enhance } from '$app/forms';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { DotsVertical } from 'svelte-radix';
	import { DateFormatter } from '@internationalized/date';
	import { fade } from 'svelte/transition';
	import { firstCapitalize } from '$lib/utils';
	import { PUBLIC_POCKETBASE } from '$env/static/public';

	export let image: string;
	export let title: string;
	export let description;
	export let collectionId: string;
	export let recordId: string;
	export let status: string;
	export let created: string;
	export let userId: string;
	export let property: string;
	export let transaction: string;

	const df = new DateFormatter('fr-FR', {
		dateStyle: 'full'
	});
	const day = new Date(created);
</script>

<div transition:fade class="card flex flex-col justify-between">
	<div class="grid gap-4">
		<div class="px-2">
			<p class="line-clamp-2 text-xl font-semibold">
				{title}
			</p>
		</div>
		<figure class="h-[15rem] w-full overflow-hidden">
			<a href="/fr/{userId}/board/announces/{recordId}">
				<img
					src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{recordId}/{image}"
					alt=""
					class="h-full w-full rounded-md object-cover"
				/>
			</a>
		</figure>

		<div class="grid gap-4 p-2">
			<!--  -->
			<div class="grid gap-1 text-sm">
				<p>{firstCapitalize(property)}</p>
				<p>{firstCapitalize(transaction)}</p>
			</div>
			<div class=" ">
				<p class="mt-1 line-clamp-4 text-balance text-sm">
					{description}
				</p>
			</div>
			<!--  -->
			<div class="">
				<span class="text-xs text-muted-foreground">
					Créer le {df.format(day)}
				</span>
			</div>
		</div>
	</div>
	<div class="mt-4 flex items-center justify-between p-2">
		<Badge variant="outline">
			<span
				class:text-destructive={status === 'archivé'}
				class:text-orange-500={status === 'désactivé'}
				class:text-green-500={status === 'activé'}
			>
				{status}
			</span>
		</Badge>

		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="secondary" size="icon" class="rounded-full">
						<DotsVertical class="icon" />
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<form method="POST" use:enhance>
						<DropdownMenu.Group>
							<DropdownMenu.Item
								><button formaction="?/activated&id={recordId}">Activé</button></DropdownMenu.Item
							>
							<DropdownMenu.Item
								><button formaction="?/disabled&id={recordId}">Désactivé</button></DropdownMenu.Item
							>
							<DropdownMenu.Item
								><button formaction="?/archived&id={recordId}">Archivé</button></DropdownMenu.Item
							>
						</DropdownMenu.Group>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
</div>

<style>
	img {
		display: block;
		transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
	}

	img:hover {
		transform: scale(1.03);
	}
</style>
