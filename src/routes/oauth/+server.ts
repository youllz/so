import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, cookies }) => {
	const redirectURL = `${url.origin}/oauth`;
	const expectedSate = cookies.get('state');
	const expectedCodeVerifier = cookies.get('codeVerifier') as string;

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code') as string;
	const redirectTo = url.searchParams.get('redirectTo');

	const authMethod = await locals.pb.collection('users').listAuthMethods();
	const provider = authMethod.authProviders[0];

	if (expectedSate !== state) {
		console.log('Returned state does not match expected', expectedSate, state);
		redirect(303, '/fr/login');
	}

	try {
		const model = await locals.pb
			.collection('users')
			.authWithOAuth2Code(provider.name, code, expectedCodeVerifier, redirectURL, {
				name: 'youssef',
				lastname: 'youssef z',
				contact: '01 03 41 4493'
			});
		console.log(model);
	} catch (e) {
		console.log(e);
	}

	if (redirectTo) {
		throw redirect(302, redirectTo);
	} else {
		throw redirect(302, '/fr/app');
	}
};
