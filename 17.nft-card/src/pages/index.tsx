import Head from 'next/head';
import { useAmp } from 'next/amp';

export const config = { amp: 'hybrid' };

export async function getStaticProps() {
  const res = await fetch('http://www.randomnumberapi.com/api/v1.0/random?min=1000&max=10000');
  const code = await res.json();
  return {
    props: { code },
    revalidate: 10,
  };
}

export default function Home({ code }: { code: number[] }) {
  const isAmp = useAmp();
  return (
    <>
      <Head>
        <title>Frontend Mentor | 17.nftCard</title>
        {isAmp && (
          <>
            <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
          </>
        )}
      </Head>
        {isAmp ? 
          <amp-fit-text width="300" height="80" layout="responsive">3429</amp-fit-text>
        :
          <p className="text-red-500">{ code }</p> 
        }
    </>
  );
}
