import { DeliveryMethod } from "@shopify/shopify-app-remix/server";

export const webhookConfig = {
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/webhooks",
  },
  CARTS_CREATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/webhooks/carts/create",
  },
}
