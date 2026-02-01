# Project Requirements

## 📌 Project Name
Event Ticket Booking DApp

## 🧠 Project Description
A decentralized event ticket booking application built using React and Web3.js.
Users can buy normal or VIP tickets using MetaMask on the Ethereum Sepolia testnet.
The admin can manage ticket prices, event date, and withdraw funds.

---

## 🖥️ System Requirements

- Operating System: Linux / macOS / Windows
- Node.js: v18 or higher
- npm: v9 or higher
- Web Browser: Chrome / Brave / Firefox
- MetaMask Browser Extension (installed & configured)

---

## ⚙️ Tech Stack

### Frontend
- React.js
- Vite (build tool)
- Chakra UI (UI components)

### Blockchain
- Solidity Smart Contracts
- Ethereum Sepolia Test Network
- Web3.js (Ethereum interaction)

---

## 📦 Dependencies

- react
- react-dom
- web3
- @chakra-ui/react
- @emotion/react
- @emotion/styled
- framer-motion

---

## 🔐 Wallet & Network Requirements

- MetaMask wallet
- Connected to **Sepolia Testnet**
- Test ETH funded via Sepolia faucet

---

## 🔧 Smart Contract Requirements

- Deployed on Sepolia Testnet
- ABI file available (`event.json`)
- Contract functions:
  - Buy normal ticket
  - Buy VIP ticket
  - Refund ticket
  - Check ticket status
  - Admin controls (set price, withdraw, set event date)

---

## ▶️ How to Run the Project

```bash
npm install
npm run dev
