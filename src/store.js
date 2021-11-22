import { writable } from 'svelte/store';

export const answer = writable({
  lat: '',
  lng: ''
});

export const amIhost = writable(false);