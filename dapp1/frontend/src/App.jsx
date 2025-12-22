import {soldvipticket,
    purchaseTicket,buyVipSeat,
    refundTicket,
    refundVipTicket,
    checkticket,
    checkvipticket,
    soldticket
} from "../scripts/interface/web3";

import { useState, useEffect } from "react";

export default function App() {
  const [normalSold, setNormalSold] = useState(0);
  const [vipSold, setVipSold] = useState(0);

  useEffect(() => {
    async function fetchSoldTickets() {
      const normal = await soldticket();
      const vip = await soldvipticket();
      setNormalSold(normal);
      setVipSold(vip);
    }
    fetchSoldTickets();
  }, []);

  return (
    <div>
      <h1>Event Ticketing DApp</h1>
      <p>Normal Tickets Sold: {normalSold}</p>
      <p>VIP Tickets Sold: {vipSold}</p>
      {/* Additional UI components for purchasing, refunding, and checking tickets can be added here */}
    </div>
  );
}   