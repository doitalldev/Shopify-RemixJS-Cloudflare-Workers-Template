import { Page, Card, EmptyState, Layout } from '@shopify/polaris';
import { schema, shopify } from '~/shopify.server';
import {initDB} from '~/db.server'
import {json} from '@remix-run/cloudflare'

export async function loader({ context, request }) {
  console.log('hit index loader')

  const test_data = await initDB(context)
    .select()
    .from(schema.sessionTable)
    .all();
    console.log('test_data', test_data)
  
  return json({message: 'hit index loader', status: 200},{status: 200})
}


export default function Index() {
  return (
    <Page>
      <Layout>
        <Card>
          <EmptyState
            heading="There's nothing here captain!"
            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          >
            <p>
              Congratulations on following the Readme and getting this far! Now it's time to build something awesome.
            </p>
          </EmptyState>
        </Card>
      </Layout>
    </Page>
  );
}
