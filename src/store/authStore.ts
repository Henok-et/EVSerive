import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { createUserWithProfile, signInUser } from "../lib/auth";
import type { UserRole, AuthState } from "../types/auth";

interface AuthStore extends AuthState {
	login: (email: string, password: string) => Promise<void>;
	register: (
		email: string,
		password: string,
		name: string,
		role: UserRole
	) => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: JSON.parse(localStorage.getItem("user") || "null"),
	isAuthenticated: JSON.parse(
		localStorage.getItem("isAuthenticated") || "false"
	),
	role: (localStorage.getItem("role") as UserRole) || null,

	register: async (email, password, name, role) => {
		try {
			const user = await createUserWithProfile(email, password, name, role);
			const userData = {
				id: user.id,
				email: user.email!,
				name,
				role,
			};

			// Save to local storage
			localStorage.setItem("user", JSON.stringify(userData));
			localStorage.setItem("isAuthenticated", "true");
			localStorage.setItem("role", role);

			set({
				user: userData,
				isAuthenticated: true,
				role,
			});
		} catch (error) {
			console.error("Registration error:", error);
			throw error;
		}
	},

	login: async (email, password) => {
		try {
			const { user, profile } = await signInUser(email, password);
			const userData = {
				id: user.id,
				email: user.email!,
				name: profile.name,
				role: profile.role,
			};

			// Save to local storage
			localStorage.setItem("user", JSON.stringify(userData));
			localStorage.setItem("isAuthenticated", "true");
			localStorage.setItem("role", profile.role);

			set({
				user: userData,
				isAuthenticated: true,
				role: profile.role,
			});
		} catch (error) {
			console.error("Login error:", error);
			throw error;
		}
	},

	logout: async () => {
		try {
			await supabase.auth.signOut();

			// Clear local storage
			localStorage.removeItem("user");
			localStorage.removeItem("isAuthenticated");
			localStorage.removeItem("role");

			set({ user: null, isAuthenticated: false, role: null });
		} catch (error) {
			console.error("Logout error:", error);
			throw error;
		}
	},
}));
