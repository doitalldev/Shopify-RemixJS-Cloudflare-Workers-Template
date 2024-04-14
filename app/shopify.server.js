import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from '@shopify/shopify-app-remix';

import {DrizzleSessionStorageSQLite} from '@shopify/shopify-app-session-storage-drizzle';
import { drizzle } from "drizzle-orm/d1";

import {sessionTable} from 'schema';

export * as schema from "schema";

export const shopify = (env) =>  {
const d1Session = new DrizzleSessionStorageSQLite(drizzle(env.DB), sessionTable);

return shopifyApp({
  apiKey: env.SHOPIFY_APP_KEY,
  apiSecretKey: env.SHOPIFY_APP_SECRET,
  appUrl: env.APP_URL,
  scopes: env.SHOPIFY_APP_SCOPES.split(","),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  sessionStorage: d1Session,
  authPathPrefix: "/auth",
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
});
}
