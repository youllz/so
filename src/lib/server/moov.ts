import { MOOV_PUBLIC_KEY, MOOV_SECRET } from '$env/static/private';
import { Moov } from '@moovio/node';

export const moov = new Moov({
	accountID: '72ca1ddf-a720-4f25-88c2-6350078bee75',
	publicKey: MOOV_PUBLIC_KEY,
	secretKey: MOOV_SECRET,
	domain: 'http://localhost:5173/'
});
