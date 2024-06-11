import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

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
				const records = await locals.pb.collection("users").getOne(locals.user?.id, {
					expand: 'saved'
				})
				// const data = records.expand?.map((item:any) => {
				// 	return {
				// 		title: item.title,
				// 		description: item.description,
				// 		image: item.images[0],
				// 		city: item.city,
				// 		commune: item.commune,
				// 		district: item.district,
				// 		id: item.id,
				// 		transactionType: item.transactionType
				// 	}
				// })


				return records.expand 
			} catch (e) {
				console.log(e)
			}
		}
	
	if (locals.pb.authStore.isValid) {

		
		return {
			user: locals.pb.authStore.model,
			saved: await getSaved(),
			savedData: await getSavedData()
	
		};
	}

	return {
		user: undefined,
	};
}) satisfies LayoutServerLoad;
