import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import {
	Collections,
	type AnnouncesResponse,
	type ConversationsResponse,
	type MessagesResponse,
	type UsersResponse
} from '$lib/pocketbaseType';

export const load = (async ({ locals, params }) => {
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

	type ConvExpand = {
		menbers: UsersResponse[];
		lastMessage: MessagesResponse;
	};
	const getAllUserConversations = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Conversations)
				.getFullList<ConversationsResponse<ConvExpand>>({
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
