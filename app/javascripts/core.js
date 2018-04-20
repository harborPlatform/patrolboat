
const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

window.pb = {}
window.pb.provider = {
  default:function () {
    this.changeProvider('mainnet')
  },
  changeProvider:function (network, ips, port) {
    if (network === 'undefined' || network === '') { return }
    window.web3 = new Web3()
    if (network === 'mainnet') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    } else if (network === 'custom') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://' + ips + ':' + port));
    } else if (network === 'ropsten') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  }

}//참고
//https://ethereum.stackexchange.com/questions/31928/call-a-contract-with-web3js-ethereumjs-tx?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

window.pb.wallet = {
  loadDefault:function () {
    window.pb.wallet.list = window.web3.eth.accounts;
  }

}



window.pb.provider.default();
window.pb.wallet.loadDefault();
