import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {

	if(!locals.pb.authStore.isValid) {
		redirect(307, "/fr/login")
	}
	
	return {};
}) satisfies LayoutServerLoad;
