import {
  checkticket,
  checkvipticket,
  soldticket,
  soldvipticket
} from "../interface/web3";
import { useState, useEffect } from "react";

export default function Stats() {
  const [data, setData] = useState({});
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const snt = await soldticket();
      const svt = await soldvipticket();
      const cnt = await checkticket();
      const cvt = await checkvipticket();

      setData({
        soldNormalTickets: snt,
        soldVipTickets: svt,
        userNormalTicket: cnt,
        userVipTicket: cvt,
      });
    }

    fetchData();
  }, []);

  return (
    <div>
      <button
        onClick={() => setShowStats(!showStats)}
        className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        STATS
      </button>

      {showStats && (
        <div className="mt-4">
          <h3>EVENT STATS</h3>
          <p>Sold Normal Tickets: {data.soldNormalTickets}</p>
          <p>Sold VIP Tickets: {data.soldVipTickets}</p>
          <p>Your Normal Ticket: {data.userNormalTicket}</p>
          <p>Your VIP Ticket: {data.userVipTicket}</p>
        </div>
      )}
    </div>
  );
}
