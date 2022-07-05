import Web3 from 'web3';
import market_abi from '../../app/blockchain/abi/MetaStocksFranchiseManager.json'
import market_address from '../../app/blockchain/franchiseManagerContract'


let web3 = new Web3(Web3.givenProvider);

export const getContract = async _ => {
   const ABI = market_abi;
   const address = market_address;

   web3 = new Web3(window.ethereum);
   const contract = new web3.eth.Contract(ABI, address);
   return contract;
};

export const getOrder = async (companyId, type, orderId) => {
   const contract = await getContract()
   return (await contract?.methods.getOrder(companyId, type, orderId).call())
}

export const createOrder = async (companyId, type, orderId, amount) => {
   const contract = await getContract()
   return (await contract?.methods.createOrder(companyId, type, orderId, amount).call())
}

export const updateOrder = async (companyId, type, orderId) => {
   const contract = await getContract()
   return (await contract?.methods.updateOrder(companyId, type, orderId).call())
}

export const closedOrder = async (companyId, type, orderId) => {
   const contract = await getContract()
   return (await contract?.methods.closedOrder(companyId, type, orderId).call())
}