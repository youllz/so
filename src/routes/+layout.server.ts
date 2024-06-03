import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		return {
			user: locals.pb.authStore.model
		};
	}

	return {
		user: undefined
	};
}) satisfies LayoutServerLoad;
