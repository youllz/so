import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate, message } from 'sveltekit-superforms';

export const load = (async ({ parent }) => {
	await parent();
	return {
		form: await superValidate(zod(formSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(formSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data
		let announceId = '';

		if (form.data.commune === undefined) form.data.commune = '';

		try {
			await locals.pb.collection('announces').create(form.data);
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}

		// Display a success status message
	}
};
