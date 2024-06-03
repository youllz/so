import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({locals, params}) => {

  const getAnnounce = async () => {
    try {
      const record = await locals.pb.collection("announces").getOne(params.announceId)
      return record
    } catch (e) {
      console.log(e)
      error(400, { message: "Pour une raison quelconque, nous n'avons pas pu charger 😓" });
    }
  }
  
  
	return {
    announce: await getAnnounce()
  };
}) satisfies PageServerLoad;
