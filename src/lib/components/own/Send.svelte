<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Drawer from '$lib/components/ui/drawer';
	import { isDesktop } from '$lib/store';
	import { Share1, Copy, EnvelopeClosed, ChatBubble } from 'svelte-radix';
	import { Button } from '$lib/components/ui/button';

	export let img: string;
	export let city: string;
	export let transaction: string;
	export let property: string;
	export let collectionId: string;
	export let announceId: string;

	let open = false;
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger>
			<Button variant="ghost" size="sm">
				<Share1 class="icon mr-4" /> Partager
			</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Partager cette annonce</Dialog.Title>
			</Dialog.Header>
			<div class="flex items-center gap-4">
				<figure class="size-16">
					<img
						src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{img}"
						alt=""
						class="h-full w-full rounded-md object-cover"
					/>
				</figure>
				<p>
					{property} · {transaction} · {city}
				</p>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<Button variant="outline" size="default" class="justify-start">
					<span class="flex items-center">
						<Copy class="icon mr-4" />
						Copier le lien
					</span>
				</Button>
				<Button variant="outline" size="default" class="justify-start">
					<span class="flex items-center">
						<EnvelopeClosed class="icon mr-4" />
						E-mail
					</span>
				</Button>

				<Button variant="outline" size="default" class="justify-start">
					<span class="flex items-center">
						<ChatBubble class="icon mr-4" />
						Messages
					</span>
				</Button>
				<Button variant="outline" size="default" class="justify-start">
					<span class="flex items-center">
						<span class="icon mr-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
								><path
									fill="currentColor"
									d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
								/></svg
							>
						</span>
						Whatsapp
					</span>
				</Button>
			</div>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger>
			<Button variant="ghost" size="default">
				<Share1 class="icon mr-4" /> Partager
			</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Title>Partager cette annonce</Drawer.Title>
				<!-- <Drawer.Description>This action cannot be undone.</Drawer.Description> -->
			</Drawer.Header>
			<div class="px-4">
				<div class="flex items-center gap-4">
					<figure class="size-16">
						<img
							src="http://127.0.0.1:8090/api/files/{collectionId}/{announceId}/{img}"
							alt=""
							class="h-full w-full rounded-md object-cover"
						/>
					</figure>
					<p>
						{property} · {transaction} · {city}
					</p>
				</div>

				<div class="mt-4 grid grid-cols-2 gap-4 max-[400px]:grid-cols-1">
					<Button variant="outline" size="default" class="justify-start">
						<span class="flex items-center">
							<Copy class="icon mr-4" />
							Copier le lien
						</span>
					</Button>
					<Button variant="outline" size="default" class="justify-start">
						<span class="flex items-center">
							<EnvelopeClosed class="icon mr-4" />
							E-mail
						</span>
					</Button>

					<Button variant="outline" size="default" class="justify-start">
						<span class="flex items-center">
							<ChatBubble class="icon mr-4" />
							Messages
						</span>
					</Button>
					<Button variant="outline" size="default" class="justify-start">
						<span class="flex items-center">
							<span class="icon mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
									><path
										fill="currentColor"
										d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
									/></svg
								>
							</span>
							Whatsapp
						</span>
					</Button>
				</div>
			</div>
			<Drawer.Footer>
				<!-- <Button>Submit</Button> -->
				<Drawer.Close>Cancel</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}

<style>
</style>
