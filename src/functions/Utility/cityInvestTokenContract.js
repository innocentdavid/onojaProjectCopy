import Web3 from 'web3';
import cityInvest_abi from '../../app/blockchain/abi/MetaStocksToken.json'
import franchise_abi from '../../app/blockchain/abi/MetaStocksFranchiseManager.json'
import cityInvest_address from '../../app/blockchain/contractAddress'
import franchise_address from '../../app/blockchain/franchiseManagerContract'

let web3 = new Web3(Web3.givenProvider);

export const getCoinbase = async _ => {
  try{
    const accounts = await web3.eth.getAccounts();
    return accounts.length > 0 ? accounts[0] : '';
  }
  catch(e){
    return ''
  }
};

export const getContract = async _ => {
  const ABI = cityInvest_abi;
  const address = cityInvest_address;

  web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, address);
  return contract;
};

export const balanceOf = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.balanceOf(address).call())
}

export const balance = async (address) => {
    return await web3.eth.getBalance(address)
}

export const getAllowance = async (address, contractAddress = franchise_address) => {
  const contract = await getContract()
  return (await contract?.methods.allowance(address, contractAddress).call())
}

export const approve = async (address, contractAddress = franchise_address) => {
  const contract = await getContract()
  return (await contract?.methods.approve(contractAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({from: address}))
}

export const getTokenValue = async _ => {
  const contract = await getContract()
  return (await contract?.methods.getMidasMultinetworkRouterManager().getTokensValueInUSD(cityInvest_address, 1))
}

  // token.getMidasMultinetworkRouterManager().getTokensValueInUSD(tAddres, amount)
