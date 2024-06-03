<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';

	// export let data
</script>

<div
	class="flex min-h-[30rem] flex-col items-center justify-center gap-4 text-xl text-muted-foreground"
>
	<h1>{$page.error?.message}</h1>
	<!-- <Button href="/fr/host/new/{data.user?.id}" size="sm">
		Ajouter une annonce
	</Button> -->
</div>
