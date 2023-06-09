import Head from "next/head"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import collectionLogo from "../public/collection.png";
import {
  CandyMachine,
  Metaplex,
  Nft,
  NftWithToken,
  PublicKey,
  Sft,
  SftWithToken,
  findMetadataPda,
  walletAdapterIdentity,
} from "@metaplex-foundation/js"
import { Keypair, Transaction, TransactionInstruction } from "@solana/web3.js"
import {
  getRemainingAccountsForCandyGuard,
  mintV2Instruction,
} from "@/utils/mintV2"
import { fromTxError } from "@/utils/errors";
import { SystemProgram, AccountMeta } from "@solana/web3.js";
import { utf8 } from "@metaplex-foundation/umi";
import { isWritable } from "@metaplex-foundation/mpl-candy-machine";
import Image from "next/image";

// import {
//     Metaplex,
//     walletAdapterIdentity as oldWalletAdapterIdentity,
// } from "@metaplex-foundation/js"
// import { 
//     Umi,
//     generateSigner,
//     publicKey,
//     transactionBuilder, 
// } from "@metaplex-foundation/umi";
// import { 
//     createUmi, 
// } from "@metaplex-foundation/umi-bundle-defaults";
// import { 
//     CandyMachine,
//     mplCandyMachine, 
//     fetchCandyMachine,
//     fetchCandyGuard,
//     CandyGuard,
//     mintV2, 
// } from "@metaplex-foundation/mpl-candy-machine";
// import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
// import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import { mintV2Instruction } from "@/utils/mintV2";
// import { fromTxError } from "@/utils/errors";
// import { createAccount, createAccountWithRent, setComputeUnitLimit } from "@metaplex-foundation/mpl-essentials";

const network = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
if (!network) {
    throw new Error("Please provide a cluster url.");
}

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID;
if (!candyMachineId) {
    throw new Error("Please provide a candy machine id.");
}

const collectionName = process.env.NEXT_PUBLIC_COLLECTION_NAME;
if (!collectionName) {
    throw new Error("Please provide a collection name.");
}

const collectionDescription = process.env.NEXT_PUBLIC_COLLECTION_DESCRIPTION;
if (!collectionDescription) {
    throw new Error("Please provide a collection description.");
}

const shiftProgramId = process.env.NEXT_PUBLIC_SHIFT_PROGRAM_ID;
if (!shiftProgramId) {
    throw new Error("Please provide a shift program id.");
}

// const candyMachinePubkey = publicKey(candyMachineId);
// const umi = createUmi(network).use(mplCandyMachine());
const solPrice = 0.01;
let purchased = 0;

