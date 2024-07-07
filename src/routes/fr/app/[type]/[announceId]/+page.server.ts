import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Collections, type AnnouncesResponse, type UsersResponse } from '$lib/pocketbaseType';

type Texpand = {
	userId: UsersResponse;
};
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
	createConversation: async ({ locals, request, url }) => {
		const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
		const user2 = url.searchParams.get('user2');

		const data = {
			user1: locals.user?.id,
			user2: user2,
			menbers: [locals.user?.id]
		};

		// ckeck if conversation is already exist

		const conversarion = await locals.pb.collection('conversations').getFullList({
			filter: `menbers:each ?= "${locals.user?.id}" && (user1 = "${user2}" || user2 = "${user2}")`
		});

		console.log('conversation:', conversarion);

		if (conversarion.length !== 0) {
			try {
				await locals.pb.collection('messages').create({
					content: formData.message,
					contentType: 'message',
					senderId: locals.user?.id,
					recipientId: user2,
					date: new Date().toISOString(),
					conversationId: conversarion[0].id
				});
			} catch (err) {
				console.log(err);
			}

			throw redirect(303, `/fr/${locals.user?.id}/m/${user2}/${conversarion[0].id}`);
		}

		let conversationId: string;

		try {
			const record = await locals.pb.collection('conversations').create({
				user1: locals.user?.id,
				user2: user2,
				menbers: [locals.user?.id]
			});
			conversationId = record.id;
		} catch (err) {
			console.log(err);
			return fail(400, { message: 'imposible de créer la conversarion' });
		}

		//
		try {
			await locals.pb.collection('conversations').update(conversationId, {
				'menbers+': [user2]
			});
		} catch (err) {
			console.log(err);
			return fail(400);
		}

		let messageId: string = '';
		try {
			const record = await locals.pb.collection('messages').create({
				content: formData.message,
				contentType: 'message',
				senderId: locals.user?.id,
				recipientId: user2,
				date: new Date().toISOString(),
				conversationId: conversationId
			});
			messageId = record.id;
		} catch (err) {
			console.log(err);
		}

		try {
			await locals.pb.collection('conversations').update(conversationId, {
				lastMessage: messageId
			});
		} catch (err) {
			console.log(err);
		}

		throw redirect(303, `/fr/${locals.user?.id}/m/${user2}/${conversationId}`);
	}
};
