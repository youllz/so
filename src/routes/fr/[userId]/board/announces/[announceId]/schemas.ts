import { z } from 'zod';

export const equipments = {
	balcon: 'Balcon',
	jardin: 'Jardin',
	garage: 'Garage',
	piscine: 'Piscine',
	terrasse: 'Terrasse'
} as const;

 type Equipments = keyof typeof equipments;

export const imageSchema = z.object({
	images: z
		.instanceof(File, { message: 'Veuillez télécharger au moins une image' })
		.refine((f) => f.size < 100_000, 'Taille de téléchargement max 100 kB.')
		.array()
		.min(1, { message: 'veillez selectionner au moins une image' })
});

export const transactionSchema = z.object({
	transactionType: z
		.string({ required_error: 'Veillez sélectionner le type de transaction' })
		.min(1, { message: 'Veillez sélectionner le type de transaction' })
});

export const equipmentsSchema = z.object({
	equipments: z
		.array(z.enum(Object.keys(equipments) as [Equipments, ...Equipments[]]))
		.min(0, 'Veillez selectionner les équipements disponible ou aucun')
});
export const titleSchema = z.object({
	title: z
		.string()
		.min(2, { message: "Veuillez donner un titre a l'annonce" })
		.max(80, { message: 'Doit contenir 80 caractères ou moins' })
});

export const descriptionSchema = z.object({
	description: z
		.string()
		.min(2, { message: "Veuillez donner une description détaillée de l'annonce" })
});
export const availableSchema = z.object({
	available: z.string().refine((v) => v, { message: 'la date de disponibilité est requise' })
});
export const endOfAvailabilitySchema = z.object({
	endOfAvailability: z.string()
});
export const stateSchema = z.object({
	state: z
		.string({ required_error: "Veillez sélectionner l'état du bâtiment" })
		.min(1, { message: "Veillez sélectionner l'état du bâtiment" })
});

export const priceSchema = z.object({
	price: z
		.string({ required_error: 'Veillez donner un prix' })
		.min(1, { message: 'Veillez donner un prix' })
});
export const surfaceSchema = z.object({
	surface: z
		.string({ required_error: 'Veillez donner une la superficie' })
		.min(1, { message: 'Veillez donner une la superficie' })
});

export const citySchema = z.object({
	city: z
		.string({ required_error: 'Veillez sélectionner une ville' })
		.min(1, { message: 'Veillez sélectionner une ville' })
});

export const communeSchema = z.object({
	commune: z
		.string({ required_error: 'Veillez sélectionner une commune' })
		.min(1, { message: 'Veillez sélectionner une commune' })
});

export const roomSchema = z.object({
	numOfRoom: z.string()
})
export const bathSchema = z.object({
	numOfBath: z.string()
})

export type ImageSchema = typeof imageSchema
export type TransactionSchema = typeof transactionSchema
export type DescriptionSchema = typeof descriptionSchema
export type StateSchema = typeof stateSchema
export type CitySchema = typeof citySchema
export type CommuneSchema = typeof communeSchema
export type RoomSchema = typeof roomSchema 
export type BathSchema = typeof bathSchema 
export type SurfaceSchema = typeof surfaceSchema
export type PriceSchema = typeof priceSchema
export type AvailableSchema = typeof availableSchema
export type EndOfAvailabilitySchema = typeof endOfAvailabilitySchema
export type TitleSchema = typeof titleSchema
export type EquipmentsSchema = typeof equipmentsSchema
