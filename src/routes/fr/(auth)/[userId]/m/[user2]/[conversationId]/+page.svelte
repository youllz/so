<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Textarea } from '$lib/components/ui/textarea';
	import { PaperPlane, FilePlus, Image } from 'svelte-radix';

	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import SenderBubble from './SenderBubble.svelte';
	import RecipientBubble from './RecipientBubble.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { firstCapitalize } from '$lib/utils';
	import Pocketbase from 'pocketbase';
	import { fade, fly } from 'svelte/transition';
	import * as Popover from '$lib/components/ui/popover';
	import { Label } from '$lib/components/ui/label';
	import { superForm } from 'sveltekit-superforms';
	import { Collections, type MessagesResponse } from '$lib/pocketbaseType';

	export let data: PageData;

	$: ({ messages, conversation, user, photoForm } = data);

	let chatBox: HTMLDivElement;

	let message: string;

	let lastmessageIsVisible: boolean;

	let pb: Pocketbase;
	onMount(() => {
		const observer = new IntersectionObserver(
			(entries, observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						lastmessageIsVisible = true;
					} else {
						lastmessageIsVisible = false;
					}
				});
			},
			{
				root: null,
				rootMargin: '100px',
				threshold: 0
			}
		);
		const lastChatBoxChild = document.querySelector('.chatBox')?.lastElementChild;
		if (lastChatBoxChild) {
			observer.observe(lastChatBoxChild);
		}

		chatBox?.scrollIntoView({
			behavior: 'smooth',
			block: 'end'
		});
		pb = new Pocketbase(PUBLIC_POCKETBASE);
		pb.authStore.loadFromCookie(document.cookie || '');
		pb.collection(Collections.Messages).subscribe<MessagesResponse>(
			'*',
			async ({ action, record }) => {
				if (action === 'create') {
					messages = [...messages, record];
					chatBox?.scrollIntoView({
						behavior: 'smooth',
						block: 'end'
					});
				}
			},
			{
				/* other options like expand, custom headers, etc. */
			}
		);
	});

	onDestroy(() => {
		pb.collection('messages').unsubscribe('*');
	});

	const sendForm: SubmitFunction = ({ formData, cancel }) => {
		const data = formData.get('message')?.toString();
		if (data === '') {
			cancel();
		}

		return async ({ update, result }) => {
			if (result.type === 'success') {
				update({ invalidateAll: true, reset: true });
			}
		};
	};

	const { form: photoFormData, enhance: photoEnhance } = superForm(data.photoForm);
</script>

<div class="flex h-full flex-col justify-between">
	<div class="border-b px-6 py-3">
		<div>
			{#if conversation?.expand?.menbers}
				{#each conversation?.expand?.menbers as item}
					{#if item.id !== user?.id}
						<div class="flex items-center gap-4">
							<Avatar.Root class="border">
								<Avatar.Image
									src="{PUBLIC_POCKETBASE}/api/files/{item.collectionId}/{item.id}/{item.avatar}"
									alt="@{item.name}"
								/>
								<Avatar.Fallback>
									<span class="uppercase">{item.name[0]}</span>
								</Avatar.Fallback>
							</Avatar.Root>
							<p class="text-sm font-light">
								{firstCapitalize(item.name)}
								{#if item.lastname}
									{firstCapitalize(item.lastname)}
								{/if}
							</p>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
	<ScrollArea orientation="vertical" class="relative flex-grow px-[5vw]">
		<div
			bind:this={chatBox}
			class=" chatBox flex h-full w-full flex-col justify-start gap-4 py-8 pb-[50px]"
		>
			{#each messages as item, idx (item.id)}
				{#if data.user?.id === item.senderId}
					<SenderBubble
						date={item.date}
						message={item.content}
						collectionId={item.collectionId}
						contenType={item.contentType}
						recordId={item.id}
						images={item.photos}
					/>
				{:else}
					<RecipientBubble
						date={item.date}
						message={item.content}
						collectionId={item.collectionId}
						contenType={item.contentType}
						recordId={item.id}
						images={item.photos}
					/>
				{/if}
			{/each}
			{#if !lastmessageIsVisible}
				<div
					in:fly={{ y: 20, duration: 300, delay: 200 }}
					out:fly={{ y: 20, duration: 300, delay: 200 }}
					class="absolute bottom-2 left-1/2 translate-x-[-50%]"
				>
					<Button
						on:click={() => {
							chatBox?.scrollIntoView({
								behavior: 'smooth',
								block: 'end'
							});
						}}
						variant="secondary"
						size="sm">Revenir en bas</Button
					>
				</div>
			{/if}
			<div class="relative mt-[30px] h-[50px]"></div>
		</div>
	</ScrollArea>

	<div class="mx-4 flex items-center gap-4 rounded-full bg-background px-4 py-4">
		<div>
			<Popover.Root>
				<Popover.Trigger>
					<Button variant="secondary" size="icon" class="rounded-full">
						<Image class="icon" />
					</Button>
				</Popover.Trigger>
				<Popover.Content>
					<div class="grid gap-4">
						<div>
							<p class="text-sm">Envoyer des images</p>
						</div>
						<form
							action="?/sendImage"
							method="POST"
							use:photoEnhance
							enctype="multipart/form-data"
							class="grid gap-2"
						>
							<div>
								<Label class="text-sm font-light" for="photo">Image(s)</Label>
								<Input
									type="file"
									accept="image/svg, image/webp, image/png, image/avif, image/jpeg"
									multiple
									id="photo"
									name="photos"
									on:input={(e) =>
										($photoFormData.photos = Array.from(e.currentTarget.files ?? []))}
								/>
							</div>
							<div>
								<Label class="text-sm font-light" for="email">Description</Label>
								<Input
									placeholder="Ajouter une description"
									name="content"
									autocomplete="off"
									bind:value={$photoFormData.content}
								/>
							</div>

							<Button type="submit" size="sm" class="w-full">Envoyer</Button>
						</form>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
		<form
			action="?/createMessage"
			method="POST"
			use:enhance={sendForm}
			class="flex flex-1 items-center gap-4"
			on:submit|preventDefault={() => {
				chatBox?.scrollIntoView({
					behavior: 'smooth',
					block: 'end'
				});
			}}
		>
			<Input
				type="text"
				placeholder="Envoyer un message"
				autocomplete="off"
				autofocus
				bind:value={message}
				name="message"
				class="flex-1"
			/>
			<div>
				<Button type="submit" variant="default" size="icon" class="rounded-full">
					<PaperPlane class="icon" />
				</Button>
			</div>
		</form>
	</div>
</div>
