import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Collections, type ConversationsResponse } from '$lib/pocketbaseType';

export const load = (async ({ locals, params }) => {
	const getAnnounce = async () => {
		try {
			const record = await locals.pb.collection(Collections.Announces).getOne(params.announceId, {
				expand: 'userId'
			});
			return record;
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		announce: await getAnnounce()
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createConversation: async ({ locals, request, url, params }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const user2 = url.searchParams.get('user2') as string;

		// ckeck if conversation is already exist

		const conversarion = await locals.pb
			.collection(Collections.Conversations)
			.getFullList<ConversationsResponse>({
				filter: `menbers:each ?= "${locals.user?.id}"`
			});

		const existsConversationId = conversarion.find((item) => item.menbers.includes(user2));

		console.log('exists:', existsConversationId);

		// console.log(conversarion);

		if (existsConversationId) {
			try {
				await locals.pb.collection(Collections.Messages).create({
					content: formData.message,
					contentType: 'announceLink',
					senderId: locals.user?.id,
					recipientId: user2,
					conversationId: existsConversationId.id,
					announceId: params.announceId
				});
			} catch (err) {
				console.log('fail to create message', err);
			}

			throw redirect(303, `/fr/${locals.user?.id}/m/${user2}/${existsConversationId.id}`);
		}

		let conversationId: string;
		try {
			const record = await locals.pb.collection(Collections.Conversations).create({
				menbers: [locals.user?.id, user2]
			});
			conversationId = record.id;
		} catch (err) {
			console.log(err);
			return fail(400, { message: 'imposible de créer la conversarion' });
		}

		let messageId: string = '';
		try {
			const record = await locals.pb.collection(Collections.Messages).create({
				content: formData.message,
				contentType: 'announceLink',
				senderId: locals.user?.id,
				recipientId: user2,
				conversationId: conversationId,
				announceId: params.announceId
			});
			messageId = record.id;
		} catch (err) {
			console.log('fail to create message', err);
		}

		try {
			await locals.pb.collection('conversations').update(conversationId, {
				lastMessage: messageId
			});
		} catch (err) {
			console.log('fail to update conversation last message', err);
		}

		throw redirect(303, `/fr/${locals.user?.id}/m/${user2}/${conversationId}`);
	}
};
