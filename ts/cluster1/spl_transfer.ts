import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../dev-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("BvXJyQbAPEuhKWnhFzF9a2uEitDS6ZpnUZPmAgp4D8GA");

// Recipient address
const to = new PublicKey("6Wq2dd9CjzATB1UfteGjJ6VKJukwMByiXfB3YdiiJ9Uo");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromAta = await getOrCreateAssociatedTokenAccount(connection, keypair,mint, keypair.publicKey)

        // Get the token account of the toWallet address, and if it does not exist, create it
        const toAta = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, to)

        console.log("fromAta", fromAta.address.toBase58())
        console.log("toAta", toAta.address.toBase58())

        // Transfer the new token to the "toTokenAccount" we just created
        const txid= await transfer(connection,keypair,fromAta.address,toAta.address,keypair, 1000000*10)

        console.log("txId", txid)


    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();