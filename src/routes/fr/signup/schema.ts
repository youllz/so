import { message } from 'sveltekit-superforms';
import { z } from 'zod';

export const formSchema = z.object({
	name: z
		.string()
		.min(2, { message: 'Doit comporter 2 caractères ou plus' })
		.max(50, { message: 'Doit contenir 50 caractères ou moins' }),
	lastname: z
		.string()
		.min(2, { message: 'Doit comporter 2 caractères ou plus' })
		.max(50, { message: 'Doit contenir 50 caractères ou moins' }),
	email: z.string().email({ message: 'adresse email invalide' }),
	password: z.string().min(8, { message: 'Doit comporter 8 caractères ou plus' }),
	passwordConfirm: z.string().min(8, { message: 'Doit comporter 8 caractères ou plus' }),
	contact: z
		.string({ required_error: 'Veuillez renseigner ce champ' })
		.min(13, { message: 'Numéro de téléphone invalide' })
		.max(13, { message: 'Numéro de téléphone invalide' }),
	pass: z.string().default('free')
});

export type FormSchema = typeof formSchema;
