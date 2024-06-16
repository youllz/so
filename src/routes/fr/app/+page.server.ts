import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals }) => {
	const getannounces = async () => {
		try {
			const record = await locals.pb.collection('announces').getList(1, 20, {
				sort: '-created',
				filter: `status = "activé"`
			});

			return {
				allAnnounces: record
			};
		} catch (e) {
			console.log(e);
			throw error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		announceData: await getannounces()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	oauth: async ({ request, locals, url, cookies }) => {
		const authMethod = await locals.pb.collection('users').listAuthMethods();
		const redirectURL = `${url.origin}/oauth`;
		const googleAuthProvider = authMethod.authProviders[0];
		const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;

		const { state, codeVerifier } = googleAuthProvider;

		cookies.set('state', state, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365
		});
		cookies.set('codeVerifier', codeVerifier, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365
		});

		throw redirect(302, authProviderRedirect);

		// const data = Object.fromEntries(await request.formData()) as {
		// 	email: string;
		// 	password: string;
		// };
		// let isNew = url.searchParams.get('user');
		// let id: string;

		// try {
		// 	const authData = await locals.pb
		// 		.collection('users')
		// 		.authWithPassword(data.email, data.password);
		// 	id = authData.record.id;
		// } catch (e) {
		// 	console.log(e);
		// 	return fail(400);
		// }

		// throw redirect(303, `/fr/app`);
		// if (isNew !== null) {
		// 	throw redirect(303, `/fr/${id}/info`);
		// } else {
		// 	throw redirect(303, `/fr/${id}/board/announce`);
		// }
	},
	save: async ({ locals, url }) => {
		const recordId = url.searchParams.get('recordId');

		if (!recordId) {
			return fail(400, { message: "L'enregistrement a échoué" });
		}

		if (!locals.user) {
			throw redirect(307, '/fr/login');
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id, {
				'saved+': recordId
			});
		} catch (e) {
			console.log(e);
			return fail(400, {
				message: "L'enregistrement a échoué"
			});
		}
	},
	deleteSaved: async ({ locals, url }) => {
		const recordId = url.searchParams.get('recordId');
		console.log(recordId);

		if (!recordId) {
			return fail(400, { message: "L'enregistrement a échoué" });
		}

		if (!locals.user) {
			throw redirect(307, '/fr/login');
		}

		try {
			await locals.pb.collection('users').update(locals.user?.id, {
				'saved-': recordId
			});
		} catch (e) {
			console.log(e);
			return fail(400, {
				message: "Le retrait de l'annonce a échoué"
			});
		}
	}
};
