import '@shopify/shopify-api/adapters/cf-worker';
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import {shopify} from "../shopify.server";
import {json} from '@remix-run/cloudflare'
import {initDB} from '../db.server'
import { eq } from 'drizzle-orm';
import {schema} from '~/shopify.server'


export const action = async ({ request, context }: ActionFunctionArgs) => {
  console.log('hit webhooks action')
  const { topic, shop, session, admin } = await shopify(context).authenticate.webhook(request);
  const db = initDB(context)

  console.log('hit webhooks', topic)
  if (!admin) {
    console.log('admin is false')
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.delete(schema.sessionTable).where(eq(session.shop, shop))
      }
      console.log('hit app uninstalled')

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};