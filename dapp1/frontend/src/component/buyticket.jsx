import { useState } from "react";
import { purchaseTicket, buyVipSeat } from "../interface/web3";


export default function Buyticket(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const Buyticket = async (vip=false) => {
        setSuccess("");
        setErrorMessage("");
        setLoading(true);
        
        try{
            vip? await buyVipSeat(name, email, phone) : await purchaseTicket(name, email, phone);
            setSuccess(vip ? "VIP Ticket purchased successfully!" : "Normal Ticket purchased successfully!");
        } catch(err){
            setErrorMessage(err.message || "An error occurred during the purchase."); ;
        } finally{  
            setLoading(false);
        }
    };
    return(
        <div>
            <h3>BUY TICKET</h3>

            <input placeholder="name"  onChange={(e) => setName(e.target.value)} />
            <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="phone" onChange={(e) => setPhone(e.target.value)} />

            <button onClick={() => Buyticket(false)}>Buy Normal Ticket</button>
            <button onClick={() => Buyticket(true)}>Buy VIP Ticket</button>

            {loading && <p>Processing your purchase...</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    )
}