<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';

	export let lastname: string | undefined = undefined;
	export let name: string;
	export let userId: string;
	export let collectionId: string;
	export let avatar: string;
</script>

<Avatar.Root>
	<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
	<Avatar.Fallback>CN</Avatar.Fallback>
</Avatar.Root>
