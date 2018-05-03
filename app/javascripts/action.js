
window.pb.act = {
  ds:{
    show:false,
    type:'',
    from:'0x77dbc562a055861af11e1c85d7723fe537a225c5',
    to:'0x77dbc562a055861af11e1c85d7723fe537a225c5',
    ether_value:10,
    gas_price:2100,
    gas_limit:20000,
    inputs:[],
    outputs:[],
    code:{},
    target:{},
    func:''
  },
  init:function () {
    new Vue({
      el: '#action_popup',
      data: window.pb.act.ds,
      computed: {
    
      },
      created: function () {
      }
    });
  },
  check_walletbase:function () {
    if(pb.wallet.base === '' || pb.wallet.base === 'undefined') {
      util.msg('base wallet is empty');
      return true;
    }

    return false;
  },
  send_open:function (_to) {
    if(this.check_walletbase()){
      return;
    }

    this.ds.from = pb.wallet.base;
    this.ds.to = _to;
    this.ds.type = 'send';
    this.ds.show = true;
  },
  transaction_open:function (_to, _func) {
    if(this.check_walletbase()){
      return;
    }

    var obj = pb.contract.getContractByAddr(_to);
    var abi = obj.info.abi;
    var inputs;
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === _func) {
        inputs = abi[i].inputs;
      }
    }

    this.ds.target = obj;
    this.ds.func = _func;
    this.ds.inputs = inputs;
    this.ds.from = pb.wallet.base;
    this.ds.to = _to;
    this.ds.type = 'transaction';
    this.ds.show = true;

  },
  send:function () {

    console.log(this.ds.from, this.ds.to);
    console.log({ from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') });
    //window.web3.eth.sendTransaction ({ from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') });
    // window.web3.eth.sendTransaction({from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether')});
    // console.log(this.ds);

    web3.eth.sendTransaction({ from:this.ds.from, to:this.ds.to, value: web3.toWei(this.ds.ether_value, 'ether'), gasLimit:this.ds.gas_limit, gasPrice:this.ds.gas_price },
     function (err, h) {
      if(!err){
        util.msg(h);
      } else {
        uint.alert(err);
      }});

    this.ds.show = false;


  },
  transaction:function (_to, _param) {
    // console.log(_to, _param)

    // var paramCnt = this.ds.inputs.length;
    // var p = this.ds.inputs;
    // console.log(p[0].pbvalue,p[1].pbvalue,{from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') })
    // if(paramCnt == 0){
    //   this.ds.target[this.ds.func].sendTransaction (p[0].pbvalue,{from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') });
    // } else if (parameter === 1) {
    //   this.ds.target[this.ds.func].sendTransaction (p[0].pbvalue,p[1].pbvalue,{from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') });
    // } else if (parameter === 2) {
    //   this.ds.target[this.ds.func].sendTransaction (p[0].pbvalue,p[1].pbvalue,p[2].pbvalue,{from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') });
    // } else if (parameter === 3) {
    //   this.ds.target[this.ds.func].sendTransaction (p[0].pbvalue,p[1].pbvalue,p[2].pbvalue,p[3].pbvalue,{from:this.from, to:this.to, value: window.web3.toWei(this.ether_value, 'ether') });
    // } else if (parameter === 4) {
    // } else if (parameter === 5) { 
    // } else if (parameter === 6) { 
    // } else {
    //   util.alert('It is possible to support less than 6 parameters.')
    // }
  }

};
setTimeout(function () { window.pb.act.init(); }, 0);
window.pb.action = {
  callAll:function () {
    var list = pb.contract.list;
    for (var i = 0; i < list.length; i++) {
      var _item = list[i];
      pb.action.callActionbyItem(_item);
    }
    console.log('callAll end');
  },
  callActionbyItem:function (_item) {
    for (var i = 0; i < _item.info.abi.length; i++) {
      var abi = _item.info.abi[i];
      if (abi.constant === true || abi.stateMutability === 'view') {
        if (abi.inputs.length === 0) {
          
          // _item.info[abi.name](function (err, result) {
          //   var id = 'def_' + _item.address + '_' + abi.name;
          //   console.log(id);
          //   var ctrl = document.getElementById(id);
          //   if (result === 'undefined') {
          //     util.alert(err);
          //   } else {
          //     ctrl.innerHTML = result;               
          //   }
          // });
          this.callActionbyItemabi(_item, abi);
        }
      }
    }
  },
  callActionbyItemabi:function (_item, abi) {
    _item.info[abi.name](function (err, result) {
            var id = 'def_' + _item.address + '_' + abi.name;
            // console.log(id);
            var ctrl = document.getElementById(id);
            if (result === 'undefined') {
              util.alert(err);
            } else {
              ctrl.innerHTML = result;               
            }
          });
  },
  callActionbyAddr:function (_addr, _func) {
    var _item = pb.contract.getContractByAddr(_addr);
    for (var i = 0; i < _item.info.abi.length; i++) {
      var abi = _item.info.abi[i];
      if (abi.name === _func) {
        if (abi.constant === true || abi.stateMutability === 'view') {
          if (abi.inputs.length === 0) {
            var id = '#def_' + _item.address + '_' + abi.name;
            var ctrl = document.getElementById(id);
            _item.info[abi.name](function (err, result) {
              if (result === 'undefined') {
                util.alert(err);
              } else {
                ctrl.innerHTML = result;
              }
            });
          }
        }
      }
    };
  },
  findabi:function (_abis,_func) {
    for (var i = 0; i < _abis.length; i++) {
      if (_abis[i].name === _func) {
         return _abis[i];
      }
    }
  },
  openTransaction:function (_addr, _func) {
    util.alert(_addr + _func);
    var item = pb.contract.getContractByAddr(_addr);
    var abis = item.info.abi;

    var abi = this.findabi(abis, _func);
    if (abi !== 'undefined') {
      // console.log(abi);
      if (abi.inputs.length === 0) {
        console.log('parameter is none');
      } else {
        for (var i = 0; i < abi.inputs.length; i++) {
          var argName = abi.inputs[i].name;
          var argType = abi.inputs[i].type;
          console.log(argType);
          if (argType.substring(0, 4) === 'bool') {

          }else if (argType.substring(0, 3) === 'int' || argType.substring(0, 4) === 'uint') {
            console.log('uint', argType, argName);
          } else if (argType.substring(0, 4) === 'address') {

          } else if (argType.substring(0, 4) === 'byte') {
            console.log('byte');
          } else {
            console.log('none');
          }
        }
      }
    }
  }

};
