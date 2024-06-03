<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<section class="min-h-[100dvh] px-4 w-auto">
	<!-- header -->
	<div>
		<div class="flex gap-4 items-start">
			<Skeleton class="size-8 rounded-full" />
			<div class="flex-1">
				<Skeleton class="h-[30px] w-[80%] rounded-sm" />
				<Skeleton class="h-[10px] w-[30%] rounded-sm mt-2" />
			</div>
		</div>
	</div >

	<!-- images -->
  <div class="w-full  flex flex-col mt-8">
    <div class="flex justify-end ">
      <Skeleton class="w-[100px] h-[30px] rounded-sm" />
    </div>
    <div class="mt-4 flex w-full h-[300px]" >
      <Skeleton class="flex-1 rounded-sm" />
    </div>
  </div>


  <!-- cards elements -->
  <div class="grid h-[400px] mt-4 grid-cols-2 gap-4 max-sm:grid-cols-1">
    <div class="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
      <Skeleton class=" max-sm:h-[50px] rounded-md" />
    </div>
    <div class="flex">
      <Skeleton class=" flex-1 rounded-md" />
    </div>
  </div>


  <!-- stat -->
  <div class="stat">
    <div class="flex">
      
    </div>
    <div>

    </div>
  </div>
</section>
