<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Header from './Header.svelte';
	import { Button } from '$lib/components/ui/button';
	import Theme from '$lib/components/own/Theme.svelte';
	import AccountDrop from '$lib/components/own/AccountDrop.svelte';
	import FilterDialog from '$lib/components/own/FilterDialog.svelte';
	import Images from './Images.svelte';
	import Avatar from './Avatar.svelte';
	import { firstCapitalize, formatFCFA } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import Details from './Details.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Warning from './warning.svelte';
	import SaveBtn from '$lib/components/own/SaveBtn.svelte';
	import Saved from '$lib/components/own/Saved.svelte';
	import Send from '$lib/components/own/Send.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: ({ announce, user, saved, savedData } = data);

	$: city = firstCapitalize(announce.city) as string;
	$: commune = announce.commune === 'none' ? ' ' : (announce.commune as string);
	$: district = announce.district ?? ('' as string);
	$: initMessage = `${$page.url.origin}${$page.url.pathname}`;

	let location: string;
	$: if (city === 'Abidjan') {
		location = city.concat(' ', commune, ' ', district);
	} else {
		location = city;
	}

	$: annonceUserId = announce.userId;

	$: if (!annonceUserId) {
		annonceUserId = announce.expand?.userId.id;
	}
</script>

<header class="fixed top-0 z-40 flex w-full flex-col gap-6 border-b border-input bg-background">
	<nav class="flex items-center justify-between px-[10vw] py-2">
		<div>
			<a href="/fr/app" class="text-xl font-bold"> SO </a>
		</div>

		<div>
			<FilterDialog />
		</div>

		<ul class="flex items-center gap-4">
			<li>
				<Button size="sm" variant="ghost">Mettre son annonce sur SO</Button>
			</li>
			<li>
				<Saved savedData={savedData?.saved.reverse()} />
			</li>
			<li>
				<Theme />
			</li>
			<li>
				<AccountDrop
					userId={data.user?.id}
					name={data.user?.name}
					lastname={data.user?.lastname}
					collectionId={data.user?.collectionId}
					avatar={announce.expand?.userId.avatar}
				/>
			</li>
		</ul>
	</nav>
</header>

