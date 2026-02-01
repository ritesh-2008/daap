import Web3 from "web3";
import eventJson from "./event.json";

const abi = eventJson.abi;
const CONTRACT_ADDRESS =
  "0xbE012904eE07ee7d7f48d57fc504E08A98E5Eafa";

export let web3;
export let EventContract;
export let userAccount;

//  Ensure app is initialized
export async function init() {
  if (EventContract) return EventContract;

  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  web3 = new Web3(window.ethereum);

  const [account] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  userAccount = account;

  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  const sepoliaChainId = "0xaa36a7";

  if (chainId !== sepoliaChainId) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: sepoliaChainId }],
    });
    return null; // 👈 IMPORTANT
  }

  EventContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  return EventContract;
}



// 🎟️ Purchase ticket
export async function purchaseTicket(name, email, phone) {
  const contract = await init();
  if (!contract) return null; // 👈 IMPORTANT

  return contract.methods
    .payforticket(name, email, phone)
    .send({
      from: userAccount,
      value: web3.utils.toWei("0.001", "ether"),
    });
}

// 💎 Buy VIP seat
export async function buyVipSeat(name, email, phone) {
  const contract = await init();
  if (!contract) return null; // 👈 IMPORTANT

  return contract.methods
    .Buyvipseats(name, email, phone)
    .send({
      from: userAccount,
      value: web3.utils.toWei("0.004", "ether"),
    });
}

// 🔁 Refund normal ticket
export async function refundTicket() {
 const contract = await init();

 if (!contract) return null; // 👈 IMPORTANT
  return contract.methods
    .refund()
    .send({ from: userAccount });
}

// 🔁 Refund VIP ticket (if same logic)
export async function refundVipTicket() {
  const contract = await init();

  if (!contract) return null; // 👈 IMPORTANT
  return contract.methods
    .refundforvip()
    .send({ from: userAccount });
}
// checkticket
export async function checkticket(){ 
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.checkticket().call({ from: userAccount });
}
// checkvipticket
export async function checkvipticket(){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.checkvipticket().call({ from: userAccount });
}
// soldticket
export async function soldticket(){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.soldticket().call()
}
// soldvipticket
export async function soldvipticket(){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.soldvipticket().call()
}
// dashboard
// setticketprize
export async function setticketprize(ticketprize,vipprize){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.setticketprize(ticketprize,vipprize).send({ from: userAccount });
}
// seteventdate
export async function seteventdate(eventdate){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.seteventdate(eventdate).send({ from: userAccount });
}

// withdrawamount
export async function withdrawamount(){
    const contract = await init();
    if (!contract) return null; // 👈 IMPORTANT
    return contract.methods.withdraw().send({ from: userAccount });
}
// dashboard ends here


// 🔄 Account change
window.ethereum?.on("accountsChanged", (accounts) => {
  userAccount = accounts[0];
  EventContract = null; // force re-init
});

// get currnet accounts
export async function getCurrentAccount() {
  const contract = await init();
  if (!contract) return null; // 👈 IMPORTANT
  return userAccount;
}

// get owneracc
export async function getOwnerAccount() {
  const contract = await init();
  if (!contract) return null; // 👈 IMPORTANT
  return contract.methods.owner().call();
}