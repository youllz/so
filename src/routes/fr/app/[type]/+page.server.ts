import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const getannounces = async () => {
		try {
			const record = await locals.pb.collection('announces').getList(1, 20, {
				sort: '-created',
				filter: `propertyType="${params.type}" && status = "activé"`
			});

			console.log(record)
			
			return {
				allAnnounces: record
			};
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		announceData: await getannounces()
	};
}) satisfies PageServerLoad;
