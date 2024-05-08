// import "@shopify/shopify-app-remix/adapters/cloudflare";
import {
  ApiVersion,
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-04";
import { webhookConfig } from "./routes/webhooks/config.tsx";


import { DrizzleSessionStorageSQLite } from '@shopify/shopify-app-session-storage-drizzle';

import { sessionTable } from 'schema';
import { initDB } from './db.server';

export * as schema from "schema";

export const shopify = (context) => {
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
    webhooks: webhookConfig,
    hooks: {
      afterAuth: async ({ session }) => {
        await shopify(context).registerWebhooks({ session });
      },
    },
  });

}