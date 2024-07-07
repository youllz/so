import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE } from '$env/static/public';
import type { TypedPocketBase } from './pocketbaseType';

export const pb = new PocketBase(PUBLIC_POCKETBASE) as TypedPocketBase;
export const currentUser = writable(pb.authStore.model);
