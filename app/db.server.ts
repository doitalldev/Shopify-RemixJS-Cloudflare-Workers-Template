import type { AppLoadContext } from "@remix-run/cloudflare";
import { drizzle } from "drizzle-orm/d1";

type D1Database = import("@cloudflare/workers-types/experimental").D1Database;

interface MyLoadContext extends AppLoadContext {
  env: {
    DB: D1Database;
  };
}


export function initDB(context: MyLoadContext) {
  
  return drizzle(context.env.DB);
}

export * as schema from "../schema";