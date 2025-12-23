// admin dashboard to manage event

import { useState } from "react";
import { setticketprize, seteventdate, withdrawamount } from "../interface/web3";

export default function Admin(){
    const [ticketPrize, setTicketPrize] = useState("");
    const [vipPrize, setVipPrize] = useState("");
    const [eventdate, setEventDate] = useState("");
    

    return(
        <div>
    <h3>Admin controls</h3>
    {/* set ticketprice */}
    <input placeholder="ticketprice" onChange={e => setTicketPrize(e.target.value)}/>

    <input placeholder="vipticketprice" onChange={e => setVipPrize(e.target.value)}/>

    <button onClick={() => setticketprize(ticketPrize,vipPrize)}>set prize</button>

     {/* set event price */}

     <input placeholder="set event price" onChange={e => setEventDate(e.target.value)} />
      <button onClick={() => seteventdate(eventdate)}>set</button>

     {/* withdrawamount */}

     <button onClick={() => withdrawamount()} >withdrawamount</button>
     
     
    </div>
    )
}