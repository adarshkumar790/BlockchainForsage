// Import the necessary components from ethers
import { ethers } from 'ethers';
import SmartMatrixForsageABI from '../SmartMatrixForsageABI.json';

// Replace with your contract address
const contractAddress = '0x16BF2e1174C09883921cB44D5a50Ca2b24E414C1';

// Ensure window.ethereum is typed correctly
declare global {
  interface Window {
    ethereum: any;
  }
}

// Check if MetaMask is installed
if (!window.ethereum) {
  throw new Error("MetaMask is not installed");
}

// Initialize provider and signer (using MetaMask here)
const provider = new ethers.BrowserProvider(window.ethereum);

// Define a function to get the signer
async function getSigner() {
  const signer = await provider.getSigner();
  return signer;
}

// Create a new contract instance
async function getContract() {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, SmartMatrixForsageABI, signer);
}

// Export functions for contract interactions
export async function register(referrerAddress: string) {
  const contract = await getContract();
  const tx = await contract.registrationExt(referrerAddress, {
    value: ethers.parseEther("0.05") // Registration cost
  });
  await tx.wait();
  console.log('User registered:', tx);
}

export async function buyLevel(matrix: number, level: number) {
  const contract = await getContract();
  const price = await contract.levelPrice(level);
  const tx = await contract.buyNewLevel(matrix, level, {
    value: price
  });
  await tx.wait();
  console.log('New level purchased:', tx);
}

export async function getUser(address: string) {
  const contract = await getContract();
  const user = await contract.users(address);
  console.log('User data:', user);
  return user;
}
