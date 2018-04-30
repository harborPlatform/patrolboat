window.pb.bdata = {
  list:[],
  add:function (_addr, _fnc, _ctrl, _type, _value) {
    var item = {};
    item.addr = _addr;
    item.fnc = _fnc;
    item.ctrl = _ctrl;
    item.type = _type;
    item.type = _type;
    console.log(item.addr, item.fnc);

    this.list.push(item);
  },
  removeAll:function () {
    this.list = new array();
  },
  reloadData:function (_addr, _fnc, _ctrl) {
    var abi = '';

     var contractObj = web3.eth.contract(abi).at(_addr);  
  },
  reloadAllData:function () {
    for (var i = 0; i < this.list.length; i++) {
      var item = this.list[i];
      window.web3.eth.con
    }

  }
};
