
const Web3 = require('web3')
const Tx = require('ethereumjs-tx');
const truffleContract = require("truffle-contract");
const BN = require('bn.js');


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

avatar
//https://github.com/Ashwinvalento/cartoon-avatar
 * MALE : 1 - 129 * FEMALE : 1 - 114
example
https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

ico 
https://fontawesome.com/
*/

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
  pushWallet:function(addr){
    var item = {};
    item.info = {};
    item.view = {};


    item.info.address = addr.toString();
    item.info.balance = this.refreshBalance(addr);
    item.info.erc20 = [];
    item.view.name = window.pb.wallet.list.length;
    var avatar = this.popAvata();
    item.view.avatar = avatar.path;
    item.view.gender = avatar.gender;
    item.view.num = avatar.num;
    window.pb.wallet.list.push(item);


  },
  loadDefault:function () {

    var acs = window.web3.eth.accounts;
    for (var i = 0; i < acs.length; i++) {
        this.pushWallet(acs[i]);
    }
    // window.pb.wallet.list = window.web3.eth.accounts;
    // console.log(window.pb.wallet.list)
  },
  getPrivateKey:function () {

  },
  refreshBalance:function (addr) {
    return window.web3.fromWei(window.web3.eth.getBalance(addr),'ether');
  },
  refreshAllBalance:function(){

  },popAvata:function(){
    var gender = window.util.getRandomInt(0,1);
    var avatar = {};
    if(gender){
      var num = window.util.getRandomInt(0,129);
      avatar.gender = gender;
      avatar.num = num;
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/'+num+'.png';

    }else{
      var num = window.util.getRandomInt(0,114);
      avatar.gender = gender;
      avatar.num = num;
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/'+num+'.png';
    }

    return avatar;
  },
  getPrivateKey:function () {

  }
}
 

window.util = {

  alert:function(msg){
    var notyf = new Notyf();
    notyf.alert(msg);
  },
  msg:function(){
    var notyf = new Notyf();
    notyf.confirm(msg);
  },
  getRandomInt:function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
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
  },
  toastMsg:function(){

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
      var runtimeContract = structureContract.at(obj.address)

      var item = {};
      item.address = obj.address;
      item.info = runtimeContract;
      item.view = {};
      window.pb.contract.list.push(item);

      // console.log(obj);
      // alert(window.pb.contract.list[0].address)

    })
  },send:function(to,from){

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
    web3.eth.sendTransaction({ from:CurrentAddress, to:toAddr, value: web3.toWei(ethValue, 'ether'), gasLimit:gasLimit, gasPrice:gasPrice },
     function (err, h) {

     });
  },
  sendRawTransaction:function (toAddr,ethValue, fromPriv){
    var privateKey = new Buffer(fromPriv, 'hex')
    var rawTx = {
      nonce: this.getNonce(),
      gasPrice: this.getGasprice(), 
      gasLimit: this.getGaslimit(),
      to: toAddr, 
      value: ethValue, 
      data: '0x'
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
      console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
    });
  }
  ,getNonce:function (addr){
    var number = web3.eth.getTransactionCount(address);
    return number
  },
  getGasprice:function () {
    return new BN('20000000000')
  },
  getGaslimit:function () {
    return new BN('43092000')
  }
}

window.log = {
  appendTransactionRaceptView:function(){

  },
  appendTransactionRacept:function(cmd, hash) {

    var filter = web3.eth.filter('latest')
    filter.watch(function (watchErr, log) {
      if (!watchErr) {
        web3.eth.getTransactionReceipt(hash, function (receiptErr, receipt) {
          if (!receiptErr && receipt != null) {
              
              filter.stopWatching(function (stopErr, result) {
                if (!stopErr) { 
                  console.log('loadingResult', n, cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status)
                  
                  //update(n, cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status)

                  if (receipt.status != '0x0') {
                    Util.msg( cmd +' hash'+ hash + ' transaction is success')
                  } else {
                    Util.alert( cmd +' hash'+ hash + ' transaction is false')
                  }
                  // after done
                  
                  
                }
              })
            
          } else {
            Util.alert('receiptErr:' + receiptErr)
            //alert(false, cmd, hash, receiptErr)
          }
        })
      } else {
        Util.alert('error :'+ cmd +' hash:'+ hash +' msg:'+ watchErr)
      }
      if (filter == 'undefined' || filter == null) {
        
      }
    })
  }
}




// $('#file_json').change(function (e) {
//   alert('file changed');
//     alert(e);
// });


window.pb.provider.default();
window.pb.wallet.loadDefault();
window.pb.contract.loadTruffleJson(owable);

// console.log(window.pb.contract.list);
// console.log(window.pb.contract.list.length);

// console.log(window.pb.wallet.list);
// console.log(window.pb.contract.list.length);


