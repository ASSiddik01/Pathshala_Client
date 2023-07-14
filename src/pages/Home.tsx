import Banner from "../sections/Banner";
import Head from "../components/Head";
import { Books } from "../sections/Books";

export default function Home() {
  return (
    <>
      <Head title="" />
      <div className="layout">
        <Banner />
        <Books />
      </div>
    </>
  );
}
