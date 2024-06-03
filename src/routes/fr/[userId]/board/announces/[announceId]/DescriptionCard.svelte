<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Pencil2 } from 'svelte-radix';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Form from '$lib/components/ui/form';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { descriptionSchema, type DescriptionSchema } from './schemas';
	 

	export let content: string;
	export let data: SuperValidated<Infer<DescriptionSchema>>;

	$: description = content;
	$: $formData.description = description

	const form = superForm(data, {
		validators: zodClient(descriptionSchema),
		onResult({ result }) {
			switch (result.type) {
				case 'success':
					toast.success('La description a été modifiée avec succès !');
					edit = false;
					break;
				case 'error':
					toast.error('Erreur lors de la modification. Veuillez réessayer.');
					description = content;
				default:
					break;
			}
		}
	});

	const { form: formData, enhance } = form;

	let edit = false;
</script>
<div class="grid w-full gap-3 rounded-md bg-background text-foreground p-4">
	<div class="flex w-full items-center justify-between">
		<h2 class="text-sm max-md:text-xs font-semibold text-muted-foreground">Description</h2>

		{#if !edit}
			<Tooltip.Root openDelay={300}>
				<Tooltip.Trigger>
					<Button
						on:click={() => (edit = !edit)}
						variant="ghost"
						size="icon"
						class="rounded-full"
					>
						<Pencil2 class="size-4" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content class="bg-accent text-accent-foreground">
					<p>Modifier</p>
				</Tooltip.Content>
			</Tooltip.Root>
		{/if}
	</div>

	{#if edit}
		<form action="?/editDescription" use:enhance method="POST">
			<Form.Field {form} name="description">
				<Form.Control let:attrs>
					<!-- <Form.Label>Description</Form.Label> -->
					<Textarea
						{...attrs}
						bind:value={description}
						on:change={() => ($formData.description = description)}
						class="h-[200px]"
					/>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex">
				<Button on:click={() => (edit = false)} type="submit" size="sm" variant="ghost">Annuler</Button>
				<Button type="submit" size="sm">Sauvegarder</Button>
			</div>
		</form>
	{:else}
		<pre class="text-wrap max-sm:text-sm font-sans h-[400px] max-sm:h-auto">
  {content}
</pre>
	{/if}
</div>
