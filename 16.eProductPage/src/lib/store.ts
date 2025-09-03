import { writable } from 'svelte/store'

export const modalIsOpen = writable(false);
export const cartNumber = writable(0);