<script lang="ts">
	import type { LayoutData } from './$types';
	import { Toaster } from 'svelte-sonner';

	export let data: LayoutData;
</script>

<Toaster expand={true} />
<slot />
