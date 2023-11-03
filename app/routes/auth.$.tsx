// app/routes/auth/$.tsx
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import {shopify} from '../shopify.server'


export async function loader({ request, context }: LoaderFunctionArgs) {
  console.log('hit auth loader')
  await shopify(context.env).authenticate.admin(request);
  return null;
}