export default function Mint() {

    // const wallet = useWallet()
    // const { publicKey } = wallet
    // const { connection } = useConnection()
    // // const [metaplex, setMetaplex] = useState<Metaplex | null>(null)
    // const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null)
    // const [candyGuard, setCandyGuard] = useState<CandyGuard | null>(null)
    // const [formMessage, setFormMessage] = useState<string | null>(null)
    // const [showIndicator, setShowIndicator] = useState<boolean>(false)

    const wallet = useWallet()
    const { publicKey } = wallet
    const { connection } = useConnection()
    const [metaplex, setMetaplex] = useState<Metaplex | null>(null)
    const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null)
    // const [collection, setCollection] = useState<Sft | SftWithToken | Nft | NftWithToken | null>(null)
    const [formMessage, setFormMessage] = useState<any | null>(null)
    const [nftMint, setNftMint] = useState<PublicKey | null>(null)
    const [showIndicator, setShowIndicator] = useState<boolean>(true)

    // useEffect(() => {
    // ;(async () => {
    //     if (wallet && connection &&!candyMachine) {

    //         umi.use(walletAdapterIdentity(wallet));

    //         // const metaplex = new Metaplex(connection).use(oldWalletAdapterIdentity(wallet));
    //         // setMetaplex(metaplex);

    //         // const candyMachine = await metaplex
    //         //     .candyMachines()
    //         //     .findByAddress({ address: new PublicKey(candyMachineId as string) });
    //         const candyMachine = await fetchCandyMachine(umi, candyMachinePubkey);
    //         setCandyMachine(candyMachine);

    //         const candyGuard = await fetchCandyGuard(umi, candyMachine.mintAuthority);
    //         console.log('CANDY GUARD', candyGuard);
    //         setCandyGuard(candyGuard);
    //     }
    //     })()
    // }, [wallet, connection])

    useEffect(() => {
        ;(async () => {
            if (wallet && connection && !candyMachine) {
                if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
                    throw new Error("Please provide a candy machine id")
                }
                const metaplex = new Metaplex(connection).use(
                    walletAdapterIdentity(wallet)
                )
                setMetaplex(metaplex)

                const candyMachine = await metaplex.candyMachines().findByAddress({
                    address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID),
                })

                setCandyMachine(candyMachine)
                setShowIndicator(false)

                // const collection = await metaplex
                //     .nfts()
                //     .findByMint({ mintAddress: candyMachine.collectionMintAddress })
                // setCollection(collection)
                // console.log(collection)
            }
        })()
      }, [wallet, connection])

    // const handleMintV3 = async () => {
    //     setShowIndicator(true);
    //     try {
    //         if (publicKey && candyMachine) {
    //             const balance = await connection.getBalance(publicKey);
    //             const solBalance = balance / 1e9;
    //             if (solBalance < solPrice) throw "Insufficient balance.";
    //             const nftMint = generateSigner(umi);
    //             await transactionBuilder()

    //                 .add(
    //                     setComputeUnitLimit(
    //                         umi, { 
    //                         units: 800_000,
    //                     }),
    //                 )
    //                 .add(
    //                     mintV2(
    //                         umi, {
    //                         candyMachine: candyMachine.publicKey,
    //                         nftMint: nftMint,
    //                         collectionMint: candyMachine.collectionMint,
    //                         collectionUpdateAuthority: candyMachine.authority,
    //                     })
    //                 )
    //                 .sendAndConfirm(
    //                     umi,
    //                 );
    //             setFormMessage("Mint successful!");
    //         }
    //     } catch (error) {
    //         console.log('MINT ERROR', error);
    //         setFormMessage(typeof error === "string" ? error : "Mint failed.");
    //     } finally {
    //         setShowIndicator(false);
    //     }
    // }

    const createShiftProgramIx = (
        instruction: number,
        keys: AccountMeta[],
        data: number[],
    ): TransactionInstruction => {
        return new TransactionInstruction({
            programId: new PublicKey(shiftProgramId!),
            keys: keys,
            data: Buffer.from([instruction, ...data]),
        })
    }

    const createAccountMeta = (
        pubkey: PublicKey, 
        writbale: boolean,
        signer: boolean,
    ): AccountMeta => {
        return {
            pubkey: pubkey,
            isSigner: signer ?? false,
            isWritable: writbale ?? false,
        }
    }

    const findMetadataAddress = (
        mint: PublicKey,
      ) => {
        const mplProgramId = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        return PublicKey.findProgramAddressSync(
            [
                utf8.serialize("metadata"), 
                mplProgramId.toBytes(),
                mint.toBytes(),
            ], 
            mplProgramId,
        );
    }

    const createEmployeeIX = (
        employerPDA: [PublicKey, number],
        employeePDA: [PublicKey, number],
        shiftProgram: PublicKey,
        nftMint: PublicKey,
    ): TransactionInstruction => {
        // const shiftPubkey = new PublicKey(shiftProgramId!);
        // const employerSeed = utf8.serialize("employer");
        // const employerPDA = PublicKey.findProgramAddressSync([employerSeed], shiftPubkey);
        // const employeeSeed = utf8.serialize("employee");
        // const employeePDA = PublicKey.findProgramAddressSync([employeeSeed, nftMint.toBytes()], shiftPubkey);
        const nftMetadata = findMetadataAddress(nftMint);
        return createShiftProgramIx(
            6, [
                createAccountMeta(employerPDA[0], true, false),
                createAccountMeta(nftMint, false, false),
                createAccountMeta(nftMetadata[0], false, false),
                createAccountMeta(publicKey!, true, true),
                createAccountMeta(employeePDA[0], true, false),
                createAccountMeta(shiftProgram, false, false),
                createAccountMeta(SystemProgram.programId, false, false),
            ], [
                employeePDA[1],
            ],
        )
    }

    const initializeEmployeeIX = (
        employeePDA: [PublicKey, number],
        nftMint: PublicKey,
    ): TransactionInstruction => {
        const nftMetadata = findMetadataAddress(nftMint);
        return createShiftProgramIx(
            7, [
                createAccountMeta(employeePDA[0], true, false),
            ], [
                employeePDA[1],
                ...(Array.from(nftMint.toBytes())),
            ],
        )
    }

    const handleMintV2 = async () => {

        if (!metaplex || !candyMachine || !publicKey || !candyMachine.candyGuard) {
            if (!candyMachine?.candyGuard)
            throw new Error(
                "This app only works with Candy Guards. Please setup your Guards through Sugar."
            )

            throw new Error(
                "Couldn't find the Candy Machine or the connection is not defined."
            )
        }

        try {
            setShowIndicator(true);
            setFormMessage(null);
            setNftMint(null);

            const { remainingAccounts, additionalIxs } =
                getRemainingAccountsForCandyGuard(candyMachine, publicKey)


            const mint = Keypair.generate()
            const { instructions } = await mintV2Instruction(
                candyMachine.candyGuard?.address,
                candyMachine.address,
                publicKey,
                publicKey,
                mint,
                connection,
                metaplex,
                remainingAccounts
            )

            const tx = new Transaction()

            if (additionalIxs?.length) {
                tx.add(...additionalIxs)
            }

            tx.add(...instructions)

            const nftMint = mint.publicKey;
            const shiftProgram = new PublicKey(shiftProgramId!);
            const employerSeed = utf8.serialize("employer");
            const employerPDA = PublicKey.findProgramAddressSync([employerSeed], shiftProgram);
            const employeeSeed = utf8.serialize("employee");
            const employeePDA = PublicKey.findProgramAddressSync([employeeSeed, nftMint.toBytes()], shiftProgram);
            tx.add(createEmployeeIX(
                employerPDA,
                employeePDA,
                shiftProgram,
                nftMint,
            ))
            tx.add(initializeEmployeeIX(
                employeePDA,
                nftMint,
            ))

            tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

            const txid = await wallet.sendTransaction(tx, connection, {
                signers: [mint],
            })

            const latest = await connection.getLatestBlockhash()
            await connection.confirmTransaction({
                blockhash: latest.blockhash,
                lastValidBlockHeight: latest.lastValidBlockHeight,
                signature: txid,
            })
            const networkMatches = connection.rpcEndpoint.match(/^https:\/\/api\.([^.]+)\.solana\.com/);
            const network = networkMatches != null ? networkMatches[1] : null;
            const href = `https://solscan.io/token/${mint.publicKey.toBase58()}?cluster=${network}`;

            ++purchased;
            setFormMessage(
                <span>
                    Success! View on <a target="_blank" title="BOQ Miner" href={href}>solscan</a>.
                </span>);
            setNftMint(mint.publicKey);
            console.log('MINT ADDRESS', mint.publicKey);
        } catch (e) {
            const msg = fromTxError(e)
            if (msg) {
                setFormMessage(msg.message);
            } else {
                setFormMessage("Mint failed.");
            }
        } finally {
            setShowIndicator(false);
        }
    }

    // const solPaymentOption = candyGuard?.guards?.solPayment;
    // const cost = solPaymentOption && isSome(solPaymentOption)
    //     ? (Number(solPaymentOption.value.lamports.basisPoints) / 1e9)
    //     : null;

    const sold = !candyMachine ? null : Number(candyMachine.itemsMinted) + purchased;
    const collectionSize = 10000;
    const soldOut = sold != null && sold == collectionSize;

    return (
        <div
            style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            }}
        >
            <Image
            alt="Collection"
            style={{ maxWidth: "396px", borderRadius: "8px" }}
            src={collectionLogo.src}
            />
            <div
            style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "320px",
            }}
            >
            <h1>{collectionName}</h1>
            <p style={{ color: "#807a82", marginTop: "8px", marginBottom: "32px" }}>
                {collectionDescription}
            </p>

            <div
                style={{
                display: "flex",
                flexDirection: "column",
                background: "#292929",
                padding: "24px",
                borderRadius: "8px",
                }}
            >
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                }}
                >
                <span>Price</span>
                <b>{solPrice != null ? solPrice + " SOL" : "-"}</b>
                </div>
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
                >
                <span style={{ fontSize: "12px" }}>Sold</span>
                <span style={{ fontSize: "12px" }}>{sold ?? "-"} / {collectionSize}</span>
                </div>
                <div className="mint">
                    <button disabled={!publicKey || showIndicator || soldOut} onClick={handleMintV2}>
                        Mint
                    </button>
                    {showIndicator && <span className="indicator"></span>}
                </div>
                <WalletMultiButton
                style={{
                    width: "100%",
                    height: "auto",
                    marginTop: "8px",
                    textAlign: "center",
                    fontSize: "14px",
                    backgroundColor: "#141414",
                    borderRadius: "8px",
                    justifyContent: "center",
                }}
                />
                {formMessage && <div className="message">
                    {formMessage}
                </div>}
            </div>
            </div>
        </div>
    )
}