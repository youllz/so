<script lang="ts">
	import { firstCapitalize } from '$lib/utils';

	export let transaction: string;
	export let state: string;
	export let bedroom: string;
	export let bathroom: string;
	export let propertyType: string;
	export let surface: string;
</script>

<div class="mt-4">
	<ul class="grid gap-6">
		<li>
			<span class="">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-arrow-right-left"
					><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path
						d="M4 17h16"
					/></svg
				>
			</span>
			<div>
				<p class="label">Type de transaction</p>
				<p class="info">
					{firstCapitalize(transaction)}
				</p>
			</div>
		</li>
		<li>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-blocks"
					><rect width="7" height="7" x="14" y="3" rx="1" /><path
						d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3"
					/></svg
				>
			</span>
			<div>
				<p class="label">Etat du bâtiment</p>
				<p class="info">
					{firstCapitalize(state)}
				</p>
			</div>
		</li>

		<li>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-layout-template"
					><rect width="18" height="7" x="3" y="3" rx="1" /><rect
						width="9"
						height="7"
						x="3"
						y="14"
						rx="1"
					/><rect width="5" height="7" x="16" y="14" rx="1" /></svg
				>
			</span>
			<div>
				<p class="label">Nombre de pièces</p>
				<p class="info">10</p>
			</div>
		</li>

		<li>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-bed"
					><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path
						d="M6 8v9"
					/></svg
				>
			</span>
			<div>
				<p class="label">Nombre de chambres</p>
				<p class="info">
					{bedroom}
				</p>
			</div>
		</li>
		<li>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-bath"
					><path
						d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"
					/><line x1="10" x2="8" y1="5" y2="7" /><line x1="2" x2="22" y1="12" y2="12" /><line
						x1="7"
						x2="7"
						y1="19"
						y2="21"
					/><line x1="17" x2="17" y1="19" y2="21" /></svg
				>
			</span>
			<div>
				<p class="label">Nombre de salle de bains</p>
				<p class="info">
					{bathroom}
				</p>
			</div>
		</li>
		<li>
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="0.75"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-grid-2x2"
					><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 12h18" /><path
						d="M12 3v18"
					/></svg
				>
			</span>
			<div>
				<p class="label">Superficie</p>
				<p>
					{surface}
				</p>
			</div>
		</li>
	</ul>
</div>

<style lang="postcss">
	li {
		@apply flex items-center gap-8;
	}

	.label {
		@apply text-sm text-muted-foreground;
	}

	.info {
		@apply text-base font-normal;
	}
</style>
