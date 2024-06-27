import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE } from '$env/static/public';

export const pb = new PocketBase(PUBLIC_POCKETBASE);
export const currentUser = writable(pb.authStore.model);
