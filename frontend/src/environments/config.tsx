import { devEnvironment } from "./environment.dev";
import { localEnvironment } from "./environment.local";
import type { Environment } from "./environment.model";
import { prodEnvironment } from "./environment.prod";

export const environmentConfig: Environment = (() => {
  // We're not using process.env.NODE_ENV because it's set to "production" by default in Vercel, which affects staging env
  switch (process.env.NEXT_PUBLIC_ENVIRONMENT) {
    case "local":
      return localEnvironment;
    case "dev":
      return devEnvironment;
    case "prod":
      return prodEnvironment;
    default:
      console.warn("No environment specified, defaulting to local");
      return localEnvironment;
  }
})();
