const {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
require("dotenv/config");
const { getKeypairFromEnvironment } = require("@solana-developers/helpers");

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
  console.log(`Please provide a public key to send to`);
  process.exit(1);
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`);

async function sendTransaction() {
  const senderBalance = await connection.getBalance(senderKeypair.publicKey);
  const rentExemptBalance = await connection.getMinimumBalanceForRentExemption(0);

  const LAMPORTS_TO_SEND = 5000;

  console.log(`Sender balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`);
  console.log(`Rent-exempt minimum: ${rentExemptBalance / LAMPORTS_PER_SOL} SOL`);

  // Check if recipient account exists
  let recipientInfo;
  try {
    recipientInfo = await connection.getAccountInfo(toPubkey);
  } catch (err) {
    console.error("Error fetching recipient account info:", err);
    return;
  }

  // If recipient account doesn't exist or balance is low, add more lamports for rent
  if (!recipientInfo || recipientInfo.lamports < rentExemptBalance) {
    console.log("Recipient account does not exist or has insufficient funds for rent.");
    console.log(`Sending enough SOL to cover rent-exemption.`);
  }

  const transaction = new Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);

    console.log(
      `💸 Finished! Sent ${LAMPORTS_TO_SEND} lamports to the address ${toPubkey.toBase58()}.`
    );
    console.log(`Transaction signature is ${signature}!`);
  } catch (err) {
    console.error("Error sending transaction:", err);
  }
}

sendTransaction();


//   public key 4EWeRCdWrsYSxypD3GpgQFW4f2Vt1DApDT71UoEbtG8k