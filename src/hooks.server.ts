// src/hooks.server.js
import { pb } from '$lib/pockectBase';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// load the store data from the request cookie string
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	try {
		// get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
		pb.authStore.isValid && (await pb.collection('users').authRefresh());
	} catch (_) {
		// clear the auth store on failed refresh
		pb.authStore.clear();
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);

	const response = await resolve(event);

	// send back the default 'pb_auth' cookie to the client with the latest store state
	response.headers.append('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
}
