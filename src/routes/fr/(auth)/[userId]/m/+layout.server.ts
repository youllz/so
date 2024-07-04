export const ssr = false;

import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	return {
		// conversations: await getAllUserConversations()
	};
}) satisfies LayoutServerLoad;
