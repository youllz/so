<script lang="ts">
	import { page } from '$app/stores';
</script>


<div class="flex  items-center justify-center min-h-[30rem]">
	
	<h1 class="text-xl text-center text-muted-foreground"> {$page.status} <br> {$page.error?.message}</h1>
</div>