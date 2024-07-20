import type { LayoutServerLoad } from './$types';
import { Collections, type AnnouncesResponse, type UsersResponse } from '$lib/pocketbaseType';

export const load = (async ({ locals }) => {
	const getSaved = async () => {
		try {
			const record = await locals.pb
				.collection(Collections.Users)
				.getOne<UsersResponse>(locals.user?.id);
			return record.saved;
		} catch (e) {
			console.log(e);
		}
	};

	type Texpand = {
		saved: AnnouncesResponse[] | undefined;
	};

	const getSavedData = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Users)
				.getOne<UsersResponse<Texpand>>(locals.user?.id, {
					expand: 'saved'
				});

			return records.expand;
		} catch (e) {
			console.log(e);
		}
	};

	if (locals.pb.authStore.isValid) {
		return {
			user: locals.pb.authStore.model as UsersResponse,
			saved: await getSaved(),
			savedData: await getSavedData()
		};
	} else {
		return {
			user: undefined
		};
	}
}) satisfies LayoutServerLoad;
