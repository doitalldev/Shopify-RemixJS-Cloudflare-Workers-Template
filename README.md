# A template for developing Shopify Apps using RemixJS and Cloudflare Workers

## Why?
I'm a glutton for performance and I love the idea of using Cloudflare Workers to serve my Shopify App from their global CDN. I also really enjoy working with RemixJS and especially with Shopify apps.

This template is a starting point for building a Shopify App using RemixJS and Cloudflare Workers. It's not a complete app, but it does provide a good starting point for building a Shopify App and I will be continuing to implement Cloudflare technologies into it. (Like KV, D1, etc.)

## Getting Started

### 1. Clone this repo
```bash
git clone git@github.com:refactor-this/Shopify-RemixJS-Cloudflare-Workers-Template.git
```
### 2. Install dependencies
I'm using pnpm to manage dependencies. You can install it with npm or yarn if you prefer.
```bash
pnpm install
```

### 3. Create your environment variables
Copy the `example.wrangler.toml` to your own `wrangler.toml` file and fill in the environment variables. (You should have a Shopify app created already on their partner dashboard so you can get the client id and secret.)

For the app url, I set up a free tunnel service using Cloudflare. You can follow how I set that up here: https://thingify.dev/creating-a-free-tunnel-service-for-developing-shopify-apps/

As an alternative, you can use http://localhost:8002

### 4. Start the dev server
```bash
pnpm dev
```
### 5. Happy coding!