import { useState ,useEffect} from "react";
import Refund from "./component/refund.jsx";
import Stats from "./component/stats.jsx";
import Admin from "./component/admin.jsx";
import  Buyticket from "./component/buyticket.jsx";
import {getCurrentAccount,getOwnerAccount} from "./interface/web3.js"

export default function App(){
  const [isowner,setowner] = useState("");

  useEffect(() => {
    async function checkowner(){
      try{
        const owner = await getOwnerAccount();
        const useracc = getCurrentAccount()

        setowner(owner.toLowerCase() === useracc.toLowerCase())
      }catch(err){
        console.error(err)
      }
    }
    checkowner();
  },[]);

  return(
    <div className="home page">
      <h3 >BOOKIT</h3>
      <div className="home-content">
        <Buyticket />
        <Stats/>
        <Refund/>
      {isowner && <Admin/>}
      </div>
    </div>
  )
}