
const Web3 = require('web3')
const EthereumTx = require('ethereumjs-tx')

const owable = require('../../build/contracts/Ownable.json');

// alert(window.web3.networks)
// alert(JSON.stringify(owable.networks));

// console.log(JSON.stringify(owable.abi));

// console.log(window.web3.version)
// web3.version.getNetwork(function(err, netId){
  // alert(netId)
// });
// console.log(owable);
// console.log(window.web3)

window.pb = {}
window.pb.provider = {
  default:function () {
    this.changeProvider('local')
  },
  changeProvider:function (network, ips, port) {
    if (network === 'undefined' || network === '') { return }
    window.web3 = new Web3()
    if (network === 'mainnet') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    } else if (network === 'custom') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://' + ips + ':' + port));
    } else if (network === 'local') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }
  }
}//참고
//https://ethereum.stackexchange.com/questions/31928/call-a-contract-with-web3js-ethereumjs-tx?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

window.pb.wallet = {
  list:[],
  loadDefault:function () {
    window.pb.wallet.list = window.web3.eth.accounts;
  }
}

window.pb.contract = {
  list:[],
  loadJsonfile:function () {
    // var path = $('#file_json').val(); //$('#file_json');
    var filname = $("#file_json").val();
    // var fileContent = getTxt();
    // var jsonData = JSON.parse(fileContent);
    // console.log(jsonData);
    // alert(path)
     // $.get('./Ownable.json', function(data) {
     //   console.log( $.parseJSON( data ) );
     // }); 
    //var json = $.getJSON("Ownable.json");
    // $.getJSON("Ownable.json", function(json) {
    // console.log(json); // this will show the info it in firebug console
    // });
  }


}

// $('#file_json').change(function (e) {
//   alert('file changed');
//     alert(e);
// });

window.pb.provider.default();
window.pb.wallet.loadDefault();
