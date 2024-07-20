import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const getAnnounces = async () => {
		try {
			const records = await locals.pb.collection('announces').getList(Number(params.page), 20, {
				sort: '-created',
				filter: `status = "activé"`
			});

			return records;
		} catch (e) {
			console.log(e);
			throw error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		allAnnounces: await getAnnounces()
	};
}) satisfies PageServerLoad;
