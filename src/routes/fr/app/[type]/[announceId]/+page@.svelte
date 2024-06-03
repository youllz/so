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
	import { firstCapitalize } from '$lib/utils';
	import { Separator } from '$lib/components/ui/separator';
	import * as Card from '$lib/components/ui/card';
	import Details from './Details.svelte';

	export let data: PageData;

	$: ({ announce } = data);
	$: console.log(announce);
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
				<Button size="sm">Mettre son annonce sur SO</Button>
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
	<Header title={announce.title} />

	<Images
		allImages={announce.images}
		collectionId={announce.collectionId}
		announceId={announce.id}
		propertyType={announce.propertyType}
	/>

	<div class=" card-container w-full">
		<div class="    ">
			<div>
				<p class="mt-6 text-xl font-medium">
					{firstCapitalize(announce.transactionType)} - {announce.propertyType} - {announce.city}
					{#if announce.commune !== 'none'}
						{announce.commune}
					{/if}
					-
					{#if announce.district}
						{announce.district}
					{/if}
				</p>
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

			<Details
				transaction={announce.transactionType}
				state={announce.state}
				bedroom={announce.numOfRoom}
				bathroom={announce.numOfBath}
				propertyType={announce.propertyType}
				surface={announce.surface}
				
			/>
		</div>

		<!--  -->

		<div class=" sticky top-1/2">
			<Card.Root class="mt-6">
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
	<!--  -->
</section>

<style>
	.card-container {
		display: flex;
		gap: 5vw;
	}

	.card-container div:nth-child(1) {
		flex: 1.5 1 0;
	}
	.card-container div:nth-child(2) {
		flex: 1 1 0;
	}
</style>
