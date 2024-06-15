import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals }) => {
	let minPrice = url.searchParams.get('minPrice') || 0;
	let maxPrice = url.searchParams.get('maxPrice') || 10000000000;
	let propertyType = url.searchParams.get('propertyType') || '';
	let transactionType = url.searchParams.get('transactionType') || '';
	let city = url.searchParams.get('city') || '';
	let commune = url.searchParams.get('commune') || '';
	let district = url.searchParams.get('district') || '';
	let minSurface = url.searchParams.get('minSurface') || 0;
	let maxSurface = url.searchParams.get('maxSurface') || 1000000;
	// let equipments = url.searchParams.getAll('equipments');
	let state = url.searchParams.get('state') || '';
	let numOfRoom = url.searchParams.get('numOfRoom') || 0;
	let numOfBath = url.searchParams.get('numOfBath') || 0;

	// console.log(equipments[0].slice(2, -2).split('","'));


	const getSearchAnnounces = async () => {
	

		try {
			const records = await locals.pb.collection('announces').getFullList({
				filter: `status = "activé" && propertyType ?~ "${propertyType}" && price ?>= "${minPrice}" && price ?<= "${maxPrice}" && transactionType ?~ "${transactionType}" && city ?~ "${city}" && commune ?~ "${commune}" && district ?~ "${district}" && surface ?>= "${minSurface}" && surface ?<= "${maxSurface}"  && state ?~ "${state}" && numOfRoom ?>= "${numOfRoom}" && numOfBath ?>= "${numOfBath}"`,
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
