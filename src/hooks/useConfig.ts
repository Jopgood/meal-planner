import { useConfigStore } from "@/stores/config";
import { ConfigState } from "@/stores/config/types";

// Type for the return value of useConfig
type UseConfigReturn = Pick<
  ConfigState,
  "config" | "setConfig" | "hydrate" | "isLoading" | "error"
>;

// Typed hook for easier access to config actions
export const useConfig = (): UseConfigReturn => {
  const { config, setConfig, hydrate, isLoading, error } = useConfigStore();
  return { config, setConfig, hydrate, isLoading, error };
};
