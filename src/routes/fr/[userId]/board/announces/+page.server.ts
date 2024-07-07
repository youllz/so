import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Collections, type AnnouncesResponse } from '$lib/pocketbaseType';

export const load = (async ({ locals, params, parent }) => {
	await parent();

	console.log('load annonces');

	const getAllAnnouces = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Announces)
				.getFullList<AnnouncesResponse>({
					sort: '-created',
					filter: `userId = "${params.userId}"`
				});

			return records;
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	const getActivatedAnnounces = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Announces)
				.getFullList<AnnouncesResponse>({
					sort: '-created',
					filter: `status = "activé" && userId = "${params.userId}"`
				});
			return records;
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	const getDisabledAnnounces = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Announces)
				.getFullList<AnnouncesResponse>({
					sort: '-created',
					filter: `status = "désactivé" && userId = "${params.userId}"`
				});
			return records;
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};
	const getArchivedAnnounces = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Announces)
				.getFullList<AnnouncesResponse>({
					sort: '-created',
					filter: `status = "archivé" && userId = "${params.userId}"`
				});
			return records;
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		allAnnounces: await getAllAnnouces(),
		activatedAnnounces: await getActivatedAnnounces(),
		disabledAnnounces: await getDisabledAnnounces(),
		archivedAnnounces: await getArchivedAnnounces()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	disabled: async ({ url, locals, params }) => {
		const id = url.searchParams.get('id') as string;

		if (id) {
			try {
				await locals.pb.collection('announces').update(id, {
					status: 'désactivé'
				});
			} catch (e) {
				console.log(e);
				return fail(400, { message: '' });
			}
		}
	},
	archived: async ({ url, locals, params }) => {
		const id = url.searchParams.get('id') as string;

		if (id) {
			try {
				await locals.pb.collection('announces').update(id, {
					status: 'archivé'
				});
			} catch (e) {
				console.log(e);
				return fail(400, { message: '' });
			}
		}
	},
	activated: async ({ url, locals, params }) => {
		const id = url.searchParams.get('id') as string;

		if (id) {
			try {
				await locals.pb.collection('announces').update(id, {
					status: 'activé'
				});
			} catch (e) {
				console.log(e);
				return fail(400, { message: '' });
			}
		}
	}
};
