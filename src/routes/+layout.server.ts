import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	const getSaved = async () => {
		try {
			const record = await locals.pb.collection('users').getOne(locals.user?.id);
			return record.saved as string[];
		} catch (e) {
			console.log(e);
		}
	};

	const getSavedData = async () => {
		try {
			const records = await locals.pb.collection('users').getOne(locals.user?.id, {
				expand: 'saved'
			});

			return records.expand;
		} catch (e) {
			console.log(e);
		}
	};
	const getAllUserConversations = async () => {
		try {
			const records = await locals.pb.collection('conversations').getFullList({
				filter: `user1 = "${params.userId}" || user2 = "${params.userId}"`,
				sort: '-created',
				expand: 'menbers,lastMessage'
			});

			return records;
		} catch (err) {
			console.log(err);
			throw error(400);
		}
	};

	if (locals.pb.authStore.isValid) {
		return {
			user: locals.pb.authStore.model,
			saved: await getSaved(),
			savedData: await getSavedData(),
			conversations: await getAllUserConversations()
		};
	}

	return {
		user: undefined
	};
}) satisfies LayoutServerLoad;
