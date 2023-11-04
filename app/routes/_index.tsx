import { Page, Card, EmptyState, Layout } from '@shopify/polaris';


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
