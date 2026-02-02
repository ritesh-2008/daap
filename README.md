# BookIt - Decentralized Event Ticketing Platform

A modern, blockchain-powered ticket booking system built with Solidity smart contracts and React frontend. BookIt enables secure, transparent event ticketing with normal and VIP ticket options.

## 🚀 Features

- **Secure Ticket Purchasing**: Buy normal and VIP tickets with cryptocurrency
- **Real-time Stats**: Track ticket sales and personal purchases
- **Refund System**: Easy ticket refund functionality
- **Admin Dashboard**: Event management tools for organizers
- **3D Interactive UI**: Immersive user experience with Spline 3D animations
- **MetaMask Integration**: Seamless Web3 wallet connectivity

## 🛠 Tech Stack

### Smart Contract
- **Solidity** - Smart contract development
- **OpenZeppelin** - Security standards and access control
- **Ethereum/Sepolia** - Blockchain network

### Frontend
- **React** - UI framework
- **Chakra UI** - Component library
- **Web3.js** - Blockchain interaction
- **Spline** - 3D animations and interactive elements

## 📁 Project Structure

```
solidity/
├── dapp1/
│   ├── frontend/ 
|   |   ├──public/
|   |   |    ├──golden-ticket.png
|   |   |    ├──gradient.png
│   │   ├── src/
│   │       ├── component/  # UI components
│   │       │   ├── navbar.jsx
│   │       │   ├── buyticket.jsx
│   │       │   ├── stats.jsx
│   │       │   ├── refund.jsx
│   │       │   ├── admin.jsx
│   │       │   └── footer.jsx
│   │       ├── interface/  # Web3 integration
│   │       │   └── web3.js
│   │       ├── App.jsx
|   |       ├── index.jsx
│   │            # Static assets
│   ├── contracts/ 
|   |         ├── event.sol         # Smart contracts
|   ├──scripts/
|         ├── deploy-counter.ts           
├── README.md
├── requirement.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MetaMask wallet extension
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solidity/dapp1/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install required packages**
   ```bash
   npm install @chakra-ui/react @emotion/react @emotion/styled
   npm install @splinetool/react-spline
   npm install web3
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Smart Contract Deployment

1. **Using Remix IDE** (Recommended for testing)
   - Visit [remix.ethereum.org](https://remix.ethereum.org)
   - Upload `first.sol`
   - Compile with Solidity 0.8.0+
   - Deploy to Sepolia testnet
   - Update contract address in `web3.js`

2. **Using Hardhat** (For local development)
   ```bash
   npm install --save-dev hardhat
   npx hardhat init
   # Follow setup instructions
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## 🎫 How It Works

### For Users
1. **Connect Wallet**: Link your MetaMask to the platform
2. **Buy Tickets**: Choose between normal (0.001 ETH) or VIP (0.004 ETH) tickets
3. **View Stats**: Track your purchases and total sales
4. **Request Refunds**: Easy refund process for purchased tickets

### For Admins
1. **Set Prices**: Configure ticket pricing
2. **Manage Events**: Set event dates and details  
3. **Withdraw Funds**: Access collected ticket revenue

## 🔧 Configuration

Update the contract address in `/src/interface/web3.js`:

```javascript
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

Ensure you're connected to the Sepolia testnet in MetaMask.

## 🌟 Key Features Detail

### Smart Contract Functions
- `payforticket()` - Purchase normal tickets
- `Buyvipseats()` - Purchase VIP tickets  
- `refund()` - Refund normal tickets
- `refundforvip()` - Refund VIP tickets
- `withdraw()` - Admin fund withdrawal (owner only)

### Frontend Components
- **Navbar**: Wallet connection and branding
- **BuyTicket**: Ticket purchase interface
- **Stats**: Sales analytics and user data
- **Refund**: Ticket refund functionality
- **Admin**: Event management (owner only)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

### Smart Contract (Mainnet)
1. Get mainnet ETH for gas fees
2. Deploy via Remix or Hardhat to Ethereum mainnet
3. Update frontend contract address
4. Verify contract on Etherscan

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Demo**: [Live Demo](https://lesbookit.netlify.app/)
- **Contract**: [View on Etherscan](https://sepolia.etherscan.io/address/0xe3c12d3896140023D370c7D60A3b0aB283b17151)
- **Documentation**: [Full Docs](docs-link)

## 👤 Author

*Ritesh**
- GitHub: [ritesh](https://github.com/ritesh-2008)
- Twitter: [RVanivdekar](https://twitter.com/RVanivdekar)

## 🙏 Acknowledgments

- OpenZeppelin for security standards
- Chakra UI for beautiful components
- Spline for 3D animations
- MetaMask for Web3 integration

---

**⚠️ Disclaimer**: This is a educational/demo project. Use at your own risk on mainnet.
