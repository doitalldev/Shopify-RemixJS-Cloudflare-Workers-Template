// import "@shopify/shopify-app-remix/adapters/cloudflare";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";


import { DrizzleSessionStorageSQLite } from '@shopify/shopify-app-session-storage-drizzle';
import { drizzle } from "drizzle-orm/d1";

import { sessionTable } from 'schema';
import { initDB } from './db.server';

export * as schema from "schema";

export const shopify = (context) => {
  try {
    const d1Session = new DrizzleSessionStorageSQLite(initDB(context), sessionTable);

    return shopifyApp({
      apiKey: context.env.SHOPIFY_APP_KEY,
      apiSecretKey: context.env.SHOPIFY_APP_SECRET || "",
      appUrl: context.env.APP_URL || "",
      scopes: context.env.SHOPIFY_APP_SCOPES.split(","),
      apiVersion: ApiVersion.April24,
      distribution: AppDistribution.AppStore,
      restResources,
      isEmbeddedApp: true,
      future: {
        unstable_newEmbeddedAuthStrategy: true,
        v3_lineItemBilling: true,
        v3_authenticatePublic: true,
        v3_webhookAdminContext: true,
      },
      sessionStorage: d1Session,
      authPathPrefix: "/auth",
      webhooks: {
        APP_UNINSTALLED: {
          deliveryMethod: DeliveryMethod.Http,
          callbackUrl: "/webhooks",
        },
        CARTS_CREATE: {
          deliveryMethod: DeliveryMethod.Http,
          callbackUrl: "/webhooks",
        },
      },
      hooks: {
        afterAuth: async ({ session }) => {
          console.log('afterauth processing webhooks')
          console.log('session', session)
          const register = await shopify(context).registerWebhooks({ session });
          console.log('registered webhooks', register)
        },
      },
    });
  } catch (err) {
    console.error("Failed to initialize Shopify app:", err);
    // Handle the error appropriately
    // You might want to rethrow the error or handle it differently depending on your needs
  }
}