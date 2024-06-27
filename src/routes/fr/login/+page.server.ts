import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
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

		console.log(authMethod);

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
	withEmail: async ({ request, locals }) => {
		const formData = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			await locals.pb.collection('users').authWithPassword(formData.email, formData.password);
		} catch (err) {
			console.log(err);
			return fail(400, { message: '' });
		}

		throw redirect(303, '/fr/app');
	}
};
