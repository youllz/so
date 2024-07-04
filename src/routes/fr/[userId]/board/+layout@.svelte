<script lang="ts">
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';
	import Theme from '$lib/components/own/Theme.svelte';
	import type { LayoutData } from './$types';
	import { ChatBubble, HamburgerMenu, PaperPlane, Layers, QuestionMarkCircled } from 'svelte-radix';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Sheet from '$lib/components/ui/sheet';
	import { preferences } from '$lib/store';
	import { fly, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { Toaster } from 'svelte-sonner';
	import { mediaQuery } from 'svelte-legos';

	export let data: LayoutData;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

<Toaster richColors expand={true} position={$isDesktop ? 'bottom-right' : 'top-center'} />
<main class=" flex min-h-[100dvh] items-start bg-card">
	{#if $isDesktop}
		{#key $preferences.deploySidebar}
			<aside
				class="  sticky top-0 flex h-[100dvh] flex-shrink-0 flex-col justify-between bg-background px-3 py-2"
				class:w-auto={!$preferences.deploySidebar}
				transition:slide={{ axis: 'x' }}
			>
				<div>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Button
								on:click={() => ($preferences.deploySidebar = !$preferences.deploySidebar)}
								size="icon"
								variant="ghost"
							>
								<HamburgerMenu class="size-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content side="right">
							{#if $preferences.deploySidebar === true}
								<p>Réduire le menu</p>
							{:else}
								<p>Développer le menu</p>
							{/if}
						</Tooltip.Content>
					</Tooltip.Root>
				</div>

				<ul class="flex flex-col">
					<li class="relative h-auto w-full flex-shrink-0 flex-grow">
						{#if $preferences.deploySidebar !== true}
							<div class=" w-full">
								<Tooltip.Root>
									<Tooltip.Trigger>
										<Button variant="ghost" size="icon">
											<ChatBubble class="size-4" />
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content side="right">
										<p>Messages</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</div>
						{:else}
							<div class=" ">
								<Button size="sm" variant="ghost" class="min-w-full justify-start">
									<span class="flex items-center">
										<ChatBubble class="mr-4 size-4" /> Messages
									</span>
								</Button>
							</div>
						{/if}
					</li>

					<li class="relative">
						{#if $preferences.deploySidebar !== true}
							<div class="">
								<Tooltip.Root>
									<Tooltip.Trigger>
										<Button
											href="/fr/{data.user?.id}/board/announces"
											variant={$page.url.pathname.includes('/board/announces')
												? 'secondary'
												: 'ghost'}
											size="icon"
										>
											<Layers class="size-4" />
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content side="right">
										<p>Annonces</p>
									</Tooltip.Content>
								</Tooltip.Root>
							</div>
						{:else}
							<div class="">
								<Button
									href="/fr/{data.user?.id}/board/announces"
									size="sm"
									variant={$page.url.pathname.includes('/board/announces') ? 'secondary' : 'ghost'}
									class="min-w-full justify-start"
								>
									<span class="flex items-center">
										<Layers class="mr-4 size-4" /> Annonces
									</span>
								</Button>
							</div>
						{/if}
					</li>
				</ul>

				<ul>
					<li>
						<Theme />
					</li>
					<li>
						<Tooltip.Root>
							<Tooltip.Trigger>
								<Button variant="ghost" size="icon">
									<QuestionMarkCircled class="icon" />
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content side="right">
								<p>Besoins d'aide</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</li>
				</ul>
			</aside>
		{/key}
	{/if}

	<section class="w-full flex-grow flex-col">
		<header
			class=" sticky top-0 z-40 flex w-full items-center justify-between bg-background px-[3vw] py-2"
		>
			<div>
				<ul class="flex items-center gap-1">
					{#if !$isDesktop}
						<li>
							<Sheet.Root>
								<Sheet.Trigger>
									<Button variant="ghost" size="icon">
										<HamburgerMenu class="icon" />
										<span class="sr-only">menu</span>
									</Button>
								</Sheet.Trigger>
								<Sheet.Content side="left">
									<Sheet.Header>
										<Sheet.Title>SO</Sheet.Title>
										<!-- <Sheet.Description>
											This action cannot be undone. This will permanently delete your account and
											remove your data from our servers.
										</Sheet.Description> -->
									</Sheet.Header>
									<div class="flex h-full flex-col justify-between">
										<ul>
											<li>
												<Button size="sm" variant="ghost" class="min-w-full justify-start">
													<span class="flex items-center">
														<ChatBubble class="mr-4 size-4" /> Messages
													</span>
												</Button>
											</li>
											<li>
												<Button
													href="/fr/{data.user?.id}/board/announces"
													size="sm"
													variant={$page.url.pathname.includes('/board/announces')
														? 'secondary'
														: 'ghost'}
													class="min-w-full justify-start"
												>
													<span class="flex items-center">
														<Layers class="mr-4 size-4" /> Annonces
													</span>
												</Button>
											</li>
										</ul>
										<ul>
											<li>
												<Button variant="ghost" size="sm" class="min-w-full justify-start">
													<QuestionMarkCircled class="icon mr-4" /> Aide
												</Button>
											</li>
											<li>
												<Theme />
											</li>
										</ul>
									</div>
								</Sheet.Content>
							</Sheet.Root>
						</li>
					{/if}
					<li><a href="/fr/app" class="text-2xl font-bold"> SO </a></li>
				</ul>
			</div>

			<ul class="flex items-center gap-4">
				<!-- <li>
					<Theme />
				</li> -->
				<li>
					<AccountDrop
						userId={data.user?.id}
						name={data.user?.name}
						lastname={data.user?.lastname}
						avatar={data.user?.avatar}
						collectionId={data.user?.collectionId}
					/>
				</li>
			</ul>
		</header>

		<div class=" py-4">
			<slot />
		</div>
	</section>
</main>

<style>
	aside {
		transition: all 300ms ease-out;
	}
</style>
