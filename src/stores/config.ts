import { BaseColor } from "@/styles/base-colours";
import { create } from "zustand";
import { useUserStore } from "./user";
import { databaseApi as api } from "@/lib/api";

interface Config {
  style: string;
  theme: BaseColor["name"];
  radius: number;
}

interface ConfigState {
  config: Config;
  isLoading: boolean;
  error: Error | null;
  setConfig: (config: Partial<Config>) => Promise<void>;
  hydrate: () => Promise<void>;
}

const defaultConfig: Config = {
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
};

export const useConfigStore = create<ConfigState>((set, get) => ({
  config: { ...defaultConfig },
  isLoading: false,
  error: null,
  setConfig: async (newConfig: Partial<Config>) => {
    const currentUser = useUserStore.getState().currentUser;
    if (!currentUser) {
      set({ error: new Error("User not authenticated") });
      return;
    }

    set({ isLoading: true, error: null });
    const updatedConfig = { ...get().config, ...newConfig };

    try {
      await api.updateOne(
        "user_config",
        "8466f3c6-95f0-4689-b361-5f57bd695aaa",
        { config: updatedConfig }
      );
      set({ config: updatedConfig });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error : new Error("Failed to update config"),
      });
    } finally {
      set({ isLoading: false });
    }
  },
  hydrate: async () => {
    const currentUser = useUserStore.getState().currentUser;
    if (!currentUser) {
      set({ error: new Error("User not authenticated") });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const values = await api.readMany("user_config", {
        limit: 1,
        filter: { user: { id: { _eq: currentUser?.role?.id } } },
      });

      if (values.length > 0) {
        set({ config: { ...defaultConfig, ...values[0].config } });
      } else {
        // If no config exists, create a default one
        await api.createOne("user_config", {
          config: defaultConfig,
          user: currentUser.id,
        });

        set({ config: { ...defaultConfig } });
      }
    } catch (error) {
      console.error("Failed to hydrate config:", error);
      set({
        error:
          error instanceof Error
            ? error
            : new Error("Failed to hydrate config"),
      });
      // Fallback to default config
      set({ config: { ...defaultConfig } });
    } finally {
      set({ isLoading: false });
    }
  },
}));
