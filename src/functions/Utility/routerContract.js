import Web3 from 'web3';
import cityInvest_abi from '../../app/blockchain/abi/MetaStocksToken.json'
import router_abi from '../../app/blockchain/routerContractAbi.json'
import cityInvest_address from '../../app/blockchain/contractAddress'
import router_address from '../../app/blockchain/routerContractAddress'


let web3 = new Web3(Web3.givenProvider);

export const getContract = async _ => {
   const ABI = router_abi;
   const address = router_address;
 
   web3 = new Web3(window.ethereum);
   const contract = new web3.eth.Contract(ABI, address);
   return contract;
};

export const swapExactETHForTokens = async (address, value) => {
   const slippage = 0.1;
   const contract = await getContract()
   const amountOutMin = getAmountsOut(Web3.utils.toWei(
      '0.3',
      'ether'
   ))
   const amountOutMinLessSlippage = amountOutMin[1] - ((amountOutMin[1] * slippage) / 100)
   console.log(amountOutMinLessSlippage)
   return (await contract?.methods.swapExactAVAXForTokens(
      0, //amountOutMin
      ['0xd00ae08403B9bbb9124bB305C09058E32C39A48c', cityInvest_address], //path
      address,
      2648069985 // Saturday, 29 November 2053 22:59:45 
   ).send({
      from: address, value: Web3.utils.toWei(
         '0.3',
         'ether'
      )
   }))
}

export const getAmountsOut = async (value) => {
   const contract = await getContract()
   return (await contract?.methods.getAmountsOut(
      Web3.utils.fromWei(
         value.toString(),
         'ether'
      ),
      ['0xd00ae08403B9bbb9124bB305C09058E32C39A48c', '0xF319e2f610462F846d6e93F51CdC862EEFF2a554']
   ).call())
}