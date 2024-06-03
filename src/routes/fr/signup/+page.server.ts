import type { PageServerLoad, Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';


export const load = (async ({locals}) => {
	const record = await locals.pb.collection('users').getFullList();
	const allEmail = record.map((item) => item.email);
	return {
		form: await superValidate(zod(formSchema)),
		allEmail
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	withEmail: async ({request, locals}) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			return fail(400, form);
		}

		

		

		try {
			await locals.pb.collection('users').create(form.data);
		} catch (e) {
			console.log(e);
			return fail(400, form);
		}

		return message(form, 'susscess');
	},

	withOauth: async () => {

	}
};
