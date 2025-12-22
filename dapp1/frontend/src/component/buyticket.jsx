import { useState } from "react";
import { purchaseTicket, buyVipSeat } from "../scripts/interface/web3";
import { error } from "console";

export default function Buyticket(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    consst [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const Buyticket = async (vip=false) => {
        setSuccess("");
        setErrorMessage("");
        setLoading(true);

        try{vip ? await buyVipSeat(name, email, phone) : await purchaseTicket(name, email, phone);}{
            setSuccess(vip ? "VIP Ticket purchased successfully!" : "Normal Ticket purchased successfully!");
    }.catch (err){
        setErrorMessage(err.message);
    }finally{
        setLoading(false);
    }
    }
}