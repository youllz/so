import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals, params}) => {


	try {
		const records = await locals.pb.collection('announces').getFullList({
			sort: '-created',
			filter: `userId = "${params.userId}"`
		});


		return {
			allUserAnnounces: structuredClone(records)
		};
	} catch (e) {
		console.log(e)
		error(400, {message: "Aucune annonce trouvée "})		
	}
	
	
}) satisfies PageServerLoad;


export const actions: Actions = {
	editAnnounceState: async ({url, locals, params}) => {
		const state = url.searchParams.get('state')
		const id = url.searchParams.get('id') as string

		if(state === "supprimé") {
			try {
				await locals.pb.collection("announces").delete(id)
			} catch (e) {
				
			}
		}
		
		
		try {
			await locals.pb.collection("announces").update(id, {
				
			})
		} catch (e) {
			
		}
	}
};
