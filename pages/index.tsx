import Head from "next/head"
import Mint from "./mint";

export default function Home() {

    return (
    <>
        <Head>
        <title>Bohaniqa - Mint</title>
        <meta name="description" content="10K digital mining machines." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <Mint/>
        </main>
    </>
    )
}