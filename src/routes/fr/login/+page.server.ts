import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, locals, url }) => {
		const data = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};
		let isNew = url.searchParams.get('user');
		let id: string;

		try {
			const authData = await locals.pb
				.collection('users')
				.authWithPassword(data.email, data.password);
			id = authData.record.id;
		} catch (e) {
			console.log(e);
			return fail(400);
		}

		throw redirect(303, `/fr/app`);
		// if (isNew !== null) {
		// 	throw redirect(303, `/fr/${id}/info`);
		// } else {
		// 	throw redirect(303, `/fr/${id}/board/announce`);
		// }
	}
};
