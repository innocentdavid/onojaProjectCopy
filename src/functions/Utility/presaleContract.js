import Web3 from 'web3';
import presale_abi from '../../app/blockchain/abi/Presale.json'
import token_address from '../../app/blockchain/presaleAddress'


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
  const ABI = presale_abi;
  const address = token_address;

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

export const getAllowance = async (address, contractAddress = token_address) => {
  const contract = await getContract()
  return (await contract?.methods.allowance(address, contractAddress).call())
}

export const approve = async (address, contractAddress = token_address) => {
  const contract = await getContract()
  return (await contract?.methods.approve(contractAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({from: address}))
}

export const buyPresale = async (address, amount) => {
  const contract = await getContract()
  return (await contract?.methods.buyPresale(amount).send({from: address, value: amount}))
}