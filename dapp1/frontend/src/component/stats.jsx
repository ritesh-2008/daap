// import function from web3.js
import {checkticket,
        checkvipticket,
        soldticket,
        soldvipticket} from "../interface/web3";
import { useState, useEffect } from "react";

export default function Stats(){
    const [data, setData] = useState({})

    useEffect(() => {
        async function fetchData() {
            const snt = await soldticket();
            const svt = await soldvipticket();
            const cnt = await checkticket();
            const cvt = await checkvipticket() ;

            setData({
                soldNormalTickets: snt,
                soldVipTickets: svt,
                checkticket: cnt,
                checkvipticket: cvt
            });
        }
        fetchData();
    }, []);
   
    return(
        <div>
            <h3>EVENT STATS</h3>
            <p>Sold Normal Tickets: {data.soldNormalTickets}</p>
            <p>Sold VIP Tickets: {data.soldVipTickets}</p>
            <p> yourNormal Ticket : {data.checkticket }</p>
            <p> yourVIP Ticket : {data.checkvipticket }</p>
        </div>
    )
}