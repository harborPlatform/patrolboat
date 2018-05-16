
const Web3 = require('web3')
const Tx = require('ethereumjs-tx');
const truffleContract = require('truffle-contract');
const BN = require('bn.js');
const Toastify = require('toastify-js');

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

window.pb = {};
window.pb.provider = {
  networkId:'',
  default:function () {
    this.changeProvider('local');
  },
  changeProvider:function (network, ips, port) {
    if (network === 'undefined' || network === '') { return; }
    window.web3 = new Web3();
    if (network === 'mainnet') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    } else if (network === 'custom') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://' + ips + ':' + port));
    } else if (network === 'local') {
      window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    window.web3.version.getNetwork(function (result) {
      window.pb.provider.networkId = result;
    });
  }
};
// 참고
// https://ethereum.stackexchange.com/questions/31928/call-a-contract-with-web3js-ethereumjs-tx?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
window.pb.names = {
  boys:['Noah', 'Liam', 'William', 'Mason', 'James', 'Benjamin', 'Jacob', 'Michael', 'Elijah', 'Ethan',
    'Alexander', 'Oliver', 'Daniel', 'Lucas', 'Matthew', 'Aiden', 'Jackson', 'Logan', 'David', 'Joseph',
    'Samuel', 'Henry', 'Owen', 'Sebastian', 'Gabriel', 'Carter', 'Jayden', 'John', 'Luke', 'Anthony', 'Isaac',
    'Dylan', 'Wyatt', 'Andrew', 'Joshua', 'Christopher', 'Grayson', 'Jack', 'Julian', 'Ryan', 'Jaxon', 'Levi',
    'Nathan', 'Caleb', 'Hunter', 'Christian', 'Isaiah', 'Thomas', 'Aaron', 'Lincoln', 'Charles', 'Eli', 'Landon',
    'Connor', 'Josiah', 'Jonathan', 'Cameron', 'Jeremiah', 'Mateo', 'Adrian', 'Hudson', 'Robert', 'Nicholas', 'Brayden',
    'Nolan', 'Easton', 'Jordan', 'Colton', 'Evan', 'Angel', 'Asher', 'Dominic', 'Austin', 'Leo', 'Adam', 'Jace', 'Jose',
    'Ian', 'Cooper', 'Gavin', 'Carson', 'Jaxson', 'Theodore', 'Jason', 'Ezra', 'Chase', 'Parker', 'Xavier', 'Kevin',
    'Tyler', 'Ayden', 'Elias', 'Bryson', 'Leonardo', 'Greyson', 'Sawyer', 'Roman', 'Brandon', 'Bentley', 'Kayden',
    'Nathaniel', 'Vincent', 'Miles', 'Santiago', 'Harrison', 'Tristan', 'Declan', 'Cole', 'Maxwell', 'Luis', 'Justin',
    'Everett', 'Micah', 'Axel', 'Wesley', 'Max', 'Silas', 'Weston', 'Ezekiel', 'Juan', 'Damian', 'Camden', 'George',
    'Braxton', 'Blake', 'Jameson', 'Diego', 'Carlos', 'Ivan', 'Kingston'],
  
  girls:['Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Mia', 'Charlotte', 'Abigail', 'Emily', 'Harper',
    'Amelia', 'Evelyn', 'Elizabeth', 'Sofia', 'Madison', 'Avery', 'Ella', 'Scarlett', 'Grace', 'Chloe',
    'Victoria', 'Riley', 'Aria', 'Lily', 'Aubrey', 'Zoey', 'Penelope', 'Lillian', 'Addison', 'Layla',
    'Natalie', 'Camila', 'Hannah', 'Brooklyn', 'Zoe', 'Nora', 'Leah', 'Savannah', 'Audrey', 'Claire',
    'Eleanor', 'Skylar', 'Ellie', 'Samantha', 'Stella', 'Paisley', 'Violet', 'Mila', 'Allison', 'Alexa',
    'Anna', 'Hazel', 'Aaliyah', 'Ariana', 'Lucy', 'Caroline', 'Sarah', 'Genesis', 'Kennedy', 'Sadie',
    'Gabriella', 'Madelyn', 'Adeline', 'Maya', 'Autumn', 'Aurora', 'Piper', 'Hailey', 'Arianna', 'Kaylee',
    'Ruby', 'Serenity', 'Eva', 'Naomi', 'Nevaeh', 'Alice', 'Luna', 'Bella', 'Quinn', 'Lydia',
    'Peyton', 'Melanie', 'Kylie', 'Aubree', 'Mackenzie', 'Kinsley', 'Cora', 'Julia', 'Taylor', 'Katherine',
    'Madeline', 'Gianna', 'Eliana', 'Elena', 'Vivian', 'Willow', 'Reagan', 'Brianna', 'Clara', 'Faith', 'Ashley',
    'Emilia', 'Isabelle', 'Annabelle', 'Rylee', 'Valentina', 'Everly', 'Hadley', 'Sophie', 'Alexandra',
    'Natalia', 'Ivy', 'Maria', 'Josephine', 'Delilah', 'Bailey', 'Jade', 'Ximena', 'Alexis', 'Alyssa',
    'Brielle', 'Jasmine', 'Liliana', 'Adalynn', 'Khloe', 'Isla', 'Mary', 'Andrea', 'Kayla', 'Emery']
};
window.pb.wallet = {
  state:'default',
  base:'',
  argfilter:'',
  list:[],
  selected:function (_addr) {
    this.base = _addr;
    // util.msg('chagne base to:'+_addr);
    var item = this.getWalletByAddr(_addr);
    var img = document.getElementById('selected_base');
    var tooltip = document.getElementById('selected_base_tooltip');
    $('#selected_wallet').show();
    img.src = item.view.avatar;
    tooltip.innerHTML = _addr.substring(0, 8) + ' ...';
  },
  getWalletByAddr:function (_addr) {
    for (var i = 0; i < pb.wallet.list.length; i++) {
      var item = pb.wallet.list[i];
      if(item.info.address === _addr){
        return item;
      }
    }
  },
  pushWallet:function (_addr) {
    var item = {};
    item.info = {};
    item.view = {};
    item.info.address = _addr.toString();
    item.info.balance = this.refreshBalance(_addr);
    item.info.erc20 = [];
    item.view.num = this.list.length;
    var avatar = this.popAvata();
    item.view.avatar = avatar.path;
    item.view.gender = avatar.gender;
    item.view.num = avatar.num;
    item.view.name = avatar.name;
    this.list.push(item);
  },
  loadDefault:function () {
    var acs = window.web3.eth.accounts;
    for (var i = 0; i < acs.length; i++) {
      this.pushWallet(acs[i]);
    }
    var uiwallet = new Vue({
      el: '#sideWallets',
      data: window.pb.wallet,
      computed: {
        filteredWallets () {
          var uiwallet = this;
          var arg = uiwallet.argfilter;
          if (arg.replace(/\s/g, '') === '' || arg === 'undefined') {
            return pb.wallet.list;
          } else {
            return pb.wallet.list.filter(function (item) {
              return (item.view.name.toLowerCase().includes(arg.toLowerCase()) || item.info.address.toLowerCase().includes(arg.toLowerCase()));
            });
          }
        }
      },
      methods: {
        changeType (_type) {
          pb.wallet.state = _type;
          if (_type === 'default') {
              // $('#sideWallets').css('width', '450');
              document.getElementById('sideWallets').style.width = '450px';
              document.getElementById('main').style.marginLeft = '450px';
          } else {
              document.getElementById('sideWallets').style.width = '200px';
              document.getElementById('main').style.marginLeft = '200px';
          }
        }
      }
    });
    new SimpleBar(document.getElementById('sideWallets'), {
      autoHide: true
    });

  },
  reloadAllbal:function() {
    if(pb.wallet.list){

    }
    for (var i = 0; i < pb.wallet.list.length; i++) {
      var item = pb.wallet.list[i];
      item.info.balance = this.refreshBalance(item.info.address);
    }
  },
  getPrivateKey:function () {

  },
  refreshBalance:function (addr) {
    return window.web3.fromWei(window.web3.eth.getBalance(addr), 'ether');;
  },
  refreshAllBalance:function () {

  },
  popAvata:function () {
    var gender = window.util.getRandomInt(0, 1);
    var avatar = {};
    var num = 0;
    if (gender) {
      num = window.util.getRandomInt(1, 129);
      avatar.gender = gender;
      avatar.num = num;
      avatar.name = window.pb.names.boys[num];
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/' +
       num + '.png';
    } else {
      num = window.util.getRandomInt(1, 114);
      avatar.gender = gender;
      avatar.num = num;
      avatar.name = window.pb.names.girls[num];
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/' +
       num + '.png';
    }
    return avatar;
  }
};

