<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex min-h-[30rem] items-center justify-center">
	<h1 class="text-center text-xl text-muted-foreground">
		{$page.status} <br />
		{$page.error?.message}
	</h1>
</div>
