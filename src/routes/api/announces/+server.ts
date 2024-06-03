import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url, params }) => {
	console.log(params);

	let start = url.searchParams.get('start') as string;
	let end = url.searchParams.get('end') as string;
	let type = url.searchParams.get('type') as string;
	console.log(type);

	if (!type) {
		try {
			const record = await locals.pb.collection('announces').getList(Number(start), Number(end), {
				sort: '-created'
			});
			return json(record);
		} catch (e) {
			console.log(e)
		}
	}

	try {
		const record = await locals.pb.collection('announces').getList(Number(start), Number(end), {
			sort: '-created',
			filter: `propertyType="${type}"`
		});
		return json(record);
	} catch (e) {
		console.log(e)
	}

	return json([]);
};
