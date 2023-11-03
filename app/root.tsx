import { json, type LinksFunction } from "@remix-run/cloudflare";
import { cssBundleHref } from "@remix-run/css-bundle";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { LoaderFunctionArgs } from '@remix-run/cloudflare';
import { useLoaderData } from "@remix-run/react";
import { AppProvider } from '@shopify/shopify-app-remix/react';
import {shopify} from '~/shopify.server';
import { LiveReload } from '../app/components/LiveReload';


export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];


export async function loader({ request, context }: LoaderFunctionArgs) {
  await shopify(context.env).authenticate.admin(request);

  return json({
    apiKey: context.env.SHOPIFY_APP_KEY,
  });
}

export default function App() {
  const { apiKey } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider apiKey={apiKey} isEmbeddedApp>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload port={8002}/>
        </AppProvider>
      </body>
    </html>
  );
}
