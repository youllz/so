import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';

export const load = (async ({ parent }) => {
	await parent();
	return {
		form: await superValidate(zod(formSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, params }) => {
		const form = await superValidate(request, zod(formSchema));
		console.log(form);

		if (!form.valid) {
			// Again, return { form } and things will just work.
			console.log(form);
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data
		let announceId = '';
		if (form.data.commune === undefined) {
			form.data.commune = '';
		}
		try {
			const record = await locals.pb.collection('announces').create(form.data);
			announceId = record.id;
		} catch (e) {
			console.log(e);
			return fail(400, form);
		}

		// Display a success status message
	}
};
