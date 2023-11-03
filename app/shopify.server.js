import { restResources } from "@shopify/shopify-api/rest/admin/2023-10";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
} from '@shopify/shopify-app-remix';
import { MemorySessionStorage } from '@shopify/shopify-app-session-storage-memory';

const session = new MemorySessionStorage();

export const shopify = (env) =>  shopifyApp({
  apiKey: env.SHOPIFY_APP_KEY,
  apiSecretKey: env.SHOPIFY_APP_SECRET,
  appUrl: env.APP_URL,
  scopes: env.SHOPIFY_APP_SCOPES.split(","),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  sessionStorage: session,
  authPathPrefix: "/auth",
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
});