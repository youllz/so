<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

<header class="fixed top-0 px-[3vw] py-5">
	<a href="/fr/app" class="text-2xl font-semibold"> SO </a>
</header>

<section class="flex min-h-[100dvh] flex-col items-center justify-center gap-12 px-[3vw]">
	<div class="flex w-[300px] flex-col items-center gap-6">
		<span class="text-center text-xl font-semibold">
			Bienvenue 👋 connectez-vous pour continuer pour continuer.
		</span>
		<form method="POST" class="grid w-full gap-6">
			<div class="grid gap-4">
				<div class="field">
					<Label for="email">Adresse e-mail</Label>
					<Input type="email" name="email" id="email" autocomplete="on" />
				</div>
				<div>
					<Label for="password">Mot de passe</Label>
					<Input type="password" name="password" id="password" autocomplete="on" />
				</div>
				<div>
					<Button formaction="?/withEmail" type="submit" class="w-full">Se connecter</Button>
				</div>
				<div>
					<p class="text-center text-xs">
						Vous n'avez pas de compte ? <Button size="sm" href="/fr/signup" variant="link"
							>Inscrivez-vous</Button
						>
					</p>
				</div>
			</div>
			<div class="grid grid-cols-3 place-items-center justify-center">
				<Separator class="w-full" />
				<span class="text-sm">ou</span>
				<Separator />
			</div>
			<div>
				<Button formaction="?/oauth" type="submit" variant="outline" class="w-full">
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
		</form>
	</div>
</section>
