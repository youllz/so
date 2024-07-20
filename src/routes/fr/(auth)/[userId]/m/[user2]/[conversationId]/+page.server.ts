import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import {
	Collections,
	type AnnouncesResponse,
	type ConversationsResponse,
	type MessagesResponse,
	type UsersResponse
} from '$lib/pocketbaseType';

export const ssr = false;

type MessageExpand = {
	announceId: AnnouncesResponse;
};

const sendPhotoSchema = z.object({
	photos: z
		.instanceof(File, { message: 'Veuillez télécharger au moins une image' })
		.refine((f) => f.size < 200_0000, 'Taille de téléchargement max 2 MB.')
		.array()
		.min(1, { message: 'veillez selectionner au moins une image' }),
	content: z.string().optional()
});

export const load = (async ({ parent, params, locals }) => {
	await parent();
	const photoForm = await superValidate(zod(sendPhotoSchema));
	const getConversationMessages = async () => {
		try {
			const messages = await locals.pb
				.collection(Collections.Messages)
				.getFullList<MessagesResponse<MessageExpand>>({
					filter: `conversationId = "${params.conversationId}"`,
					sort: '+created',
					expand: 'announceId'
				});
			return messages;
		} catch (err) {
			console.log(err);
			throw error(400);
		}
	};

	type Texpand = {
		lastMessage: MessagesResponse;
		menbers: UsersResponse[];
	};

	const getConversation = async () => {
		try {
			const record = await locals.pb
				.collection(Collections.Conversations)
				.getOne<ConversationsResponse<Texpand>>(params.conversationId, {
					expand: 'menbers,lastMessage'
				});
			return record;
		} catch (err) {
			console.log(err);
		}
	};

	return {
		messages: await getConversationMessages(),
		conversation: await getConversation(),
		photoForm: photoForm
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createMessage: async ({ locals, request, params }) => {
		const message = Object.fromEntries(await request.formData()) as Record<string, string>;

		let messageId: string = '';

		try {
			const record = await locals.pb.collection('messages').create({
				conversationId: params.conversationId,
				senderId: locals.user?.id,
				recipientId: params.user2,
				content: message.message,
				date: new Date().toISOString(),
				contentType: 'message'
			});

			messageId = record.id;
		} catch (err) {
			console.log(err);
		}

		try {
			await locals.pb.collection('conversations').update(params.conversationId, {
				lastMessage: messageId
			});
		} catch (err) {
			console.log('update last message for coversation', err);
		}
	},

	sendImage: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(sendPhotoSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data.content === undefined) form.data.content = '';

		try {
			await locals.pb.collection('messages').create({
				conversationId: params.conversationId,
				senderId: locals.user?.id,
				recipientId: params.user2,
				content: form.data.content,
				contentType: 'photos',
				photos: form.data.photos
			});
		} catch (err) {
			console.log(err);
			return fail(400, { form });
		}
	}
};
