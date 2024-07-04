<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Dashboard, CardStackPlus, Exit, Person, ChatBubble, Half2 } from 'svelte-radix';
	import { PUBLIC_POCKETBASE } from '$env/static/public';
	import { messageReceved } from '$lib/store';
	import { mode, setMode } from 'mode-watcher';
	import PocketBase from 'pocketbase';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// export let email:string | undefined = undefined
	export let lastname: string | undefined = undefined;
	export let name: string;
	export let userId: string;
	export let collectionId: string;
	export let avatar: string;

	let initial = '';

	$: theme = $mode;

	$: if (lastname && name) {
		initial = name[0] + lastname[0];
	} else {
		// initial = name[0];
	}

	let pb: PocketBase;
	onMount(async () => {
		pb = new PocketBase(PUBLIC_POCKETBASE);
		pb.authStore.loadFromCookie(document.cookie || '');

		pb.collection('conversations').subscribe(
			'*',
			async ({ action, record }) => {
				console.log(record);

				const lastMessage = await pb.collection('messages').getOne(record.lastMessage, {
					expand: 'senderId'
				});

				if (
					(action === 'update' || action === 'create') &&
					lastMessage.senderId !== userId &&
					!$page.params.conversationId
				) {
					toast.message(`Nouveau message de ${lastMessage.expand?.senderId.name}`, {
						description:
							lastMessage.contentType === 'message'
								? lastMessage.content
								: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
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
		<DropdownMenu.Group>
			<!-- <DropdownMenu.Label></DropdownMenu.Label> -->
			<!-- <DropdownMenu.Separator /> -->
			<DropdownMenu.Item href="/fr/host/new/{userId}"
				><CardStackPlus class="icon mr-4" /> Ajouter une annonce</DropdownMenu.Item
			>
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
			<DropdownMenu.Item href="/fr/logout"><Exit class="icon mr-4" /> Déconnexion</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
