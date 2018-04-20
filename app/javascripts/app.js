
// import $ from '../../bower_components/jquery/dist/jquery.min.js'
// window.$ = $
// import '../../bower_components/tachyons/css/tachyons.min.css'
// import '../../bower_components/animate.css/animate.min.css'
import '../stylesheets/app.css'
// import { default as tfc } from 'truffle-contract'

var Web3 = require('web3')

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
    window.pb.wallet.list = window.web3.eth.accounts
  }
}

// window.pb.contract = {
//   loadtfc:function (_json) {
//     var tfc_obj = tfc(_json)
//     tfc_obj.setProvider(window.web3.currentProvider)
//     tfc_obj.deployed().then(function (inst) {
//       var obj = tfc_obj.at(inst.address);
//     })
//   },
//   testCall:function (obj,fnc,context,txarg) {
//     obj[fun].apply(concext,txarg)

//   }
// }

window.pb.provider.default()
window.pb.wallet.loadDefault()

console.log(window.web3.eth)

/*
wallet structure
  <데이터 영역>
    지갑주소: 고유식별자
   금액: Eth 잔액
   EthRC20:배열 데이터
  <View영역>
   별칭:임이의 이름
   아바타: 별칭 이미지이며, 임이의 이미지
   아바타성별
   아바타 번호
*/