import { json } from '@remix-run/cloudflare';
export function loader({ request, context }) {
  console.log('hit webhooks loader')
  return json({ ok: true })
}
export function action({ request, context }) {
  console.log('hit webhooks action')
  return json({ ok: true })
}