window.pb.action = {
  callAll:function () {
    var list = pb.contract.list;
    for (var i = 0; i < list.length; i++) {
      var _item = list[i];
      pb.action.callActionbyItem(_item);
    }
  },
  callActionbyItem:function (_item) {
    for (var i = 0; i < _item.info.abi.length; i++) {
      var abi = _item.info.abi[i];
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
  }
};
