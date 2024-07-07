import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	const minPrice = url.searchParams.get('minPrice') || 0;
	const maxPrice = url.searchParams.get('maxPrice') || 10000000000;
	const propertyType = url.searchParams.get('propertyType') || '';
	const transactionType = url.searchParams.get('transactionType') || '';
	const city = url.searchParams.get('city') || '';
	const commune = url.searchParams.get('commune') || '';
	const district = url.searchParams.get('district') || '';
	const minSurface = url.searchParams.get('minSurface') || 0;
	const maxSurface = url.searchParams.get('maxSurface') || 1000000;
	const equipments = url.searchParams.getAll('equipments');
	const state = url.searchParams.get('state') || '';
	const numOfRoom = url.searchParams.get('numOfRoom') || 0;
	const numOfBath = url.searchParams.get('numOfBath') || 0;

	const getSearchAnnounces = async () => {
		let equi = ``;

		if (equipments.length === 0) {
			equi = ` || description ?!= ""`;
		} else {
			equipments.forEach((item) => {
				equi += ` || equipmentString ?~ "${item}"`;
			});
		}

		// console.log(equi.slice(4));
		try {
			const records = await locals.pb.collection('announces').getFullList({
				filter: `status = "activé" && propertyType ?~ "${propertyType}" && price ?>= "${minPrice}" && price ?<= "${maxPrice}" && transactionType ?~ "${transactionType}" && city ?~ "${city}" && commune ?~ "${commune}" && district ?~ "${district}" && surface ?>= "${minSurface}" && surface ?<= "${maxSurface}"  && state ?~ "${state}" && numOfRoom ?>= "${numOfRoom}" && numOfBath ?>= "${numOfBath}" && (${equi.slice(4)})`,
				sort: '-created'
			});

			return records;
		} catch (e) {
			console.log(e);
			throw error(400, { message: '' });
		}
	};

	return {
		searchAnnounces: await getSearchAnnounces()
	};
}) satisfies PageServerLoad;
