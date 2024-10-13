import { create } from "zustand";
import { useUserStore } from "@/stores/user";
import { fetchData, createItem, updateItem } from "@/lib/api";
import type { ConfigState, Config } from "./types";

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
    await get().updateOrCreateConfig(newConfig);
  },

  hydrate: async () => {
    const currentUser = useUserStore.getState().currentUser;

    if (!currentUser) {
      set({ error: new Error("User not authenticated") });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetchData("user_config", {
        filter: { user: { id: { _eq: currentUser.id } } },
        limit: 1,
      });

      if (response.length > 0) {
        const userConfig = response[0].config;
        set({ config: { ...defaultConfig, ...userConfig } });
      } else {
        // If no config found, use the default config
        set({ config: { ...defaultConfig } });
      }
    } catch (error) {
      console.error("Failed to hydrate config:", error);
      set({
        error:
          error instanceof Error
            ? error
            : new Error("Failed to hydrate config"),
        config: { ...defaultConfig }, // Fallback to default config
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateOrCreateConfig: async (newConfig?: Partial<Config>) => {
    const currentUser = useUserStore.getState().currentUser;

    if (!currentUser) {
      set({ error: new Error("User not authenticated") });
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await fetchData("user_config", {
        filter: { user: { id: { _eq: currentUser.id } } },
        limit: 1,
      });

      let updatedConfig: Config;

      if (response.length > 0) {
        updatedConfig = { ...get().config, ...newConfig };
        await updateItem("user_config", response[0].id, {
          config: updatedConfig,
        });
      } else {
        updatedConfig = { ...defaultConfig, ...newConfig };
        await createItem("user_config", {
          config: updatedConfig,
          user: currentUser.id,
        });
      }

      set({ config: updatedConfig });
    } catch (error) {
      console.error("Failed to update config:", error);
      set({
        error:
          error instanceof Error ? error : new Error("Failed to update config"),
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
