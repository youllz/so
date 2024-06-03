<script>
	import { Line } from 'svelte-chartjs';
	import { data } from './data';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
</script>

<div
	class="w-[100%] self-center rounded-md border bg-background stroke-white p-4 text-foreground max-sm:w-[90%]"
>
	<Line
		{data}
		options={{
			responsive: true,
			plugins: {
				colors: { enabled: true }
			},
			borderColor: '#36A2EB'
		}}
	/>
</div>
