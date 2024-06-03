<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from "$lib/components/ui/button"

	// export let data
	
</script>

<div class="flex flex-col gap-4 min-h-[30rem] items-center justify-center text-xl text-muted-foreground">
	<h1>{$page.error?.message}</h1>
	<!-- <Button href="/fr/host/new/{data.user?.id}" size="sm">
		Ajouter une annonce
	</Button> -->
</div>
