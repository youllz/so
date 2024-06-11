import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const getAnnounces = async () => {
		try {
			const record = await locals.pb.collection('announces').getList(Number(params.page), 20, {
				sort: '-created',
				filter: `status = "activé"`
			});
			console.log(record)
			return record;
		} catch (e) {
			console.log(e);
			throw error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		allAnnounces: await getAnnounces()
	};
}) satisfies PageServerLoad;
