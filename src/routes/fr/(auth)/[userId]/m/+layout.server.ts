import {
	Collections,
	type ConversationsResponse,
	type MessagesResponse,
	type UsersResponse
} from '$lib/pocketbaseType';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	type ConvExpand = {
		menbers: UsersResponse[];
		lastMessage: MessagesResponse;
	};
	const getAllUserConversations = async () => {
		try {
			const records = await locals.pb
				.collection(Collections.Conversations)
				.getFullList<ConversationsResponse<ConvExpand>>({
					filter: `menbers:each ?= "${locals.user?.id}"`,
					sort: '-created',
					expand: 'menbers,lastMessage'
				});

			return records;
		} catch (err) {
			console.log(err);
			throw error(400);
		}
	};

	return {
		conversations: await getAllUserConversations()
	};
}) satisfies LayoutServerLoad;
