import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import * as schema from './schemas';
import { error, fail } from '@sveltejs/kit';

export const load = (async ({ params, locals }) => {
	const getUserAnnounces = async () => {
		try {
			const record = await locals.pb
				.collection('announces')
				.getFirstListItem(`id="${params.announceId}"`);
			return structuredClone(record);
		} catch (e) {
			console.log(e);
			error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
		}
	};

	return {
		announce: await getUserAnnounces(),
		imageForm: await superValidate(zod(schema.imageSchema)),
		transactionForm: await superValidate(zod(schema.transactionSchema)),
		equipmentsForm: await superValidate(zod(schema.equipmentsSchema)),
		titleForm: await superValidate(zod(schema.titleSchema)),
		descriptionForm: await superValidate(zod(schema.descriptionSchema)),
		availableForm: await superValidate(zod(schema.availableSchema)),
		endOfAvaibleForm: await superValidate(zod(schema.endOfAvailabilitySchema)),
		priceForm: await superValidate(zod(schema.priceSchema)),
		stateForm: await superValidate(zod(schema.stateSchema)),
		surfaceForm: await superValidate(zod(schema.surfaceSchema)),
		cityForm: await superValidate(zod(schema.citySchema)),
		communeForm: await superValidate(zod(schema.communeSchema)),
		roomForm: await superValidate(zod(schema.roomSchema)),
		bathForm: await superValidate(zod(schema.bathSchema))
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	deleteImage: async ({ url, locals, params }) => {
		const imageName = url.searchParams.get('image');

		await locals.pb.collection('announces').update(params.announceId, {
			'images-': [imageName]
		});
	},

	addImage: async ({ locals, params, request }) => {
		const form = await superValidate(request, zod(schema.imageSchema));

		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form: structuredClone(form) });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				images: form.data.images
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form: structuredClone(form) });
		}
	},

	editDescription: async ({ locals, params, request }) => {
		const form = await superValidate(request, zod(schema.descriptionSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				description: form.data.description
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editTransaction: async ({ locals, params, request }) => {
		const form = await superValidate(request, zod(schema.transactionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				transactionType: form.data.transactionType
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editState: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.stateSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				state: form.data.state
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editCity: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.citySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		if (form.data.city !== 'abidjan'.toLowerCase()) {
			try {
				await locals.pb.collection('announces').update(params.announceId, {
					commune: 'none'
				});
			} catch (e) {
				console.log(e);
				return fail(400, { form });
			}
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				city: form.data.city
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},
	editCommune: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.communeSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				commune: form.data.commune
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editRoom: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.roomSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				numOfRoom: form.data.numOfRoom
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editBath: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.bathSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				numOfBath: form.data.numOfBath
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},
	editSurface: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.surfaceSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				surface: form.data.surface
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editPrice: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.priceSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				price: form.data.price
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},

	editAvailable: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.availableSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				available: form.data.available
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},
	editEnOfAvailability: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.endOfAvailabilitySchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				endOfAvailability: form.data.endOfAvailability
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},
	editEquipments: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.equipmentsSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				equipments: form.data.equipments
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	},
	editTitle: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(schema.titleSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.pb.collection('announces').update(params.announceId, {
				title: form.data.title
			});
		} catch (e) {
			console.log(e);
			return fail(400, { form });
		}
	}
};
