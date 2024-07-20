import type { Actions, PageServerLoad } from './$types';
import { CP_API_KEY, SECRET_KEY, SITE_iD } from '$env/static/private';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ fetch }) => {
		const data = JSON.stringify({
			apikey: CP_API_KEY,
			site_id: SITE_iD,
			mode: 'PRODUCTION',
			transaction_id: crypto.randomUUID(), //
			amount: 100,
			currency: 'XOF',
			alternative_currency: '',
			description: ' TEST INTEGRATION ',
			customer_id: '172',
			customer_name: 'KOUADIO',
			customer_surname: 'Francisse',
			customer_email: 'zyoussouf70@gmail.com',
			customer_phone_number: '+2250141472963',
			customer_address: 'Antananarivo',
			customer_city: 'abidjan',
			customer_country: 'CI',
			customer_state: 'CI',
			customer_zip_code: '065100',
			notify_url: 'http://localhost:5173/fr/',
			return_url: 'http://localhost:5173/fr/app',
			channels: 'MOBILE_MONEY',
			metadata: 'user1',
			lang: 'FR'
		});

		try {
			const res = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: data
			});

			const resData = await res.json();
			console.log(resData);
		} catch (err) {
			console.log(err);
		}
	}
};
