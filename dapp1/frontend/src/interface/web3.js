import Web3 from "web3";
import ContractABI from "./event.json";

const CONTRACT_ADDRESS =
  "0xbE012904eE07ee7d7f48d57fc504E08A98E5Eafa";

let web3;
let EventContract;
let userAccount;

//  Ensure app is initialized
export async function init() {
  if (EventContract) return;

  if (!window.ethereum) {
    throw new Error("MetaMask not detected");
  }

  web3 = new Web3(window.ethereum);

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  userAccount = accounts[0];

  // network check (Sepolia = 11155111)
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  if (chainId !== "0xaa36a7") {
    throw new Error("Please switch to Sepolia network");
  }

  EventContract = new web3.eth.Contract(
    ContractABI,
    CONTRACT_ADDRESS
  );
}

// 🎟️ Purchase ticket
export async function purchaseTicket(name, email, phone) {
  await init();

  return EventContract.methods
    .payforticket(name, email, phone)
    .send({
      from: userAccount,
      value: web3.utils.toWei("0.001", "ether"),
    });
}

// 💎 Buy VIP seat
export async function buyVipSeat(name, email, phone) {
  await init();

  return EventContract.methods
    .Buyvipseats(name, email, phone)
    .send({
      from: userAccount,
      value: web3.utils.toWei("0.004", "ether"),
    });
}

// 🔁 Refund normal ticket
export async function refundTicket() {
  await init();

  return EventContract.methods
    .refund()
    .send({ from: userAccount });
}

// 🔁 Refund VIP ticket (if same logic)
export async function refundVipTicket() {
  await init();

  return EventContract.methods
    .refund()
    .send({ from: userAccount });
}
// checkticket
export async function checkticket(){ 
    await init();
    return EventContract.methods.checkticket().call({ from: userAccount });
}
// checkvipticket
export async function checkvipticket(){
    await init();
    return EventContract.methods.checkvipticket().call({ from: userAccount });
}
// soldticket
export async function soldticket(){
    await init();
    return EventContract.methods.soldticket().call()
}
// soldvipticket
export async function soldvipticket(){
    await init();
    return EventContract.methods.soldvipticket().call()
}
// dashboard
// setticketprize
export async function setticketprize(ticketprize,vipprize){
    await init();
    return EventContract.methods.setticketprize(ticketprize,vipprize).send({ from: userAccount });
}
// seteventdate
export async function seteventdate(eventdate){
    await init();
    return EventContract.methods.seteventdate(eventdate).send({ from: userAccount });
}

// withdrawamount
export async function withdrawamount(){
    await init();
    return EventContract.methods.withdraw().send({ from: userAccount });
}
// dashboard ends here


// 🔄 Account change
window.ethereum?.on("accountsChanged", (accounts) => {
  userAccount = accounts[0];
  EventContract = null; // force re-init
});

// get currnet accounts
export async function getCurrentAccount() {
  await init();
  return userAccount;
}

// get owneracc
export async function getOwnerAccount() {
  await init();
  return EventContract.methods.owner().call();
}