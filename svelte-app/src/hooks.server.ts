import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth';

const handleAuth: Handle = async ({ event, resolve }) => {
	try {
		const sessionToken = event.cookies.get(auth.sessionCookieName);

		if (!sessionToken) {
			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const { session, user } = await auth.validateSessionToken(sessionToken);

		if (session) {
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} else {
			auth.deleteSessionTokenCookie(event);
		}

		event.locals.user = user;
		event.locals.session = session;
		return resolve(event);
	} catch (error) {
		console.error('Error in handleAuth:', error);
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
};

export const handle: Handle = handleAuth;
