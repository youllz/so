import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals, params}) => {
	const getannounces = async () => {
		try {
			const record = await locals.pb.collection('announces').getList(1, 20, {
				sort: '-created',
				filter: `propertyType="${params.type}"`
			});

			return {
				allAnnounces: record.items,
				totalItems: record.totalItems
			};
		} catch (e) {
			console.log(e);
			error(400, { message: "Aucun résultat trouvé" });
		}
	};

	return {
		announceData: await getannounces()
	};
	
	
}) satisfies PageServerLoad;
