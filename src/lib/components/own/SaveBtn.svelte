<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Heart } from 'svelte-radix';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { AuthModel } from 'pocketbase';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import { isDesktop } from '$lib/store';

	export let user: AuthModel | undefined;
	export let saved: string[] | undefined;
	export let recordId: string;
	export let state: State = 'icon';

	type State = 'sm' | 'icon';

	$: getSave = saved?.find((item) => item === recordId);

	const checkSaved: SubmitFunction = () => {
		return async ({ result, update }) => {
			// switch (result.type) {
			// 	case 'success':
			// 		toast.success('Opération effectué avec succès');
			// 		break;

			// 	case 'failure':
			// 		toast.error("L'enregistrement a échoué");
			// 		break;

			// 	default:
			// 		break;
			// }

			await update({ invalidateAll: true });
		};
	};
</script>

<div>
	{#if user}
		<form
			action={getSave === recordId
				? `/fr/app?/deleteSaved&recordId=${recordId}&userId=${user.id}`
				: `/fr/app?/save&recordId=${recordId}&userId=${user.id}`}
			method="POST"
			use:enhance={checkSaved}
		>
			{#if state === 'sm'}
				<Button type="submit" variant="ghost" size="sm">
					{#if getSave === recordId}
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
								class="lucide lucide-heart fill-red-600 stroke-white"
								><path
									d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
								/></svg
							>
						</span>
						Retirer
					{:else}
						<Heart class="icon  mr-4" /> Enregistrer
					{/if}
				</Button>
			{:else}
				<Button type="submit" variant="secondary" size="icon" class="rounded-full">
					{#if getSave === recordId}
						<span>
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
								class="lucide lucide-heart fill-red-600 stroke-white"
								><path
									d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
								/></svg
							>
						</span>
					{:else}
						<Heart class="icon " />
					{/if}

					<span class="sr-only">Enregistrer</span>
				</Button>
			{/if}
		</form>
	{:else}
		<Dialog.Root>
			<Dialog.Trigger>
				{#if state === 'sm'}
					<Button type="submit" variant="secondary" size="sm">
						<Heart class="icon  mr-4" /> Enregistrer
					</Button>
				{:else}
					<Button type="submit" variant="secondary" size="icon" class="rounded-full">
						<Heart class="icon  mr-4" />
						<span class="sr-only">Enregistrer</span>
					</Button>
				{/if}
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Connexion ou Inscription</Dialog.Title>
					<Dialog.Description>
						Veuillez vous connecter ou inscrire pour continuer
					</Dialog.Description>
				</Dialog.Header>
				<div class="mt-4">
					<form action="/fr/app?/oauth&redirctTo={$page.url.pathname}" method="POST">
						<Button type="submit" class="w-full" variant="outline">
							<span class="icon mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 262"
									><path
										fill="#4285F4"
										d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
									/><path
										fill="#34A853"
										d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
									/><path
										fill="#FBBC05"
										d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
									/><path
										fill="#EB4335"
										d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
									/></svg
								>
							</span>
							Continuer avec Google
						</Button>
					</form>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	{/if}
</div>
