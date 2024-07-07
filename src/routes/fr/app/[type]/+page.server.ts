import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {Collections, type AnnouncesResponse} from '$lib/pocketbaseType'

export const load = (async ({ locals, params }) => {
	const getannounces = async () => {
		try {
			const record = await locals.pb.collection(Collections.Announces).getList<AnnouncesResponse>(1, 20, {
				sort: '-created',
				filter: `propertyType="${params.type}" && status = "activé"`
			});


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
