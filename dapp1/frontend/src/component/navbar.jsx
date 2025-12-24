import { useState } from "react";
import init, { EventContract, userAccount } from "../interface/web3.js";



export default function Navbar(){
   const [errorMessage, setErrorMessage] = useState("");
   const [loading, setLoading] = useState(false);
 async function connectWallet(){
    setErrorMessage("");
    setLoading(true);
    try{
      await init();
      console.log("Connected account:", userAccount);
      console.log("Contract:", EventContract);

    }catch(err){
      setErrorMessage(err.message || "An error occurred while connecting the wallet.");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="w-full flex justify-between items-center px-8 py-4 bg-black/60 backdrop-blur border-b border-white/10">
      <h1 className="text-xl font-bold">bookit</h1>

      <div className="flex gap-3">
        <button onClick={() => connectWallet()} className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition">
          Connect Wallet
        </button>
        <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition">
          Sign in
        </button>
        {loading && <p>Connecting...</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}
