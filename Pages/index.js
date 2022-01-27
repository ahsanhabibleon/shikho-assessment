import Head from "next/head";
import Header from "../Views/Components/Header";
import Crud from "../Views/Crud";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Crud />
      </main>
    </div>
  );
}
