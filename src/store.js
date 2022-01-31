import { writable } from 'svelte/store';

export const currentUser = writable({
  isLoggedIn: false,
  user: null
});

export const answer = writable({
  lat: '',
  lng: ''
});

export const score = writable(0);

export const amIhost = writable(false);

export const currTimeUTC = writable(undefined);