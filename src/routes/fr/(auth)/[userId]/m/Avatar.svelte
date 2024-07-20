<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import Pocketbase from 'pocketbase';
	import * as Avatar from '$lib/components/ui/avatar';
	import { firstCapitalize } from '$lib/utils';
	import { onDestroy, onMount } from 'svelte';
	import { ArrowLeft, ArrowRight, Image } from 'svelte-radix';
	import { writable } from 'svelte/store';
	import { messageReceved } from '$lib/store';
	import {
		Collections,
		MessagesContentTypeOptions,
		type ConversationsResponse,
		type MessagesResponse
	} from '$lib/pocketbaseType';
	import { DateFormatter } from '@internationalized/date';

	export let lastname: string | undefined = undefined;
	export let name: string;
	export let userId: string;
	export let collectionId: string;
	export let avatar: string;
	export let lastmessage: string = '';
	export let messageUser: string = '';
	export let date: string = '';
	export let contenType: MessagesContentTypeOptions;

	export let conversationId: string;

	let initial = '';

	$: if (lastname) {
		initial = name[0] + lastname[0];
	} else {
		initial = name[0];
	}

	const lastMessageStore = writable({
		content: lastmessage,
		messageUser,
		contenType
	});

	$: if (messageUser !== $page.params.userId) {
		$messageReceved = true;
	}

	let pb: Pocketbase;
	onMount(async () => {
		pb = new Pocketbase(PUBLIC_POCKETBASE);
		pb.authStore?.loadFromCookie(document.cookie || '');
		pb.collection(Collections.Conversations).subscribe<ConversationsResponse>(
			conversationId,
			async ({ action, record }) => {
				if (action === 'update') {
					const data = await pb
						.collection(Collections.Messages)
						.getOne<MessagesResponse>(record.lastMessage);
					$lastMessageStore = {
						content: data.content,
						messageUser: data.senderId,
						contenType: data.contentType
					};

					console.log($lastMessageStore.contenType);

					if ($lastMessageStore.messageUser !== $page.params.userId) {
						$messageReceved = true;
					} else {
						$messageReceved = false;
					}
				}
			},
			{
				/* other options like expand, custom headers, etc. */
			}
		);
	});

	const df = new DateFormatter('fr-FR', {
		dateStyle: 'short'

		// timeStyle: 'short'
	});

	onDestroy(async () => {
		pb.collection(Collections.Conversations).unsubscribe();
	});
</script>

<div class="grid gap-1">
	<div class="flex items-center gap-4">
		<!--  -->
		<div>
			<Avatar.Root class="h-12 w-12 border">
				<Avatar.Image
					src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{userId}/{avatar}"
					alt="avatar de l'utilisateur"
				/>
				<Avatar.Fallback><span class="uppercase">{initial}</span></Avatar.Fallback>
			</Avatar.Root>
		</div>
		<div>
			<div class="flex items-center justify-between">
				<p class="text-sm font-light">
					{firstCapitalize(name)}
					<!-- {lastname ? firstCapitalize(lastname) : ''} -->
				</p>
				<span class="text-[10px] text-muted-foreground">{df.format(new Date(date))}</span>
			</div>
			<div class="flex gap-3">
				{#if $lastMessageStore.messageUser === $page.params.userId}
					<span>
						<ArrowLeft class="icon " />
					</span>
				{:else}
					<span class="text-primary">
						<ArrowRight class="icon" />
					</span>
				{/if}

				<p class="line-clamp-1 w-[150px] text-xs text-muted-foreground">
					{#if $lastMessageStore.contenType === 'photos'}
						<Image class="icon mr-2" />
					{/if}
					{$lastMessageStore.content}
				</p>
			</div>
		</div>

		<!--  -->
	</div>
</div>
