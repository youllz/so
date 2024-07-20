<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Dashboard, CardStackPlus, Exit, Person, ChatBubble, Half2, Enter } from 'svelte-radix';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { messageReceved } from '$lib/store';
	import { mode, setMode } from 'mode-watcher';
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { currentUser } from '$lib/pockectBase';
	import { Collections, type MessagesResponse, type UsersResponse } from '$lib/pocketbaseType';

	// export let email:string | undefined = undefined
	export let lastname: string | undefined = undefined;
	export let name: string | undefined;
	export let userId: string | undefined;
	export let collectionId: string | undefined;
	export let avatar: string | undefined;

	let initial = '';

	$: theme = $mode;

	$: if (lastname && name) {
		initial = name[0] + lastname[0];
	} else {
		// initial = name[0];
	}

	type Texpand = {
		senderId: UsersResponse;
	};

	let pb: PocketBase;
	onMount(async () => {
		pb = new PocketBase(PUBLIC_POCKETBASE);
		pb.authStore.loadFromCookie(document.cookie || '');

		pb.collection('conversations').subscribe(
			'*',
			async ({ action, record }) => {
				// console.log(record);

				const lastMessage = await pb
					.collection(Collections.Messages)
					.getOne<MessagesResponse<Texpand>>(record.lastMessage, {
						expand: 'senderId'
					});

				if (
					(action === 'update' || action === 'create') &&
					lastMessage.expand?.senderId.id !== userId &&
					!$page.params.conversationId
				) {
					// console.log('toast');
					toast.message(`  Nouveau message de ${lastMessage.expand?.senderId.name} `, {
						description: lastMessage.content,
						action: {
							label: 'Voir',
							onClick: async () => {
								await goto(`/fr/${userId}/m/${lastMessage.recipientId}/${record.id}`, {
									replaceState: true,
									invalidateAll: true,
									noScroll: false
								});
							}
						}
					});
				}
			},
			{}
		);
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		<Avatar.Root>
			<Avatar.Image src="{PUBLIC_POCKETBASE}/api/files/{collectionId}/{userId}/{avatar}" />
			<Avatar.Fallback>
				{#if initial}
					{initial.toLocaleUpperCase()}
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
						><path
							fill="none"
							d="M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0M20.5 12.5A4.5 4.5 0 1 1 16 8a4.5 4.5 0 0 1 4.5 4.5"
						/><path
							fill="currentColor"
							d="M26.749 24.93A13.99 13.99 0 1 0 2 16a13.899 13.899 0 0 0 3.251 8.93l-.02.017c.07.084.15.156.222.239c.09.103.187.2.28.3c.28.304.568.596.87.87c.092.084.187.162.28.242c.32.276.649.538.99.782c.044.03.084.069.128.1v-.012a13.901 13.901 0 0 0 16 0v.012c.044-.031.083-.07.128-.1c.34-.245.67-.506.99-.782c.093-.08.188-.159.28-.242c.302-.275.59-.566.87-.87c.093-.1.189-.197.28-.3c.071-.083.152-.155.222-.24ZM16 8a4.5 4.5 0 1 1-4.5 4.5A4.5 4.5 0 0 1 16 8M8.007 24.93A4.996 4.996 0 0 1 13 20h6a4.996 4.996 0 0 1 4.993 4.93a11.94 11.94 0 0 1-15.986 0"
						/></svg
					>
				{/if}
			</Avatar.Fallback>
		</Avatar.Root>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		{#if !userId}
			<DropdownMenu.Group>
				<DropdownMenu.Item href="/fr/login" class="font-bold">
					<Enter class="icon mr-4" /> Inscription</DropdownMenu.Item
				>
				<DropdownMenu.Item href="/fr/login">
					<span class="icon mr-4"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.875"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-key-round"
							><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle
								cx="16.5"
								cy="7.5"
								r=".5"
								fill="currentColor"
							/></svg
						></span
					> Connexion</DropdownMenu.Item
				>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
		{/if}
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/fr/host/new/{userId}"
				><CardStackPlus class="icon mr-4" /> Ajouter une annonce</DropdownMenu.Item
			>
			{#if userId}
				<DropdownMenu.Item href="/fr/{userId}/board/announces"
					><Dashboard class="icon mr-4" /> Borad</DropdownMenu.Item
				>
				<DropdownMenu.Item href="/fr/{userId}/m">
					<ChatBubble class="icon mr-4" />
					Messages {#if $messageReceved}
						<span class="ml-4 block size-1 rounded-full bg-primary"> </span>
					{/if}
				</DropdownMenu.Item>
				<DropdownMenu.Item><Person class="icon mr-4" /> Mon compte</DropdownMenu.Item>
			{/if}

			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger><Half2 class="icon mr-4" /> Theme</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.RadioGroup bind:value={theme}>
						<DropdownMenu.RadioItem on:click={() => setMode('light')} value="light"
							>Claire</DropdownMenu.RadioItem
						>
						<DropdownMenu.RadioItem on:click={() => setMode('dark')} value="dark"
							>Sombre</DropdownMenu.RadioItem
						>
						<DropdownMenu.RadioItem on:click={() => setMode('system')} value="system"
							>Système</DropdownMenu.RadioItem
						>
					</DropdownMenu.RadioGroup>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			{#if userId}
				<DropdownMenu.Item href="/fr/logout"
					><Exit class="icon mr-4" /> Déconnexion</DropdownMenu.Item
				>
			{/if}
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
