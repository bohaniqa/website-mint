import Head from "next/head"
import Image from "next/image"
import logoImage from "../public/logo-white.png";
import nft0 from "../public/0.png";
import nft9999 from "../public/9999.png";
import twitterImage from "../public/twitter-white.png";
import discordImage from "../public/discord-white.png";

export default function Home() {

    return (
    <>
        <Head>
        <title>BOHANIQA</title>
        <meta name="description" content="10K digital mining machines." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
            <nav id="nav">
                <a className="logo">
                    <Image alt="Logo" src={logoImage.src}/>
                </a>
                <ul className="menu">
                    <li>
                        <a className="button disabled">Mint</a>
                    </li>
                    <li>
                        <a className="button disabled">Launch App</a>
                    </li>
                </ul>
            </nav>

            <div id="splash">
                <div className="container">
                    <div className="row">
                        <Image alt="NFT Miner #1" src={nft0.src}/>
                        <Image alt="NFT Miner #10000" src={nft9999.src}/>
                    </div>
                    <div className="row">
                        <h1>10K Digital Mining Machines.</h1>
                    </div>
                    <div className="row">
                        <a target="_blank" href="https://twitter.com/bohaniqa">
                            <Image alt="Twitter" src={twitterImage.src}/>
                        </a>
                        <a target="_blank" href="https://discord.gg/Ht2g2fRQbs">
                            <Image alt="Discord" src={discordImage.src}/>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    </>
    )
}