// drizzle.config.ts
import type { Config } from "drizzle-kit";

const {
	LOCAL_DB_PATH,
	WRANGLER_CONFIG,
	DB_NAME = "prod-db",
} = process.env;

// Use better-sqlite driver for local development
export default LOCAL_DB_PATH
	? ({
			schema: "./schema.ts",
			driver: "better-sqlite",
			dbCredentials: {
				url: LOCAL_DB_PATH,
			},
		} satisfies Config)
	: ({
			schema: "./schema.ts",
			out: "./migrations",
			driver: "d1",
			dbCredentials: {
				wranglerConfigPath:
					WRANGLER_CONFIG
						? ` ${WRANGLER_CONFIG}`
						: "",
				dbName: DB_NAME,
			},
		} satisfies Config);