window.action = {
  target:{
    from:'',
    to:'',
    control:{}
  },
  allocateSend:function (ctrl, addr) {
    this.uneableAll();
    this.resetBtn();
    window.util.msg('send from:' + addr);
    $(ctrl).css('background-color', 'red');
    this.target.from = addr;
    this.target.control = ctrl;
  },
  touch:function (addr) {
    // window.util.msg(addr);
    if (this.target.from !== '' && this.target.from !== 'undefined') {
      window.util.alert(this.target.from);
      this.target.to = addr;
      $('#modal_popup').show();
      $('#modal_popup_box').show();
      
    }else{
      this.resetBtn();
    }
  },
  resetBtn:function () {
    console.log('reset!!')
    this.target.from = '';
    this.target.to = '';
    this.target.control = {};
    $(this.target.control).css('background-color', 'LightGray');
  },
  uneableAll:function () {
    // $('[id]').each(function () {
    //   if ($(this).attr('id') == 'sendAction') {
    //     $(this).removeClass('red');
    //     //window.util.alert('zzz');
    //   }
    // });
    //$('#sendAction').removeClass('red');
  },
  sendtransaction:function () {
    var _from = this.target.from;
    var _to = this.target.to;
    var _value = $('#send_ether').val();
    // var _gasprice = $('#send_gasprice').val();
    // var _gaslimit = $('#send_gaslimit').val();
    console.log(_from, _to, _value);
    // alert(window.web3.toWei(_value, 'ether'));
    window.web3.eth.sendTransaction ({ from:_from, to:_to, value: window.web3.toWei(_value, 'ether') });


  }
};
window.util = {

  alert:function (msg) {
    Toastify({
      text: msg,
      duration: 3000,
      // destination: '',
      newWindow: true,
      close: false,
      gravity: 'bottom', // `top` or `bottom`
      positionLeft: false, // `true` or `false`
      backgroundColor: 'linear-gradient(to right, #642b73, #c6426e)'
    }).showToast();
  },
  msg:function (msg) {
    Toastify({
      text: msg,
      duration: 3000,
      // destination: '',
      newWindow: true,
      close: false,
      gravity: 'bottom', // `top` or `bottom`
      positionLeft: false, // `true` or `false`
      backgroundColor:'linear-gradient(to right, #00b09b, #96c93d)'
    }).showToast();
  },
  getRandomInt:function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  copyToClipboard (text) {
    text = text.replace(/\s+/, '');
    text = text.replace(/\s+$/g, '');
    text = text.replace(/\n/g, '');
    text = text.replace(/\r/g, '');

    var textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      window.util.msg('Copied ' + text);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
  },
  duplicateCheck:function (arr, addr) {
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
  toastMsg:function () {

  }
};

window.pb.contract = {
  list:[],
  loadJsonfile:function (event) {
    var input = event.target;
    var reader = new FileReader ();
    reader.onload = function () {
      var text = reader.result;
      var json = JSON.parse(text);
      console.log(json);
      window.pb.contract.loadTruffleJson(json);
    };
    reader.readAsText(input.files[0]);
    // window.contract.reloadContract();
  },
  loadTruffleJson:function (_json) {
    var rappedContract = truffleContract(_json);
    rappedContract.setProvider(window.web3.currentProvider);
    var abi = JSON.parse(JSON.stringify(rappedContract)).abi;
    var structureContract = window.web3.eth.contract(abi);
    var isDeployed = rappedContract.deployed();
    rappedContract.deployed().then(function (obj, err) {
      if (err) {
          util.alert('contract is not deployed');
      } else {
        var runtimeContract = structureContract.at(obj.address);
        var item = {};
        item.name = rappedContract.contractName;
        item.balance = pb.wallet.refreshBalance(obj.address);
        item.address = obj.address;
        item.info = runtimeContract;
        item.view = {};
        console.log('push item');
        window.pb.contract.list.push(item);
      }
      
      // window.pb.uicontract.addContract(item);
      
      setTimeout(function () {pb.action.callAll();}, 1000);
    });
  },
  getContractByAddr:function (_addr) {
    var list = window.pb.contract.list;
    for (var i = 0; i < list.length; i++) {
      if (list[i].address === _addr) {
        return list[i];
       }
    }
  },
  getFunctionByName:function (_name) {

  },
  reloadAllbal:function (){
      for (var i = 0; i < pb.contract.length; i++) {
      var item = pb.contract.list[i];
      item.info.balance = pb.wallet.refreshBalance(item.address);
    }
     
  },
  send:function (to, from) {

  },
  sendTransactionbyNumber:function (contractAddr ,sender) {
    var list = window.pb.contract.list;
    for (var i = 0; i < list.length; i++) {
       if(list[i].address === contractAddr) {

       }
    }
  },
  sendTransaction:function (info, ethValue, gasPrice, gasLimit) {
    info.sendTransaction();
    web3.eth.sendTransaction({ from:CurrentAddress, to:toAddr, value: web3.toWei(ethValue, 'ether'), gasLimit:gasLimit, gasPrice:gasPrice },
     function (err, h) {

     });
  },
  sendRawTransaction:function (toAddr,ethValue, fromPriv) {
    var privateKey = new Buffer(fromPriv, 'hex');
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
  }, 
  getNonce:function (addr){
    var number = web3.eth.getTransactionCount(address);
    return number
  },
  getGasprice:function () {
    return new BN('20000000000');
  },
  getGaslimit:function () {
    return new BN('43092000');
  }
};

window.log = {
  appendTransactionRaceptView:function () {

  },
  appendTransactionRacept:function (cmd, hash) {
    var filter = window.web3.eth.filter('latest');
    filter.watch(function (watchErr, log) {
      if (!watchErr) {
        web3.eth.getTransactionReceipt(hash, function (receiptErr, receipt) {
          if (!receiptErr && receipt != null) {
          filter.stopWatching(function (stopErr, result) {
              if (!stopErr) {
                console.log('loadingResult', cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status);
                //update(n, cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status)
                if (receipt.status != '0x0') {
                  Util.msg( cmd +' hash'+ hash + ' transaction is success');
                } else {
                  Util.alert( cmd +' hash'+ hash + ' transaction is false');
                }
                // after done
              };
            });
          } else {
            Util.alert('receiptErr:' + receiptErr);
            // alert(false, cmd, hash, receiptErr)
          }
        });
      } else {
        util.alert('error :' + cmd + ' hash:' + hash + ' msg:' + watchErr);
      }
      if (filter === 'undefined' || filter == null) {  
      }
    });
  }
};

// $('#file_json').change(function (e) {
//   alert('file changed');
//     alert(e);
// });

window.pb.provider.default();
window.pb.wallet.loadDefault();
// window.pb.contract.loadTruffleJson(owable);

// console.log(window.pb.contract.list);
// console.log(window.pb.contract.list.length);

// console.log(window.pb.wallet.list);
// console.log(window.pb.contract.list.length);
