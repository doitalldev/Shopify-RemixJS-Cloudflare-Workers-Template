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

For the app url, I set up a free tunnel service using Cloudflare. You can follow how I set that up here: https://innovonics.com/creating-a-free-tunnel-service-for-developing-shopify-apps/

As an alternative, you can use http://localhost:8002

You will also need to copy the `.example.vars` to `.dev.vars` and fill out the required values.

The reason we use the local `.{environment}.vars` file is because we want to keep the sensitive information out of the `wrangler.toml` file.

When adding the productions values, you would add them using the Cloudflare CLI with the encrypted flag `true`. This would keep the values secret but have no effect on the worker.

### 4. Start the dev server
```bash
pnpm dev
```
### 5. Happy coding!

## Creating the D1 Database

Creating the D1 database is fairly straightforward, run the next command to create one.

```bash
wrangler d1 create d1-example
```

You will receive an output in the terminal that looks like this:
```bash
[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "your-database-name"
database_id = "your-generated-database-id"
```

copy and paste it to your wrangler.toml file.


Now that we have our DB created, let's generate and apply migrations:

Generate migrations
```bash
pnpm db:generate
```
Apply migrations
```bash
pnpm dev:db:apply
```

You can also list pending migrations with 
```bash
pnpm dev:db:list
```

### Viewing data in your current database

You can view the data in your current database by running the following command:
```bash
pnpm db:studio:preview
```
This will open a Drizzle preview connection which you can view on your browser.

Or if you are like me an use a 3rd party tool you can access the D1 SQLite database directly. It is located at the top of your project folder.
```bash
.wrangler/state/v3/d1/miniflare-D1DatabaseObject/[some-random-string].sqlite
```

## Webhooks
