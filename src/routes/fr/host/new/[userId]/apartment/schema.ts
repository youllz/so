import { z } from 'zod';

export const transactionTypes = {
	vente: 'Vente',
	location: 'location',
	saisonnière: 'location saisonnière'
} as const;
export const states = {
	neuf: 'Neuf',
	occasion: 'Occasion',
	construction: 'En construction'
} as const;
export const equipments = {
	aucun: 'Aucun',
	balcon: 'Balcon',
	jardin: 'Jardin',
	garage: 'Garage',
	piscine: 'Piscine',
	terrasse: 'Terrasse'
} as const;

type Equipments = keyof typeof equipments;
type TransactionTypes = keyof typeof transactionTypes;
type States = keyof typeof states;

export const formSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Veuillez donner un titre a l'annonce" })
		.max(80, { message: 'Doit contenir 80 caractères ou moins' }),
	description: z
		.string()
		.min(2, { message: "Veuillez donner une description détaillée de l'annonce" }),
	propertyType: z.string().default('appartement'),
	transactionType: z
		.string({ required_error: 'Veillez sélectionner le type de transaction' })
		.min(1, { message: 'Veillez sélectionner le type de transaction' }),

	equipments: z
		.array(z.enum(Object.keys(equipments) as [Equipments, ...Equipments[]]))
		.min(0, 'Veillez selectionner les équipements disponible ou aucun'),
	available: z.string().refine((v) => v, { message: 'la date de disponibilité est requise' }),
	endOfAvailability: z.string(),
	state: z
		.string({ required_error: "Veillez sélectionner l'état du bâtiment" })
		.min(1, { message: "Veillez sélectionner l'état du bâtiment" }),
	numOfPieces: z
		.number({ required_error: 'Veillez donner le nombre de pièces' })
		.min(1, { message: 'Veillez donner le nombre de pièces' }),
	numOfRoom: z.string().min(0),
	numOfBath: z.string().min(0),
	price: z
		.string({ required_error: 'Veillez donner un prix' })
		.min(1, { message: 'Veillez donner un prix' }),
	surface: z
		.string({ required_error: 'Veillez donner une la superficie' })
		.min(1, { message: 'Veillez donner une la superficie' }),
	images: z
		.instanceof(File, { message: 'Veuillez télécharger au moins une image' })
		.refine((f) => f.size < 100_000, 'Taille de téléchargement max 100 kB.')
		.array()
		.min(1, { message: 'veillez selectionner au moins une image' }),
	userId: z.string().optional(),
	city: z
		.string({ required_error: 'Veillez sélectionner la ville' })
		.min(2, { message: 'Veillez sélectionner la ville' }),
	commune: z.string().min(2, { message: 'Veiller sélectionner la commune' }).optional().default(''),
	district: z.string(),
	status: z.string().default("activé")
});

export type FormSchema = typeof formSchema;
