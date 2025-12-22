import { network } from "hardhat";   

console.log("🔥 NEW DEPLOY SCRIPT RUNNING 🔥");


async function main() {
    const{ethers,networkName}= await network.connect();
    console.log("deploying contaract to ", networkName);

    const contaract = await ethers.getContractFactory("Event");
    const Contaract = await contaract.deploy()

    console.log("waiting for deployment.....")
    await Contaract.waitForDeployment();

    console.log("contract address :" ,await Contaract.getAddress() )

    console.log("deployment succesfull.....")
}

main().catch(console.error);