import { Connection, PublicKey, clusterApiUrl,LAMPORTS_PER_SOL } from "@solana/web3.js";
 
const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN");
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;
 
console.log(`The balance of the account at ${address} is ${balanceInSol} Sol`);
console.log(`The balance of the account at ${address} is ${balance} Lamports`);
console.log(`✅ Finished!`);

     
    //  The above code snippet reads the balance of a Solana account. 
    //  The  getBalance  method returns the balance of the account in lamports. 
    //  The balance is then converted to Sol by dividing it by the constant  LAMPORTS_PER_SOL  which is equal to 1000000000. 
    //  The balance is then printed to the console. 
    //  The output will be something like this: 
    //  The balance of the account at CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN is 1000000000 lamports