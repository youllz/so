import { persisted } from 'svelte-persisted-store';
import { mediaQuery } from 'svelte-legos';
import { readable, writable } from 'svelte/store';

export const preferences = persisted('preferences', {
	deploySidebar: true
});

export const isDesktop = mediaQuery('(min-width: 768px)');

export function loadTimerForm() {
	const delayMs = readable(500);
	const timeOutMs = readable(8000);

	return {
		delayMs,
		timeOutMs
	};
}

export const resultFound = writable<number>()
