Heyy.. I am going to dive in the world of Solana..


<-------Notes----->
SOL is Solana's 'native token' - this means SOL is used to pay transaction fees, rent for accounts, and other common. SOL is sometimes shown with the ◎ symbol. Each SOL is made from 1 billion Lamports.
Addresses are often shown as base-58 encoded strings like dDCQNnDmNbFVi8cQhKAgXhyhXeJ625tvwsunRyRc7c8
Every interaction with the Solana network using @solana/web3.js is going to happen through a Connection object. The Connection object establishes a connection with a specific Solana network, called a 'cluster'. For now, we'll use the Devnet cluster rather than Mainnet. Devnet is designed for developer use and testing, and DevNet tokens don't have real value.
1 Sol = 1000000000 lamports  (1 billion lamports)
balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;
Transactions are atomic, meaning they either succeed - if all the instructions have been executed properly - or fail as if the transaction hasn't been run at all.
As you might expect, @solana/web3.js provides helper functions for creating transactions and instructions. You can create a new transaction with the constructor, new Transaction(). Once created, you can add instructions to the transaction using the add() method.

One of those helper functions is SystemProgram.transfer(), which makes an instruction for the SystemProgram to transfer some SOL:


Given the current price of 1 SOL = $135, and the amount transferred was 0.000005 SOL (which is 5000 lamports), you can calculate the USD equivalent as follows:

USD value
=
0.000005
×
135
=
0.000675
 
USD
USD value=0.000005×135=0.000675USD
So, the transfer of 5000 lamports (0.000005 SOL) is approximately $0.000675 USD or 0.0675 cents.

