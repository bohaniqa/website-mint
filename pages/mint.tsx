import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import collectionLogo from "../public/collection.png";
// import {
// //   CandyMachine,
//   Metaplex,
//   PublicKey,
//   walletAdapterIdentity,
// } from "@metaplex-foundation/js"
import { AccountMeta, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js"
// import {
//   getRemainingAccountsForCandyGuard,
//   mintV2Instruction,
// } from "@/utils/mintV2"
// import { fromTxError } from "@/utils/errors";
// import { SystemProgram, AccountMeta } from "@solana/web3.js";
import { Instruction, utf8 } from "@metaplex-foundation/umi";
import Image from "next/image";
import Countdown from "./countdown";

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
//     // mintV2, 
// } from "@metaplex-foundation/mpl-candy-machine";
// import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
// import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import { mintV2Instruction } from "@/utils/mintV2";
// import { fromTxError } from "@/utils/errors";
// import { createAccount, createAccountWithRent, setComputeUnitLimit } from "@metaplex-foundation/mpl-essentials";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { 
  generateSigner,
  Option,
  publicKey as umiPublicKey,
  some,
  transactionBuilder,
  unwrapSome
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
// import { setComputeUnitLimit } from '@metaplex-foundation/mpl-essentials';
import { mplTokenMetadata, fetchDigitalAsset, TokenStandard } from "@metaplex-foundation/mpl-token-metadata";
import { 
    mplCandyMachine, 
  fetchCandyMachine, 
  mintV2, 
  safeFetchCandyGuard, 
  DefaultGuardSetMintArgs, 
  DefaultGuardSet, 
  SolPayment, 
  CandyMachine, 
  CandyGuard 
} from "@metaplex-foundation/mpl-candy-machine";
import { setComputeUnitLimit } from "@metaplex-foundation/mpl-toolbox";

const network = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;
if (!network) {
    throw new Error("Please provide a cluster url.");
}
console.log('RPC URL', network);

const candyMachineId = process.env.NEXT_PUBLIC_CANDY_MACHINE_ID;
if (!candyMachineId) {
    throw new Error("Please provide a candy machine id.");
}
console.log('Candy Machine ID', candyMachineId);

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
console.log('Shift Program ID', shiftProgramId);

const candyMachinePubkey = umiPublicKey(candyMachineId);
let umi = createUmi(network).use(mplCandyMachine());
const solPrice = 0.0;
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
    umi = umi.use(walletAdapterIdentity(wallet));
    const { connection } = useConnection()
    // const [metaplex, setMetaplex] = useState<Metaplex | null>(null)
    const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null)
    const [candyGuard, setCandyGuard] = useState<CandyGuard | null>(null)
    // const [collection, setCollection] = useState<Sft | SftWithToken | Nft | NftWithToken | null>(null)
    const [formMessage, setFormMessage] = useState<any | null>(null)
    const [nftMint, setNftMint] = useState<PublicKey | null>(null)
    const [showIndicator, setShowIndicator] = useState<boolean>(true)
    const [enabled, setEnabled] = useState<boolean>(true);

    useEffect(() => {
    ;(async () => {
        if (wallet && connection &&!candyMachine) {

            umi = umi.use(walletAdapterIdentity(wallet));

            const candyMachine = await fetchCandyMachine(umi, candyMachinePubkey);
            setCandyMachine(candyMachine);

            const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
            setCandyGuard(candyGuard);

            setShowIndicator(false);
        }
        })()
    }, [wallet, connection])

    // useEffect(() => {
    //     ;(async () => {
    //         if (wallet && connection && !candyMachine) {
    //             if (!candyMachineId) {
    //                 throw new Error("Please provide a candy machine id")
    //             }
    //             const metaplex = new Metaplex(connection).use(
    //                 walletAdapterIdentity(wallet)
    //             )
    //             setMetaplex(metaplex)

    //             const x = await fetchCandyMachine(umi, candyMachinePubkey);
    //             console.log('CM', x);    

    //             const candyMachine = await metaplex.candyMachines().findByAddress({
    //                 address: new PublicKey(candyMachineId),
    //             })

    //             setCandyMachine(candyMachine)
    //             setShowIndicator(false)

    //             // const collection = await metaplex
    //             //     .nfts()
    //             //     .findByMint({ mintAddress: candyMachine.collectionMintAddress })
    //             // setCollection(collection)
    //             // console.log(collection)
    //         }
    //     })()
    //   }, [wallet, connection, candyMachine])
    
    const handleMintV3 = async () => {
        setShowIndicator(true);
        try {
            if (publicKey && candyMachine && candyGuard) {
                const balance = await connection.getBalance(publicKey);
                const solBalance = balance / 1e9;
                if (solBalance < solPrice) throw "Insufficient balance.";

                const nftSigner = generateSigner(umi);

                const mintArgs: Partial<DefaultGuardSetMintArgs> = {};

                const defaultGuards: DefaultGuardSet | undefined = candyGuard?.guards;
                const solPaymentGuard: Option<SolPayment> | undefined = defaultGuards?.solPayment;
                if (solPaymentGuard) {
                    const solPayment: SolPayment | null  = unwrapSome(solPaymentGuard);
                    console.log('SOL PAYMENT', Number(solPayment!.lamports.basisPoints) / 1e9);
                    if (solPayment) {
                        const treasury = solPayment.destination;      
                        console.log('SOL RECEIVE', treasury);  
                        mintArgs.solPayment = some({
                            destination: treasury
                        });
                    }
                }

                const shiftProgram = new PublicKey(shiftProgramId!);
                const employerSeed = utf8.serialize("employer");
                const employerPDA = PublicKey.findProgramAddressSync([employerSeed], shiftProgram);
                const employeeSeed = utf8.serialize("employee");
                const nftPubkey = new PublicKey(nftSigner.publicKey);
                const employeePDA = PublicKey.findProgramAddressSync([employeeSeed, nftPubkey.toBytes()], shiftProgram);
                const ceIx =createEmployeeIX(
                    employerPDA,
                    employeePDA,
                    shiftProgram,
                    nftPubkey,
                );
                const ieIx = initializeEmployeeIX(
                    employeePDA,
                    nftPubkey,
                );
                const umiTx = transactionBuilder()
                    .add(
                        setComputeUnitLimit(
                            umi, { 
                            units: 800_000,
                        }),
                    )
                    .add(
                        mintV2(
                            umi, {
                            candyMachine: candyMachine.publicKey,
                            collectionMint: candyMachine.collectionMint, 
                            collectionUpdateAuthority: candyMachine.authority, 
                            nftMint: nftSigner,
                            candyGuard: candyGuard?.publicKey,
                            mintArgs: mintArgs,
                            tokenStandard: TokenStandard.ProgrammableNonFungible
                        })
                    )
                
                const ixs = umiTx.getInstructions();
                const tx = new Transaction();
                tx.add(...ixs.map((ix) => { return ixToTxIx(ix) }));
                tx.add(ceIx);
                tx.add(ieIx);

                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

                const txid = await wallet.sendTransaction(tx, connection, {
                    signers: [Keypair.fromSecretKey(nftSigner.secretKey)],
                })

                const latest = await connection.getLatestBlockhash()
                await connection.confirmTransaction({
                    blockhash: latest.blockhash,
                    lastValidBlockHeight: latest.lastValidBlockHeight,
                    signature: txid,
                })

                // await umiTx.sendAndConfirm(umi, {
                //     confirm: { commitment: "confirmed" }, 
                //     send: { skipPreflight: true },
                // });

                const networkMatches = connection.rpcEndpoint.match(/^https:\/\/api\.([^.]+)\.solana\.com/);
                const network = networkMatches != null ? networkMatches[1] : null;
                const href = `https://solscan.io/token/${nftPubkey.toBase58()}`;

                ++purchased;
                setFormMessage(
                    <span>
                        Success! View on <a target="_blank" title="BOQ Miner" href={href}>solscan</a>.
                    </span>);
                setNftMint(nftPubkey);
                console.log('MINT ADDRESS', nftPubkey);
            }
        } catch (error) {
            console.log('MINT ERROR', error);
            setFormMessage(typeof error === "string" ? error : "Mint failed.");
        } finally {
            setShowIndicator(false);
        }
    }

    const ixToTxIx = (
        ix: Instruction
    ): TransactionInstruction => {
        return new TransactionInstruction({
            programId: new PublicKey(ix.programId),
            keys: ix.keys.map((v) => createAccountMeta(
                new PublicKey(v.pubkey), 
                v.isWritable, 
                v.isSigner
            )),
            data: Buffer.from(ix.data),
        });
    }

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
        const [employerPubkey, employerBump] = employerPDA;
        const [employeePubkey, employeeBump] = employeePDA;
        const [nftMetadataPubkey, nftMetadataBump] = findMetadataAddress(nftMint);
        return createShiftProgramIx(
            6, [
                createAccountMeta(employerPubkey, true, false),
                createAccountMeta(nftMint, false, false),
                createAccountMeta(nftMetadataPubkey, false, false),
                createAccountMeta(publicKey!, true, true),
                createAccountMeta(employeePubkey, true, false),
                createAccountMeta(shiftProgram, false, false),
                createAccountMeta(SystemProgram.programId, false, false),
            ], [
                employeeBump,
            ],
        )
    }

    const initializeEmployeeIX = (
        employeePDA: [PublicKey, number],
        nftMint: PublicKey,
    ): TransactionInstruction => {
        const [employeePubkey, employeeBump] = employeePDA;
        return createShiftProgramIx(
            7, [
                createAccountMeta(employeePubkey, true, false),
            ], [
                employeeBump,
                ...(Array.from(nftMint.toBytes())),
            ],
        )
    }

    // const handleMintV2 = async () => {

    //     if (!metaplex || !candyMachine || !publicKey || !candyMachine.candyGuard) {
    //         if (!candyMachine?.candyGuard)
    //         throw new Error(
    //             "This app only works with Candy Guards. Please setup your Guards through Sugar."
    //         )

    //         throw new Error(
    //             "Couldn't find the Candy Machine or the connection is not defined."
    //         )
    //     }

    //     try {
    //         setShowIndicator(true);
    //         setFormMessage(null);
    //         setNftMint(null);

    //         const { remainingAccounts, additionalIxs } =
    //             getRemainingAccountsForCandyGuard(candyMachine, publicKey)


    //         const mint = Keypair.generate()
    //         const { instructions } = await mintV2Instruction(
    //             candyMachine.candyGuard?.address,
    //             candyMachine.address,
    //             publicKey,
    //             publicKey,
    //             mint,
    //             connection,
    //             metaplex,
    //             remainingAccounts
    //         )

    //         const tx = new Transaction()

    //         if (additionalIxs?.length) {
    //             tx.add(...additionalIxs)
    //         }

    //         tx.add(...instructions)

    //         const nftMint = mint.publicKey;
    //         const shiftProgram = new PublicKey(shiftProgramId!);
    //         const employerSeed = utf8.serialize("employer");
    //         const employerPDA = PublicKey.findProgramAddressSync([employerSeed], shiftProgram);
    //         const employeeSeed = utf8.serialize("employee");
    //         const employeePDA = PublicKey.findProgramAddressSync([employeeSeed, nftMint.toBytes()], shiftProgram);
    //         tx.add(createEmployeeIX(
    //             employerPDA,
    //             employeePDA,
    //             shiftProgram,
    //             nftMint,
    //         ))
    //         tx.add(initializeEmployeeIX(
    //             employeePDA,
    //             nftMint,
    //         ))

    //         tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

    //         const txid = await wallet.sendTransaction(tx, connection, {
    //             signers: [mint],
    //         })

    //         const latest = await connection.getLatestBlockhash()
    //         await connection.confirmTransaction({
    //             blockhash: latest.blockhash,
    //             lastValidBlockHeight: latest.lastValidBlockHeight,
    //             signature: txid,
    //         })
    //         const networkMatches = connection.rpcEndpoint.match(/^https:\/\/api\.([^.]+)\.solana\.com/);
    //         const network = networkMatches != null ? networkMatches[1] : null;
    //         const href = `https://solscan.io/token/${mint.publicKey.toBase58()}?cluster=${network}`;

    //         ++purchased;
    //         setFormMessage(
    //             <span>
    //                 Success! View on <a target="_blank" title="BOQ Miner" href={href}>solscan</a>.
    //             </span>);
    //         setNftMint(mint.publicKey);
    //         console.log('MINT ADDRESS', mint.publicKey);
    //     } catch (e) {
    //         const msg = fromTxError(e)
    //         if (msg) {
    //             setFormMessage(msg.message);
    //         } else {
    //             setFormMessage("Mint failed.");
    //         }
    //     } finally {
    //         setShowIndicator(false);
    //     }
    // }

    // const solPaymentOption = candyGuard?.guards?.solPayment;
    // const cost = solPaymentOption && isSome(solPaymentOption)
    //     ? (Number(solPaymentOption.value.lamports.basisPoints) / 1e9)
    //     : null;

    const collectionSize = 10000;
    const sold = !candyMachine || !enabled ? null : collectionSize-(Number(candyMachine.itemsRedeemed)+purchased);
    const soldOut = enabled && sold != null && sold == collectionSize;

    return (
        <div
            className="container"
            style={{
            display: "flex",
            gap: "24px",
            }}
        >
            <div>
                <Image
                alt="Collection"
                src={collectionLogo.src}
                width={540}
                height={540}
                className="collection"
                />
            </div>
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
                    <b>{solPrice != null ? (solPrice == 0 ? "FREE" : solPrice + " SOL") : "-"}</b>
                </div>
                <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
                >
                    <span style={{ fontSize: "12px" }}>Remaining</span>
                    <span style={{ fontSize: "12px" }}>{sold ?? "-"}</span>
                </div>
                {/* <Countdown onTimeout={() => setEnabled(true)}></Countdown> */}
                <div className="mint">
                    <button disabled={!enabled || !publicKey || showIndicator || soldOut} onClick={handleMintV3}>
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