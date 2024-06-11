<script>
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { ExclamationTriangle } from 'svelte-radix';


  const data = [
    {
      title : "sécurité des paiements",
      description: "Avant d’effectuer tout paiement, veuillez vous assurer que vous faites affaire avec une agence vérifiée et réputée. N’envoyez jamais d’argent à une annonce sans d’abord vérifier son identité et la légitimité de l’annonce."
    },
    {
      title : "confidentialité",
      description: "Veuillez noter que toute information personnelle que vous partagez avec une annonce de propriété peut être utilisée à des fins de marketing. Ne partagez que les informations que vous êtes à l’aise de partager avec des tiers."
    },
    {
      title : "arnaques",
      description: "Méfiez-vous des escroqueries et des activités frauduleuses. Ne partagez jamais vos informations personnelles ou financières avec une annonce immobilière, sauf si vous êtes absolument sûr qu’elles sont légitimes. Si vous pensez qu’une annonce est frauduleuse, veuillez nous en informer immédiatement."
    },
    {
      title : "Inspections",
      description: "Avant de faire un achat, il est fortement recommandé que vous effectuez une inspection approfondie de la propriété. Ne prenez jamais une décision d’achat basée uniquement sur les informations fournies dans l’annonce."
    },
    {
      title : "conseils juridiques",
      description: "Avant de conclure un accord avec une annonce immobilière, il est fortement recommandé de consulter un avocat. Un avocat peut vous aider à comprendre les implications juridiques de votre accord et à protéger vos intérêts."
    },
    
  ]
</script>

<Dialog.Root>
	<Dialog.Trigger class="w-full ">
		<Button variant="ghost" size="sm" class="flex w-full items-center justify-center gap-4">
			<ExclamationTriangle class="icon stroke-orange-300" />
			Prendre des precautions
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-[800px]">
		<Dialog.Header>
			<Dialog.Title>
				<sapn class="flex items-center">
					<ExclamationTriangle class="icon mr-4" />
					Attention
				</sapn>
			</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-6 h-[60dvh] overflow-y-scroll mt-4">
		{#each data as item}
      <div class="grid gap-2">
        <p class="text-muted-foreground">
          {item.title}
        </p>
        <p class="text-balance">
          {item.description}
        </p>
      </div>
    {/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
