(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[819],{55974:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s},useCountdown:function(){return i}});var a=n(85893),r=n(67294);function s(e){let t=new Date(Date.UTC(2023,5,22,18,0,0)),[n,r,s,l,o]=i(t);if(n<=0)return e.onTimeout(),(0,a.jsx)(a.Fragment,{});let d=t.getHours();return(0,a.jsxs)("div",{className:"countdown",children:[(0,a.jsxs)("div",{className:"time",children:[(0,a.jsxs)("span",{className:"days",children:[r.toString().padStart(2,"0"),"d"]}),(0,a.jsx)("span",{className:"separator",children:":"}),(0,a.jsxs)("span",{className:"hours",children:[s.toString().padStart(2,"0"),"h"]}),(0,a.jsx)("span",{className:"separator",children:":"}),(0,a.jsxs)("span",{className:"minutes",children:[l.toString().padStart(2,"0"),"m"]}),(0,a.jsx)("span",{className:"separator",children:":"}),(0,a.jsxs)("span",{className:"seconds",children:[o.toString().padStart(2,"0"),"s"]})]}),(0,a.jsx)("div",{className:"date",children:(0,a.jsxs)("i",{children:["June 22, ",d>12?[d-12,"PM"]:[d,"AM"]]})})]})}let i=e=>{let t=new Date(e).getTime(),[n,a]=(0,r.useState)(t-new Date().getTime());return(0,r.useEffect)(()=>{let e=setInterval(()=>{a(t-new Date().getTime())},1e3);return()=>clearInterval(e)},[t]),l(n)},l=e=>[e,Math.floor(e/864e5),Math.floor(e%864e5/36e5),Math.floor(e%36e5/6e4),Math.floor(e%6e4/1e3)]},45016:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return _}});var a=n(85893),r=n(58455),s=n(54306),i=n(44718),l=n(67294),o={src:"/_next/static/media/collection.cb8551fe.png",height:540,width:540,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAWlBMVEU3ePk2ePk3ePo3d/k3ePo3ePo2d/k3ePo3d/o3d/k3d/o2d/k3ePo3d/o3ePo3ePo3d/o3ePo3d/o3d/k3ePk2d/o3d/o3d/k3ePo3ePk3d/o3d/k2d/o2d/nBcte/AAAAGHRSTlMBAQcHFRkZGioqOztFRe7v7/Dw8Pv7/v7scgYEAAAAO0lEQVR42gVAwQ2AQAijBeLD28D9R/RjKDV4DHG3yyPt4VR8r+ybBLNTY9KIAECtZtCuvGp8qFq2Yoc/ykYgOUTaV6MAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},d=n(27894),c=n(21267),u=n(59917),y=n(13550),p=n(32364),h=n(54517),m=n(58467),f=n(66242),g=n(15783),A=[],b=n(48764).Buffer;let x=p.PROGRAM_ID,P=new u.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");async function k(e,t,n,a,r,s,i,l,o,d){let c=await p.CandyMachine.fromAccountAddress(s,t),f=i.nfts().pdas().metadata({mint:r.publicKey}),g=i.nfts().pdas().masterEdition({mint:r.publicKey}),A=i.tokens().pdas().associatedTokenAccount({mint:r.publicKey,owner:n}),k=i.candyMachines().pdas().authority({candyMachine:t}),S=c.collectionMint,w=await i.nfts().findByMint({mintAddress:S}),B=i.nfts().pdas().metadata({mint:S}),v=i.nfts().pdas().masterEdition({mint:S}),j=i.nfts().pdas().metadataDelegateRecord({mint:S,type:"CollectionV1",updateAuthority:w.updateAuthorityAddress,delegate:k}),M={candyGuard:e,candyMachineProgram:x,candyMachine:t,payer:a,minter:n,candyMachineAuthorityPda:k,nftMasterEdition:g,nftMetadata:f,nftMint:r.publicKey,nftMintAuthority:a,token:A,collectionUpdateAuthority:w.updateAuthorityAddress,collectionDelegateRecord:j,collectionMasterEdition:v,collectionMetadata:B,collectionMint:S,tokenMetadataProgram:P,systemProgram:u.SystemProgram.programId,sysvarInstructions:u.SYSVAR_INSTRUCTIONS_PUBKEY,splTokenProgram:m.H_,splAtaProgram:m._u,recentSlothashes:u.SYSVAR_SLOT_HASHES_PUBKEY};c.version==p.AccountVersion.V2&&(M.tokenRecord=i.nfts().pdas().tokenRecord({mint:r.publicKey,token:A})),o||(o=new Uint8Array);let K={mintArgs:o,label:null!=d?d:null},R=[],E=(0,h.createMintV2Instruction)(M,K);for(let e=0;e<E.keys.length;e++)E.keys[e].pubkey.toBase58()===r.publicKey.toBase58()&&(E.keys[e].isSigner=!0,E.keys[e].isWritable=!0);l&&E.keys.push(...l);let G=b.from(Uint8Array.of(0,...new y.BN(6e5).toArray("le",4),...new y.BN(0).toArray("le",4))),C=new u.TransactionInstruction({keys:[],programId:u.ComputeBudgetProgram.programId,data:G});return R.push(C),R.push(E),{instructions:R}}let S=e=>{let{candyMachine:t,payer:n,guard:a,guardType:r}=e,s={startDate:()=>({}),solPayment:()=>({accounts:[{pubkey:a.destination,isSigner:!1,isWritable:!0}]}),allowList:()=>{if(!t.candyGuard)return{};let e={candyGuard:t.candyGuard.address,candyMachine:t.address,payer:n},a=(0,f.y3)(A),r=(0,f.g6)(A,n.toString()),s=b.alloc(4);g.u32.write(s,0,r.length);let i=b.concat([s,...r]),l={args:{guard:h.GuardType.AllowList,data:i},label:null},[o]=u.PublicKey.findProgramAddressSync([b.from("allow_list"),a,n.toBuffer(),t.candyGuard.address.toBuffer(),t.address.toBuffer()],h.PROGRAM_ID),d=(0,h.createRouteInstruction)(e,l);return d.keys.push(...[{pubkey:o,isSigner:!1,isWritable:!0},{pubkey:u.SystemProgram.programId,isSigner:!1,isWritable:!1}]),{ixs:[d],accounts:[{pubkey:o,isSigner:!1,isWritable:!1}]}},mintLimit:()=>{var e;if(!t.candyGuard)return{};let[r]=u.PublicKey.findProgramAddressSync([b.from("mint_limit"),new Uint8Array([a.id]),n.toBuffer(),null===(e=t.candyGuard)||void 0===e?void 0:e.address.toBuffer(),t.address.toBuffer()],h.PROGRAM_ID);return{accounts:[{pubkey:r,isSigner:!1,isWritable:!0}]}},tokenBurn:()=>{if(!t.candyGuard)return{};let e=new u.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"),[r]=u.PublicKey.findProgramAddressSync([n.toBuffer(),m.H_.toBuffer(),a.mint.toBuffer()],e);return{accounts:[{pubkey:r,isSigner:!1,isWritable:!0},{pubkey:a.mint,isSigner:!1,isWritable:!0}]}}};return s[r]?s[r]():(console.warn("Couldn't find remaining accounts for Guard "+r+". This can most likely cause the mint tx to fail."),{})},w=(e,t)=>{if(!e.candyGuard)return{};let{guards:n}=e.candyGuard,a=n&&Object.keys(n).filter(e=>n[e]),r=[],s=[];return a.length&&a.forEach(n=>{var a;let i=null===(a=e.candyGuard)||void 0===a?void 0:a.guards[n];if(!i)return null;console.log("Setting up ".concat(n," Guard..."));let{accounts:l,ixs:o}=S({candyMachine:e,payer:t,guard:i,guardType:n});l&&l.length&&r.push(...l),o&&o.length&&s.push(...o)}),{remainingAccounts:r,additionalIxs:s}};var B=n(38724),v=n(25675),j=n.n(v),M=n(55974),K=n(70503),R=n(78509),E=n(41713),G=n(48764).Buffer;let C="https://solana-mainnet.g.alchemy.com/v2/7bBFOKctvSUjOaKWnEX6_vG4iPUPVKcW";if(!C)throw Error("Please provide a cluster url.");console.log("RPC URL",C);let I="Gv78uUFi515qRpEUTXqRkbDDm5pwXJ1wC8J12JH72mMA";if(!I)throw Error("Please provide a candy machine id.");console.log("Candy Machine ID",I);let T="BOHANIQA";if(!T)throw Error("Please provide a collection name.");let D="10K digital mining machines.";if(!D)throw Error("Please provide a collection description.");let N="J1FMqW26pFkvgqezcS58DEuKgVPsMcPr7P2SugrBBbqa";if(!N)throw Error("Please provide a shift program id.");console.log("Shift Program ID",N);let U=(0,K.ZL)(I),V=(0,R.i)(C).use((0,E.mplCandyMachine)()),W=0;function _(){let e=(0,s.O)(),{publicKey:t}=e,{connection:n}=(0,i.R)(),[y,p]=(0,l.useState)(null),[m,f]=(0,l.useState)(null),[g,A]=(0,l.useState)(null),[b,x]=(0,l.useState)(null),[P,S]=(0,l.useState)(!0),[v,K]=(0,l.useState)(!1);(0,l.useEffect)(()=>{(async()=>{if(e&&n&&!m){if(!I)throw Error("Please provide a candy machine id");let t=new d.I(n).use((0,c.t)(e));p(t);let a=await (0,E.fetchCandyMachine)(V,U);console.log("CM",a);let r=await t.candyMachines().findByAddress({address:new u.PublicKey(I)});f(r),S(!1)}})()},[e,n,m]);let R=(e,t,n)=>new u.TransactionInstruction({programId:new u.PublicKey(N),keys:t,data:G.from([e,...n])}),C=(e,t,n)=>({pubkey:e,isSigner:null!=n&&n,isWritable:null!=t&&t}),_=e=>{let t=new u.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");return u.PublicKey.findProgramAddressSync([B.KA.serialize("metadata"),t.toBytes(),e.toBytes()],t)},O=(e,n,a,r)=>{let[s,i]=e,[l,o]=n,[d,c]=_(r);return R(6,[C(s,!0,!1),C(r,!1,!1),C(d,!1,!1),C(t,!0,!0),C(l,!0,!1),C(a,!1,!1),C(u.SystemProgram.programId,!1,!1)],[o])},L=(e,t)=>{let[n,a]=e;return R(7,[C(n,!0,!1)],[a,...Array.from(t.toBytes())])},H=async()=>{if(!y||!m||!t||!m.candyGuard){if(!(null==m?void 0:m.candyGuard))throw Error("This app only works with Candy Guards. Please setup your Guards through Sugar.");throw Error("Couldn't find the Candy Machine or the connection is not defined.")}try{var r;S(!0),A(null),x(null);let{remainingAccounts:s,additionalIxs:i}=w(m,t),l=u.Keypair.generate(),{instructions:o}=await k(null===(r=m.candyGuard)||void 0===r?void 0:r.address,m.address,t,t,l,n,y,s),d=new u.Transaction;(null==i?void 0:i.length)&&d.add(...i),d.add(...o);let c=l.publicKey,p=new u.PublicKey(N),h=B.KA.serialize("employer"),f=u.PublicKey.findProgramAddressSync([h],p),g=B.KA.serialize("employee"),b=u.PublicKey.findProgramAddressSync([g,c.toBytes()],p);d.add(O(f,b,p,c)),d.add(L(b,c)),d.recentBlockhash=(await n.getLatestBlockhash()).blockhash;let P=await e.sendTransaction(d,n,{signers:[l]}),v=await n.getLatestBlockhash();await n.confirmTransaction({blockhash:v.blockhash,lastValidBlockHeight:v.lastValidBlockHeight,signature:P});let j=n.rpcEndpoint.match(/^https:\/\/api\.([^.]+)\.solana\.com/),M=null!=j?j[1]:null,K="https://solscan.io/token/".concat(l.publicKey.toBase58(),"?cluster=").concat(M);++W,A((0,a.jsxs)("span",{children:["Success! View on ",(0,a.jsx)("a",{target:"_blank",title:"BOQ Miner",href:K,children:"solscan"}),"."]})),x(l.publicKey),console.log("MINT ADDRESS",l.publicKey)}catch(t){let e=function(e){let t;let n=/custom program error: (\w+)/.exec(e+"");if(null===n)return null;let[a]=n.slice(1);try{t=parseInt(a,16)}catch(e){return null}return(0,h.errorFromCode)(t)}(t);e?A(e.message):A("Mint failed.")}finally{S(!1)}},q=m&&v?Number(m.itemsMinted)+W:null;return console.log("ENABLED",v),(0,a.jsxs)("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[(0,a.jsx)(j(),{alt:"Collection",style:{maxWidth:"396px",borderRadius:"8px"},src:o.src}),(0,a.jsxs)("div",{style:{display:"flex",flexDirection:"column",minWidth:"320px"},children:[(0,a.jsx)("h1",{children:T}),(0,a.jsx)("p",{style:{color:"#807a82",marginTop:"8px",marginBottom:"32px"},children:D}),(0,a.jsxs)("div",{style:{display:"flex",flexDirection:"column",background:"#292929",padding:"24px",borderRadius:"8px"},children:[(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"4px"},children:[(0,a.jsx)("span",{children:"Price"}),(0,a.jsx)("b",{children:"5.95 SOL"})]}),(0,a.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"16px"},children:[(0,a.jsx)("span",{style:{fontSize:"12px"},children:"Sold"}),(0,a.jsxs)("span",{style:{fontSize:"12px"},children:[null!=q?q:"-"," / ",1e4]})]}),(0,a.jsx)(M.default,{onTimeout:()=>K(!0)}),(0,a.jsxs)("div",{className:"mint",children:[(0,a.jsx)("button",{disabled:!v||!t||P||null!=q&&1e4==q,onClick:H,children:"Mint"}),P&&(0,a.jsx)("span",{className:"indicator"})]}),(0,a.jsx)(r.a,{style:{width:"100%",height:"auto",marginTop:"8px",textAlign:"center",fontSize:"14px",backgroundColor:"#141414",borderRadius:"8px",justifyContent:"center"}}),g&&(0,a.jsx)("div",{className:"message",children:g})]})]})]})}},7420:function(){},46601:function(){}}]);