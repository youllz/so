import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, params }) => {
	console.log(params);

	let start = url.searchParams.get('start') as string;
	let end = url.searchParams.get('end') as string;
	let type = url.searchParams.get('type') as string;

	if (!type) {
		try {
			const record = await locals.pb.collection('announces').getList(Number(start), Number(end), {
				sort: '-created',
				filter: `status = "activé"`
			});
			return json(record);
		} catch (e) {
			console.log(e);
		}
	}

	try {
		const record = await locals.pb.collection('announces').getList(Number(start), Number(end), {
			sort: '-created',
			filter: `propertyType="${type}" && status = "activé"`
		});
		return json(record);
	} catch (e) {
		console.log(e);
	}

	return json([]);
};
