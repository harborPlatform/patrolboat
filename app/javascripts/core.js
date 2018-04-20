
const Web3 = require('web3')
const Tx = require('ethereumjs-tx');
const truffleContract = require("truffle-contract");


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
  networkId:'',
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

    window.web3.version.getNetwork(function(err, result) {
        window.pb.provider.networkId = result;
    });
  }
}//참고
//https://ethereum.stackexchange.com/questions/31928/call-a-contract-with-web3js-ethereumjs-tx?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa

window.pb.wallet = {
  list:[],
  loadDefault:function () {
    window.pb.wallet.list = window.web3.eth.accounts;

    console.log(window.pb.wallet.list);

  },
  getPrivateKey:function () {


  }
}
 

window.util = {
  copyToClipboard (text) {
    text = text.replace(/\s+/, "");
    text = text.replace(/\s+$/g, "");
    text = text.replace(/\n/g, "");
    text = text.replace(/\r/g, "");

    var textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      alert('Copying text command was ' + msg)
    } catch (err) {
      console.log('Oops, unable to copy')
    }
    document.body.removeChild(textArea)
  },
  duplicateCheck:function(arr,addr) {
    var counts = [];
    for(var i = 0; i <= arr.length; i++) {
        if(counts[a[i]] === undefined) {
            counts[a[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
  }
}

window.pb.contract = {
  list:[],
  loadJsonfile:function () {
    // var path = $('#file_json').val(); //$('#file_json');
    var filname = $("#file_json").val();
    console.log(filname);
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
  },
  loadTruffleJson:function(_json){
    var rappedContract = truffleContract(_json);
    rappedContract.setProvider(window.web3.currentProvider);
    var abi = JSON.parse(JSON.stringify(rappedContract)).abi
    
    var structureContract = window.web3.eth.contract(abi)

    rappedContract.deployed().then(function (obj,err) {
      runtimeContract = structureContract.at(obj.address)

      var item = {};
      item.address = obj.address;
      item.info = obj.runtimeContract;
      item.view = {};
      window.pb.contract.list.push(item);

      console.log(obj);
      // alert(window.pb.contract.list[0].address)

    })
  },send:function (to,from){

  },
  sendTransactionbyNumber:function(contractAddr,sender){
    var list = window.pb.contract.list;
    for (var i = 0; i < list.length; i++) {
         if(list[i].address === contractAddr){

         }
      }
  },
  sendTransaction:function (info,ethValue,gasPrice,gasLimit) {
    info.sendTransaction();
  }

}


// $('#file_json').change(function (e) {
//   alert('file changed');
//     alert(e);
// });


window.pb.provider.default();
window.pb.wallet.loadDefault();
window.pb.contract.loadTruffleJson(owable);


