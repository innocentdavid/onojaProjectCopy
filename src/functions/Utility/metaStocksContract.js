import Web3 from 'web3';
import cityInvest_abi from '../../app/blockchain/abi/MetaStocksToken.json'
import companies_abi from '../../app/blockchain/abi/MetaStocksCompanyManager.json'
import cityInvest_address from '../../app/blockchain/contractAddress'
import companies_address from '../../app/blockchain/companyManagerContract'


let web3 = new Web3(Web3.givenProvider);

export const getCoinbase = async _ => {
  const accounts = await web3.eth.getAccounts();
  return accounts.length > 0 ? accounts[0] : '';
};

export const getContract = async _ => {
  const ABI = companies_abi;
  const address = companies_address;

  web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, address);
  return contract;
};

export const isCeo = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.isCeo(address).call())
}

export const totalCompanies = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.balanceOf(address).call())
}

export const getMetaStocksFranchisesUnclaimedRewards = async () => {
  const contract = await getContract()
  return (await contract?.methods.getMetaStocksFranchisesUnclaimedRewards().call())
}

export const totalGenerated = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.totalGenerated(address).call())
}

export const createCompany = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.createCompany().send({from: address}))
}

export const getCompanyId = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.getCompanyId(address).call())
}

export const getCompanyCEOAddress = async (companyId) => {
  const contract = await getContract()
  return (await contract?.methods.getCompanyCEOAddress(companyId).call())
}