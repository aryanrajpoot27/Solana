import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

async function main() {
  const suppliedPublicKey = process.argv[2];
  if (!suppliedPublicKey) {
    console.log("Please provide a public key as an argument");
    process.exit(1);
  }

  // Check if the provided public key is valid
  try {
    const publicKey = new PublicKey(suppliedPublicKey);

    // Validate the public key
    if (!publicKey || !publicKey.toBase58()) {
      console.log("Invalid public key format");
      process.exit(1);
    }

    // Connect to Solana Mainnet
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    console.log("Connecting to Mainnet...");

    try {
      const balanceInLamports = await connection.getBalance(publicKey);
      const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

      console.log(`The balance of the account at ${publicKey.toBase58()} is ${balanceInSol} SOL`);
    } catch (error) {
      console.error("Error fetching balance:", error.message);
    }
  } catch (error) {
    console.log("Invalid public key:", error.message);
    process.exit(1);
  }
}

// Call the main function
main().catch(err => {
  console.error("Error:", err);
});
