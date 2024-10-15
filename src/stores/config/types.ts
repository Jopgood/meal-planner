import { BaseColor } from "@/styles/base-colours";

export interface Config {
  style: string;
  theme: BaseColor["name"];
  radius: number;
  mode: "dark" | "light" | "system";
}

export interface ConfigState {
  config: Config;
  isLoading: boolean;
  error: Error | null;
  setConfig: (config: Partial<Config>) => Promise<void>;
  updateOrCreateConfig: (config?: Partial<Config>) => Promise<void>;
  hydrate: () => Promise<void>;
}
