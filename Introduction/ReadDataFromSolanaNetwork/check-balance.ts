import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  console.log("Please provide a public key as an argument");
  process.exit(1);
}

const publicKey = new PublicKey(suppliedPublicKey);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${publicKey} is ${balanceInSol} Sol`);
