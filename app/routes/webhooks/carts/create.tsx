import '@shopify/shopify-api/adapters/cf-worker';
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import {shopify} from "~/shopify.server";
// import {json} from '@remix-run/cloudflare'
// import {initDB} from '~/db.server'
// import { eq } from 'drizzle-orm';
// import {schema} from '~/shopify.server'

// Note: this is the route-based approach to handling webhooks. The standard webhook endpoint is handled with /webhooks/route.tsx
// I prefer this approach because it allows me to handle the webhook in the same route as the webhook callback.
// It reduces complex handling of webhooks on larger projects.

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const { topic, shop, session, admin } = await shopify(context).authenticate.webhook(request);
  console.log('Hit Carts Created Webhook', topic)
};