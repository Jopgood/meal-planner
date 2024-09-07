import { create } from "zustand";
import { AppUser, UserState } from "./types";
import { userName } from "@/utils/user-name";
import { directus } from "@/services/directus";
import { readMe } from "@directus/sdk";
import { getServerSession } from "next-auth";
import { options } from "@/lib/auth/options";

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null as AppUser | null,
  loading: false,
  error: null,
  // Getters
  fullName: (): string | null => {
    const currentUser = get().currentUser;
    if (currentUser === null) return null;
    return userName(currentUser);
  },
  isAdmin: () => {
    return get().currentUser?.admin_access === true || false;
  },
  // Actions
  hydrate: async () => {
    set({ loading: true });

    try {
      const session = await getServerSession(options);

      if (!session) throw new Error("No session");

      const fields = ["*", "role.id"];

      const api = directus(session.access_token);

      const user = (await api.request(readMe({ fields }))) as AppUser;
      console.log(user);

      set({
        currentUser: {
          ...user,
        },
      });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
}));
