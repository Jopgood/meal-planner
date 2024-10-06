import { Role, User } from "@directus/types";

export type AppUser = User & {
  admin_access: boolean;
  app_access: boolean;
  roles: Role[];
};

export interface UserState {
  currentUser: AppUser | null;
  loading: boolean;
  error: Error | string | null;
  hydrate: (session: any) => Promise<void>;
  fullName: () => string | null;
  isAdmin: () => boolean;
}
