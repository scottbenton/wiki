import Head from "next/head";
import { Card } from "components/shared/Card";
import { PageLayout } from "components/layout/PageLayout";
const Home: React.FC = (props) => {
  return (
    <PageLayout>
      <Head>
        <title>Wiki App</title>
        <link rel="icon" href="/favicon.ico" sizes={"any"} />
        <link rel="icon" href="/icon.svg" type={"image/svg+xml"} />
        <link rel="apple-touch-icon" href={"/apple-touch-icon.png"} />
        <link rel="manifest" href={"/manifest.webmanifest"} />
        <meta name="author" content="Scott Benton" />
      </Head>
      <h1 className="text-red-500">Test Application</h1>
      <Card className="flex p-4">Test Card</Card>
    </PageLayout>
  );
};

export default Home;
