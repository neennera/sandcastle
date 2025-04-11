// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

interface UserData {
	id: string;
	email: string;
	ownername: string;
  }
declare global {
	namespace App {
		interface Locals {
			user?: any;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