<section class="px-[10vw] pb-4 pt-[80px]">
	<Header title={announce.title}>
		<SaveBtn slot="save" recordId={announce.id} {saved} {user} state="sm" />
		<Send
			slot="send"
			announceId={announce.id}
			city={announce.city}
			collectionId={announce.collectionId}
			copieValue="{$page.url.origin}{$page.url.pathname}"
			img={announce.images[0]}
			property={announce.propertyType}
			transaction={announce.transactionType}
		/>
	</Header>

	<Images
		allImages={announce.images}
		collectionId={announce.collectionId}
		announceId={announce.id}
		propertyType={announce.propertyType}
	/>

	<div class=" card-container w-full">
		<div class="    ">
			<div>
				<h2 class="mt-6 text-base font-medium">
					{firstCapitalize(announce.propertyType)} en {announce.transactionType} à {firstCapitalize(
						announce.city
					)}
					{#if announce.commune}
						dans la commune de {commune}
					{/if}
					{#if announce.district}
						et dans le quartier {district}
					{/if}
				</h2>
			</div>

			<Separator class="mt-6" />
			<Avatar
				avatar={announce.expand?.userId.avatar}
				userId={announce.expand?.userId.id}
				collectionId={announce.expand?.userId.collectionId}
				create={announce.expand?.userId.created}
				lastname={announce.expand?.userId.lastname}
				name={announce.expand?.userId.name}
			/>
			<Separator class="mt-6" />

			<div class="mt-6 grid gap-6">
				<Details label="Type de transaction" value={firstCapitalize(announce.transactionType)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="0.8571428571428571"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-arrow-right-left"
						><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path
							d="M4 17h16"
						/></svg
					>
				</Details>
				<Details label="Localisation" value={location}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="0.8571428571428571"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-map-pin"
						><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle
							cx="12"
							cy="10"
							r="3"
						/></svg
					>
				</Details>
				{#if announce.propertyType !== 'terrain'}
					<Details label="Etat du bâtiment" value={firstCapitalize(announce.state)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="0.8571428571428571"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-box"
							><path
								d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
							/><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg
						>
					</Details>
				{/if}
				<Details label="Superficie (m2)" value={announce.surface}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="0.8571428571428571"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-grid-2x2"
						><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 12h18" /><path
							d="M12 3v18"
						/></svg
					>
				</Details>

				{#if announce.propertyType === 'maison' || announce.propertyType === 'appartement'}
					<Details label="Nombre de pièces" value={announce.numOfPieces}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="0.8571428571428571"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-layout-panel-top"
							><rect width="18" height="7" x="3" y="3" rx="1" /><rect
								width="7"
								height="7"
								x="3"
								y="14"
								rx="1"
							/><rect width="7" height="7" x="14" y="14" rx="1" /></svg
						>
					</Details>
					<Details label="Nombre de Chambres" value={announce.numOfRoom}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="0.8571428571428571"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-bed"
							><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path
								d="M6 8v9"
							/></svg
						>
					</Details>
					<Details label="Nombre de salle de bains" value={announce.numOfBath}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="0.8571428571428571"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-shower-head"
							><path d="m4 4 2.5 2.5" /><path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" /><path
								d="M15 5 5 15"
							/><path d="M14 17v.01" /><path d="M10 16v.01" /><path d="M13 13v.01" /><path
								d="M16 10v.01"
							/><path d="M11 20v.01" /><path d="M17 14v.01" /><path d="M20 11v.01" /></svg
						>
					</Details>
				{/if}

				<Separator />

				<div>
					<h3 class="text-lg font-medium">Description</h3>

					<pre class="line-clamp-6 text-wrap text-left indent-0 font-sans"> 
						<p>{announce.description.trim()}</p>
					</pre>

					<div class="sticky top-1/2 mt-4">
						<Dialog.Root>
							<Dialog.Trigger
								><span class="underline underline-offset-2">En savoir plus</span></Dialog.Trigger
							>
							<Dialog.Content class="max-w-[800px]">
								<Dialog.Header>
									<Dialog.Title>Description de l'annonce</Dialog.Title>
									<Dialog.Description>Pus de détails de l'annonce</Dialog.Description>
								</Dialog.Header>
								<div class="h-[60dvh] overflow-y-auto">
									<pre class="text text-wrap font-sans">
										<p>{announce.description}</p>
									</pre>
								</div>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>

				<Separator class="my-3" />
			</div>

			{#if announce.equipments}
				<h3 class="mt-4 text-lg font-medium">Les équipements</h3>

				<div class="equipement mt-4 w-full">
					{#each announce.equipments as item}
						<span
							class="flex items-center justify-center rounded-md border border-input bg-accent p-3 text-accent-foreground"
						>
							<p class="text-lg font-medium">
								{firstCapitalize(item.replace('_', '-'))}
							</p>
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<!--  -->

		<div class=" sticky top-1/3">
			<Card.Root class="mt-6">
				<!-- <Card.Header>
					<Card.Title>Description de l'annonce</Card.Title>
					<Card.Description>Pus de détails de l'annonce</Card.Description>
				</Card.Header> -->
				<Card.Content>
					<div class="mt-6 grid gap-3">
						<div>
							<p class="text-sm text-muted-foreground">Type de transaction</p>
							<p>{firstCapitalize(announce.transactionType)}</p>
						</div>
						<Separator />
						<div>
							<p class="text-sm text-muted-foreground">Prix</p>
							<p>{formatFCFA(announce.price)}</p>
						</div>
						<Separator />
					</div>

					<div class="mt-6">
						{#if user?.id !== annonceUserId}
							<Dialog.Root>
								<Dialog.Trigger class="w-full">
									<Button class="w-full">Contacter</Button>
								</Dialog.Trigger>
								<Dialog.Content>
									<Dialog.Header>
										<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
										<Dialog.Description>
											This action cannot be undone. This will permanently delete your account and
											remove your data from our servers.
										</Dialog.Description>
									</Dialog.Header>
									<form
										action="?/createConversation&user2={annonceUserId}"
										method="POST"
										use:enhance
										class="grid gap-2"
									>
										<div>
											<Label for="Message">message</Label>
											<Textarea id="message" name="message" value={initMessage} />
										</div>
										<div class="flex items-center justify-end">
											<Button type="submit">Envoyer</Button>
										</div>
									</form>
								</Dialog.Content>
							</Dialog.Root>
						{/if}
					</div>
				</Card.Content>
				<!-- <Card.Footer>
					<p>Card Footer</p>
				</Card.Footer> -->
			</Card.Root>
			<div class="mt-4">
				<Warning />
			</div>

			<div class="mt-4">
				<Button variant="link" class="w-full text-muted-foreground">
					<span class="icon mr-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-flag"
							><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line
								x1="4"
								x2="4"
								y1="22"
								y2="15"
							/></svg
						>
					</span>
					Signaler cette annonce
				</Button>
			</div>
		</div>
	</div>
	<!--  -->
</section>

<style>
	.card-container {
		display: flex;
		gap: 5vw;
		align-items: flex-start;
	}

	.card-container div:nth-child(1) {
		flex: 1.5 1 0;
	}
	.card-container div:nth-child(2) {
		flex: 1 1 0;
	}

	.equipement {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
		gap: 1.5rem;
	}
</style>
