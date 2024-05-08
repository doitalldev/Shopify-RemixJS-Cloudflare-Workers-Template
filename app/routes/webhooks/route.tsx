import '@shopify/shopify-api/adapters/cf-worker';
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { shopify } from "~/shopify.server";
import { json } from '@remix-run/cloudflare'
import { initDB } from '~/db.server'
import { eq } from 'drizzle-orm';
import { schema } from '~/shopify.server'

// NOTE: This is how the standard webhook endpoint is handled. I prefer the route-based approach which you can view with /carts/create.tsx

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { topic, shop, session, admin } = await shopify(context).authenticate.webhook(request);
  const db = initDB(context)

  console.log('Hit Primary Webhook Endpoint')

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.delete(schema.sessionTable).where(eq(session.shop, shop))
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
      // TODO: Handle Customer Data Request
      break;
    case "CUSTOMERS_REDACT":
      // TODO: Handle Customer Redact
      break;
    case "SHOP_REDACT":
      // TODO: Handle Shop Redact
      break;
    default:
      // If there is a topic, but is not one we handle, return a 404
      return json({}, 404)
  }

  // Always return a 200, so Shopify knows the webhook was received
  return json({}, 200)
};

