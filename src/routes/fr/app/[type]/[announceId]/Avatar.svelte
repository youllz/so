<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import dayjs from '$lib/date';

	export let userId: string;
	export let avatar: string;
	export let create: string;
	export let name: string;
	export let lastname: string;
	export let collectionId: string;
	// export let announceId: string;

	let initial = '';

	$: if (lastname && name) {
		initial = name[0] + lastname[0];
	}

	let endDate = dayjs();
	let startDate = dayjs(create);

	let durationTime = dayjs.duration(endDate.diff(startDate));

	function formatDate() {
		const days = Number(durationTime.format('D'))
		const months = Number(durationTime.format('M'))
		const years = Number(durationTime.format('Y'))


		if (months === 0 && years === 0) {
			return durationTime.format('D [jours]')
		}
		if (months !== 0 && years === 0) {
			return durationTime.format('M [mois]')
		}
		if ( years !== 0) {
			return durationTime.format('Y [années]')
		}


	}

	
</script>

<div class="mt-4 flex items-center gap-6">
	<div>
		<Avatar.Root class="border border-input">
			<Avatar.Image
				src="http://127.0.0.1:8090/api/files/{collectionId}/{userId}/{avatar}"
				alt="avatar de l'utilisateur"
			/>
			<Avatar.Fallback>{initial.toLocaleUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div>
		<p>
			<span>{name}</span>
			<span>{lastname}</span>
		</p>
		<p class="text-sm text-muted-foreground">
			Actif depuis {formatDate()}
			<!-- {#if durationTime.format('M') === '0' && durationTime.format('Y') === '0'}
				{durationTime.format('D [jours]')}
			{/if}

			{#if durationTime.format('M') >= '12'}
				{durationTime.format('Y [ans]')}
			{:else}
				{durationTime.format('M [mois]')}
			{/if} -->
		</p>
	</div>
</div>
