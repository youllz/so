<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Field, Control, FieldErrors, Description } from 'formsnap';
	import { formSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';
	import { EnvelopeClosed, CaretLeft } from 'svelte-radix';
	import { Toaster, toast } from 'svelte-sonner';
	import { fly } from 'svelte/transition';
	import intlTelInput from 'intl-tel-input';
	import { onMount } from 'svelte';
	import 'intl-tel-input/build/css/intlTelInput.css';

	export let data: PageData;

	let withEmail = false;
	let noPasswordMatch = true;
	let existEmail = false;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		invalidateAll: true,
		onResult: async ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Message de confirmation envoyé !', {
						description: 'Veuillez vérifier votre boîte e-mail pour confirmer votre demande.'
					});
					break;
				case 'failure':
					toast.error('Erreur !', {
						description: "Désolé, une erreur s'est produite. Veuillez réessayer plus tard."
					});
					break;

				default:
					break;
			}
		},

		onSubmit: async ({ formData, cancel }) => {
			const value = Object.fromEntries(formData);

			if (data.allEmail.includes(value.email)) {
				existEmail = true;
				cancel();
			}
		}
	});
	const { form: formData, enhance } = form;

	let phoneInput: HTMLInputElement;

	onMount(() => {
		const iti = intlTelInput(phoneInput, {
			initialCountry: 'ci', // Côte d'Ivoire
			nationalMode: true,
			utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.10/build/js/utils.js' // URL vers utils.js
		});

	});
</script>

<Toaster position="bottom-right" expand={true} richColors />
<header class="fixed top-0 px-[3vw] py-5">
	<a href="/fr/app" class="text-2xl font-semibold"> SO </a>
</header>
<section class="flex min-h-[100dvh] flex-col items-center justify-center gap-12 px-[3vw] pb-5">
	<div class="flex w-[300px] flex-col items-center gap-4">
		<div class="mb-6 flex w-full items-center gap-4">
			{#if withEmail}
			<!-- <SuperDebug data={$formData}/> -->
				<div>
					<Button on:click={() => (withEmail = false)} variant="secondary" size="icon">
						<CaretLeft class="size-4" />
					</Button>
				</div>
			{/if}
			<div>
				<h1 class="text-xl">Inscription</h1>
				<p class="text-sm text-neutral-500">Inscrivez-vous pour continuer</p>
			</div>
		</div>
		{#if !withEmail}
			<div class="grid w-full gap-4">
				<div>
					<Button on:click={() => (withEmail = true)} variant="default" class="w-full">
						<EnvelopeClosed class="mr-4 size-4" /> Continuer avec une adresse e-mail
					</Button>
				</div>
				<div>
					<p class="text-center text-xs">
						Vous avez déjà un compte ? <Button size="sm" href="/fr/login" variant="link"
							>Connectez-vous</Button
						>
					</p>
				</div>

				<div class="grid grid-cols-3 place-items-center justify-center">
					<Separator class="w-full" />
					<span class="text-sm">ou</span>
					<Separator />
				</div>
				<div>
					<Button variant="outline" class="w-full">
						<span class="mr-4">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 262"
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
				</div>
			</div>
		{:else}
			<form in:fly method="POST" action="?/withEmail" use:enhance class="grid w-[300px] gap-3">
				<div class="grid gap-1">
					<Field {form} name="name">
						<Control let:attrs>
							<div class="field">
								<Label>Nom</Label>
								<Input autocomplete="off" {...attrs} bind:value={$formData.name} />
							</div>
						</Control>
						<FieldErrors class="text-xs text-destructive" />
					</Field>
				</div>
				<div class="grid gap-1">
					<Field {form} name="lastname">
						<Control let:attrs>
							<div class="field">
								<Label>Prénom</Label>
								<Input autocomplete="off" {...attrs} bind:value={$formData.lastname} />
							</div>
						</Control>
						<FieldErrors class="text-xs text-destructive" />
					</Field>
				</div>
				<div class="grid gap-1">
					<Field {form} name="email">
						<Control let:attrs>
							<div class="field">
								<Label>E-mail</Label>
								<Input autocomplete="off" {...attrs} type="email" bind:value={$formData.email} />
							</div>
						</Control>
						<FieldErrors class="text-xs text-destructive" />
						{#if existEmail}
							<span class="text-xs text-destructive"> Ce compte est déjà enregistré </span>
						{/if}
					</Field>
				</div>

				<!-- phone -->

				<div class="grid gap-3">
					<Field {form} name="contact">
						<Control let:attrs>
							<Label>Contact</Label>
							<input type="tel" class="tel" bind:this={phoneInput} bind:value={$formData.contact} autocomplete="off"  {...attrs} />
						</Control>
						<FieldErrors class="text-xs text-destructive" />
						<Description class="text-xs text-muted-foreground"
							>Veuillez suivre ce format 01 23 45 6789</Description
						>
					</Field>
				</div>

				<div class="grid gap-1">
					<Field {form} name="password">
						<Control let:attrs>
							<Label>Mot de passe</Label>
							<Input
								autocomplete="off"
								{...attrs}
								type="password"
								bind:value={$formData.password}
							/>
						</Control>
						<FieldErrors class="text-xs text-destructive" />
					</Field>
				</div>
				<div class="grid gap-1">
					<Field {form} name="passwordConfirm">
						<Control let:attrs>
							<Label>Confirmer mot de passe</Label>
							<Input
								on:input={() => {
									if ($formData.password === $formData.passwordConfirm) {
										noPasswordMatch = false;
									} else {
										noPasswordMatch = true;
									}
								}}
								autocomplete="off"
								{...attrs}
								type="password"
								bind:value={$formData.passwordConfirm}
							/>
						</Control>
						<FieldErrors class="text-xs text-destructive" />
						{#if noPasswordMatch && $formData.passwordConfirm !== ''}
							<span class="text-xs text-destructive"> Le mot de passe ne correspond pas </span>
						{/if}
					</Field>
				</div>
				<div>
					<Button type="submit" class="w-full" disabled={noPasswordMatch}>S'inscrire</Button>
				</div>
			</form>
		{/if}
	</div>
</section>

<style lang="postcss">
	.tel {
		@apply flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50
	}
</style>



