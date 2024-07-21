/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase';
import type { RecordService } from 'pocketbase';

export enum Collections {
	Announces = 'announces',
	Conversations = 'conversations',
	Messages = 'messages',
	Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString;
	created: IsoDateString;
	updated: IsoDateString;
	collectionId: string;
	collectionName: Collections;
	expand?: T;
};

export type AuthSystemFields<T = never> = {
	email: string;
	emailVisibility: boolean;
	username: string;
	verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export enum AnnouncesStatusOptions {
	'activé' = 'activé',
	'désactivé' = 'désactivé',
	'archivé' = 'archivé'
}
export type AnnouncesRecord<Tequipments = unknown> = {
	available: IsoDateString;
	city: string;
	commune?: string;
	description: string;
	district?: string;
	endOfAvailability?: IsoDateString;
	equipmentString?: string;
	equipments?: null | Tequipments;
	images: string[];
	numOfBath?: number;
	numOfPieces?: number;
	numOfRoom?: number;
	price: number;
	propertyType: string;
	state?: string;
	status: AnnouncesStatusOptions;
	surface: number;
	title: string;
	transactionType: string;
	userId: RecordIdString;
};

export type ConversationsRecord = {
	lastMessage?: RecordIdString;
	menbers: RecordIdString[];
};

export enum MessagesContentTypeOptions {
	'message' = 'message',
	'photos' = 'photos',
	'announceLink' = 'announceLink'
}
export type MessagesRecord = {
	announceId?: RecordIdString;
	content?: string;
	contentType: MessagesContentTypeOptions;
	conversationId: RecordIdString;
	photos?: string[];
	recipientId: RecordIdString;
	senderId: RecordIdString;
};

export enum UsersPassOptions {
	'free' = 'free',
	'pro' = 'pro'
}
export type UsersRecord = {
	avatar?: string;
	contact: string;
	lastname: string;
	name: string;
	pass?: UsersPassOptions;
	saved?: RecordIdString[];
};

// Response types include system fields and match responses from the PocketBase API
export type AnnouncesResponse<Tequipments = unknown, Texpand = unknown> = Required<
	AnnouncesRecord<Tequipments>
> &
	BaseSystemFields<Texpand>;
export type ConversationsResponse<Texpand = unknown> = Required<ConversationsRecord> &
	BaseSystemFields<Texpand>;
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> &
	BaseSystemFields<Texpand>;
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>;

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	announces: AnnouncesRecord;
	conversations: ConversationsRecord;
	messages: MessagesRecord;
	users: UsersRecord;
};

export type CollectionResponses = {
	announces: AnnouncesResponse;
	conversations: ConversationsResponse;
	messages: MessagesResponse;
	users: UsersResponse;
};

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'announces'): RecordService<AnnouncesResponse>;
	collection(idOrName: 'conversations'): RecordService<ConversationsResponse>;
	collection(idOrName: 'messages'): RecordService<MessagesResponse>;
	collection(idOrName: 'users'): RecordService<UsersResponse>;
};
