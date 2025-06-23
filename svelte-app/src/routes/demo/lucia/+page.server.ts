import * as auth from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { getRequestEvent } from "$app/server";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	try {
		const user = requireLogin();
		console.debug("[lucia] Loaded user:", user);
		return { user };
	} catch (error) {
		console.error("[lucia] Error in load:", error);
		throw error;
	}
};

export const actions: Actions = {
	logout: async (event) => {
		try {
			if (!event.locals.session) {
				console.warn("[lucia] Logout attempted without session");
				return fail(401);
			}
			await auth.invalidateSession(event.locals.session.id);
			auth.deleteSessionTokenCookie(event);
			console.debug("[lucia] User logged out:", event.locals.user?.id);
			return redirect(302, "/demo/lucia/login");
		} catch (error) {
			console.error("[lucia] Error in logout action:", error);
			return fail(500, { message: "Logout failed" });
		}
	},
};

function requireLogin() {
	const { locals } = getRequestEvent();

	if (!locals.user) {
		console.warn("[lucia] requireLogin: No user in locals");
		return redirect(302, "/demo/lucia/login");
	}

	return locals.user;
}
