<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<section class="min-h-[100dvh] w-auto px-4">
	<!-- header -->
	<div>
		<div class="flex items-start gap-4">
			<Skeleton class="size-8 rounded-full" />
			<div class="flex-1">
				<Skeleton class="h-[30px] w-[80%] rounded-sm" />
				<Skeleton class="mt-2 h-[10px] w-[30%] rounded-sm" />
			</div>
		</div>
	</div>

	<!-- images -->
	<div class="mt-8 flex w-full flex-col">
		<div class="flex justify-end">
			<Skeleton class="h-[30px] w-[100px] rounded-sm" />
		</div>
		<div class="mt-4 flex h-[300px] w-full">
			<Skeleton class="flex-1 rounded-sm" />
		</div>
	</div>

	<!-- cards elements -->
	<div class="mt-4 grid h-[400px] grid-cols-2 gap-4 max-sm:grid-cols-1">
		<div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
			<Skeleton class=" rounded-md max-sm:h-[50px]" />
		</div>
		<div class="flex">
			<Skeleton class=" flex-1 rounded-md" />
		</div>
	</div>

	<!-- stat -->
	<div class="stat">
		<div class="flex"></div>
		<div></div>
	</div>
</section>
