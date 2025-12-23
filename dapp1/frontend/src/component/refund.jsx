import { refundTicket,refundVipTicket } from "../interface/web3"; 
import { useState } from "react";

export default function Refund(){
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const refundNormal = async (vip=false) => {
        setSuccess("");
        setErrorMessage("");
        setLoading(true);
        
        try{
            vip?await refundVipTicket() : await refundTicket();
            setSuccess(vip ? "VIP Ticket refunded successfully!" : "Normal Ticket refunded successfully!");
        } catch(err){
            setErrorMessage(err.message || "An error occurred during the refund."); ;
        } finally{  
            setLoading(false);
        }
    };

    return(
        <div>
            <h3>REFUND TICKET</h3>

            <button onClick={() => refundNormal(false)}>Refund Normal Ticket</button>
            <button onClick={() => refundNormal(true)}>Refund VIP Ticket</button>

            {loading && <p>Processing your refund...</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    )
}