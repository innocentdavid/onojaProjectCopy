import Web3 from 'web3';
import franchise_abi from '../../app/blockchain/abi/MetaStocksFranchiseManager.json'
import companies_abi from '../../app/blockchain/abi/MetaStocksCompanyManager.json'
import franchise_address from '../../app/blockchain/franchiseManagerContract'
import companies_address from '../../app/blockchain/companyManagerContract'


let web3 = new Web3(Web3.givenProvider);

export const getContract = async _ => {
  const ABI = franchise_abi;
  const address = franchise_address;

  web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, address);
  return contract;
};


export const getCompanyContract = async _ => {
  const ABI = companies_abi;
  const address = companies_address;

  web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, address);
  return contract;
};

export const userFranchises = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.balanceOf(address).call())
}

export const totalFranchises = async (address) => {
  const contract = await getContract()
  return (await contract?.methods.balanceOf(address).call())
}

export const createFranchise = async (address, companyId, continent, type) => {
  const contract = await getContract()
  return (await contract?.methods.createMetaStocksFranchise(address, companyId, continent, type).send({from: address}))
}

export const getNumberOfFranchises = async (companyId) => {
  const contract = await getContract()
  return (await contract?.methods.getNumberOfMetaStocksFranchises(companyId).call())
}

export const getNumberFranchisesPerContinent = async () => {
  const contract = await getContract()
  return (await contract?.methods.numberOf().call())
}

export const claimFranchise = async (companyId, address) => {
  const contract = await getContract()
  return (await contract?.methods.claimFromAllFranchises(companyId).send({from: address}))
}

export const getUnclaimedRewards = async (companyId) => {
  const contract = await getContract()
  return (await contract?.methods.getMetaStocksFranchisesUnclaimedRewards(companyId).call())
}

export const hireWorker = async (companyId, type, address) => {
  const contract = await getContract()
  return (await contract?.methods.hireWorker(companyId, type).send({from: address}))
}

export const createFranchiseUsingBNB = async (address) => {
  const contract = await getCompanyContract();
  return (await contract?.methods.createFranchiseUsingBNB().send({from: address}));
}

export const sellShare = async (companyId, franchiseId, amount, address) => {
  const contract = await getContract()
  return (await contract?.methods.sellMetaStocksFranchiseShares(companyId, franchiseId, amount).send({from:address}))
}

export const burnShare = async (companyId, franchiseId, amount, address) => {
  const contract = await getContract()
  return (await contract?.methods.burnMetaStocksFranchiseShares(address,companyId,franchiseId,amount).send({from:address}))
}

export const getFranchiseValue = async (companyId, amount, address) => {
  const contract = await getContract()
  return (await contract?.methods.getFranchiseValue().call())
}

export const getFranchisesContinet = async _ => {
  const contract = await getContract()
  const continent = [];
  for (let i=0;i<7;i++) {
    const t = await contract?.methods.getFranchisesByContinent(i).call();
    continent.push(t)
  }
  return continent;
}