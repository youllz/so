<script lang="ts">
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';
	import Theme from '$lib/components/own/Theme.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { pb } from '$lib/pockectBase';
	import type { LayoutData } from './$types';
	import * as Avatar from '$lib/components/ui/avatar';
	import AvatarUser from './Avatar.svelte';
	import { Input } from '$lib/components/ui/input';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: ({ user, conversations } = data);

	// $: filterConversation = conversations.filter((item) => {
	// 	const conversationUser = item.expand?.menbers.filter((item) => item.id !== user?.id)

	// })
</script>

<main class="flex min-h-[100dvh] items-start bg-accent/80">
	<aside
		class="sticky top-0 flex h-[100dvh] w-[300px] flex-shrink-0 flex-col gap-4 bg-background px-3 py-2"
	>
		<div>
			<div>
				<span class="text-base font-bold"> Conversations </span>
			</div>
			<!-- <div>
					<Input type="search" placeholder="Rechercher" />
				</div> -->
		</div>

		<ScrollArea>
			<div class="grid gap-2">
				{#each conversations as conversation}
					{@const sender = conversation.menbers.find((item) => item !== user?.id)}
					<a href="/fr/{user?.id}/m/{sender}/{conversation.id}">
						<div
							class="rounded-md p-1"
							class:bg-accent={$page.url.pathname.includes(conversation.id)}
						>
							{#if conversation.expand}
								{#each conversation.expand?.menbers as user}
									{#if user.id !== data.user?.id}
										<AvatarUser
											avatar={user.avatar}
											collectionId={user.collectionId}
											name={user.name}
											userId={user.id}
											lastname={user.lastname}
											date={conversation.expand?.lastMessage.created}
											lastmessage={conversation.expand?.lastMessage.content}
											messageUser={conversation.expand?.lastMessage.senderId}
											conversationId={conversation.id}
											contenType={conversation.expand?.lastMessage.contentType}
										/>
									{/if}
								{/each}
							{/if}
						</div>
					</a>
				{:else}
					<div>
						<p class="text-muted-foreground">Aucne conversation</p>
					</div>
				{/each}
			</div>
		</ScrollArea>
	</aside>
	<section class="h-[calc(100dvh-60px)] w-full flex-grow flex-col">
		<header
			class="sticky top-0 z-40 flex w-full items-center justify-between bg-background px-[3vw] py-2"
		>
			<div>
				<a href="/fr/app" class="text-xl font-black"> SO </a>
			</div>

			<ul class="flex items-center gap-4">
				<li>
					<AccountDrop
						name={user?.name}
						collectionId={user?.collectionId}
						userId={user?.id}
						lastname={user?.lastname}
						avatar={user?.avatar}
					/>
				</li>
			</ul>
		</header>
		<div class="h-full">
			<slot><!-- optional fallback --></slot>
		</div>
	</section>
</main>
