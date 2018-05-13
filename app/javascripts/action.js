
window.pb.act = {
  ds:{
    show:false,
    type:'',
    from:'',
    to:'',
    ether_value:1,
    gas_price:21000,
    gas_limit:40000,
    inputs:[],
    outputs:[],
    code:{},
    target:{}
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
    this.ds.ether_value = 1;
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

    this.ds.ether_value = 0;
    this.ds.target = obj;
    this.ds.func = _func;
    this.ds.inputs = inputs;
    this.ds.from = pb.wallet.base;
    this.ds.to = _to;
    this.ds.type = 'transaction';
    this.ds.show = true;
  },
  send:function () {
    // console.log({ from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') });
    window.web3.eth.sendTransaction ({ from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
     ,function (err, result) {
        if (result) {
          console.log(result); 
          window.pb.act.ds.show = false;
          reloadAll();
        } else {
          console.log(err);
        }
      });
  },
  sendTransaction:function () {

     //console.log(this.ds.inputs);
    // for (var i = 0; i < this.ds.inputs.length; i++) {
    //   var item = this.ds.inputs[i];
    // }
    console.log('sendTransaction !!!!');


    var cnt = this.ds.inputs.length;
    if (cnt === 0) {
      window.web3.eth.sendTransaction ({ from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') });
    } else if (cnt === 1) {
      var param1 = this.ds.inputs[0].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
    } else if (cnt === 2) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });

    } else if (cnt === 3) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      var param3 = this.ds.inputs[2].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, param3, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
      
    } else if (cnt === 4) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      var param3 = this.ds.inputs[2].value;
      var param4 = this.ds.inputs[3].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, param3, param4, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
      
    } else if (cnt === 5) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      var param3 = this.ds.inputs[2].value;
      var param4 = this.ds.inputs[3].value;
      var param5 = this.ds.inputs[4].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, param3, param4, param5, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
      
    } else if (cnt === 6) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      var param3 = this.ds.inputs[2].value;
      var param4 = this.ds.inputs[3].value;
      var param5 = this.ds.inputs[4].value;
      var param6 = this.ds.inputs[5].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, param3, param4, param5, param6, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
    } else if (cnt === 7) {
      var param1 = this.ds.inputs[0].value;
      var param2 = this.ds.inputs[1].value;
      var param3 = this.ds.inputs[2].value;
      var param4 = this.ds.inputs[3].value;
      var param5 = this.ds.inputs[4].value;
      var param6 = this.ds.inputs[5].value;
      var param7 = this.ds.inputs[5].value;
      this.ds.target.info[this.ds.func].sendTransaction (param1, param2, param3, param4, param5, param6, param7, { from:this.ds.from, to:this.ds.to, value: window.web3.toWei(this.ds.ether_value, 'ether') }
        , function (err, hash) {
          if (hash) {
            window.pb.act.txSuccess(hash, this.ds);
            window.pb.act.ds.show = false;
          } else {
            window.pb.act.txFail(err, this.ds);
            window.pb.act.ds.show = false;
          }
        });
    } else {
      
    }

  },
  txSuccess:function (hash, data) {
    console.log(hash);
    this.reloadAll();
  },
  txFail:function (err, data) {},
  estimateContractgas:function () {
    var param1 = this.ds.inputs[0].value;
    var contractData = this.ds.target.info[this.ds.func].new.getData(someparam, another, {data: contractCode});
    var estimate = web3.eth.estimateGas({data: contractData});
    return estimate;
  },
  reloadAll:function () {
    pb.wallet.reloadAllbal();
    pb.contract.reloadAllbal();
    pb.action.callAll();
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
          } else if (argType.substring(0, 7) === 'address') {

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
