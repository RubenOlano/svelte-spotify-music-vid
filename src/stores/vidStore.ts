import { writable } from 'svelte/store';

export const vidQueue = writable([] as string[]);
export const started = writable(false);
