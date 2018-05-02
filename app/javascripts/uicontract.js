
window.pb.uicontract = {
  init:function () {
    this.refreshContract();
  },
  clearContract:function () {
    var container = document.getElementById('contract-card-containner');
    if (container === 'undefined') {
      container.childNodes = [];// new Array();
    }
  },
  reloadContract:function () {
    this.clearContract();
    this.init();
  },sendcall:function (_obj, _func, _ctrl) {
    console.log(_obj);
    _obj[_func](function(err,result){
      util.alert(result);
      // _ctrl.innerHTML = result;
      var id = 'def_' + _obj.address + '_' + _func;
      document.getElementById(id).innerHTML = result;;

    });
  },
  refreshContract:function () {
    console.log('cnt:', window.pb.contract.list.length);
    
    new Vue({
      el: '#contract-containner',
      data: window.pb.contract,
      computed: {
    // 계산된 getter
        checkCallable: function (_constant, _stateMutability) {
          if (_constant === true || _stateMutability === 'view') {
            return true;
          } else {
            return false;
          }
        }
      },
      created: function () {
      }
    });

    new SimpleBar(document.getElementById('contract-containner'), {
      autoHide: true
    });


  },
  addContract:function (_contract) {
    var c = this.bindTable(_contract);
    // var e = document.createElement('span');
    // e.innerHTML = c;
    document.getElementById('contract-card-containner').insertAdjacentHTML('beforeend', c);
  },
  addAllContract:function () {
    console.log(window.pb.contract.list);
    var contracts = window.pb.contract.list;
    var c = '';
    for (var i = 0; i < contracts.length; i++) {
      c = c + this.bindTable(contracts[i]);
    }
    return c;
  },
  sendtransaction:function (_addr, _func) {
    util.msg( _addr + '//' + _func);
    var obj = pb.contract.getContractByAddr(_addr);
    var abi = obj.info.abi;
    var inputs;
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === _func) {
        inputs = abi[i].inputs;
      }
    }

    obj.info[_func](function(err,result){
      util.alert(result);
    });

    console.log(inputs);
  },
  getfieldType:function (abi) {
    if (abi.constant === true) {
      return 'constant';
    } else if (abi.stateMutability === 'view') {
      return 'view';
    } else {
      return 'none';
    }
  },
  bindRaw:function (abi, name, addr) {
    var rowItem = '';
    for (var i = 0; i < abi.length; i++) {
      // console.log(abi[i]);
      if (abi[i].constant !== undefined) {
        if (abi[i].constant) {
          util.msg('constant is true');
        }
      }

      rowItem = rowItem + '      <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10" data-abi="' +
       JSON.stringify(abi[i]) + '" onclick="pb.uicontract.sendtransaction( \'' + addr + '\'  ,\'' +  abi[i].name + '\' )">';
      rowItem = rowItem + '          <div class="pl3 flex-auto">';
      rowItem = rowItem + '            <span class="f3 db black-70">' + abi[i].name + '</span>';
      rowItem = rowItem + '            <span class="f6 db black-70">' + abi[i].constant + '</span>';
      rowItem = rowItem + '          </div>';
      rowItem = rowItem + '          <div>';
      rowItem = rowItem + '            <span class="f6 link blue">30</span>';
      rowItem = rowItem + '          </div>';
      rowItem = rowItem + '      </li>';
    // allItems = allItems.concat(rowItem);
    }
    return rowItem;
  },
  bindTable:function (_constact) {
    var c = '';
    var abi = _constact.info.abi;
    var name = _constact.name;
    var addr = _constact.address;

    var rowItems = this.bindRaw(abi, name, addr);
    c = c + ' <ul class="list fl w-20 pa3 ma3 bg-white shadow-1" >';
    c = c + '      <li class="flex items-center lh-copy tc bb b--black-10">';
    c = c + '          <div class="tc flex-auto">';
    c = c + '            <div><span class="f2 lh-title">' + name + '</span><i class="fas fa-sync-alt"></i></div>';
    c = c + '            <div>';
    c = c + '            <span class="f7 blue tl">' + addr + '</span>';
    c = c + '          </div>';
    c = c + '          </div>';
    c = c + '      </li>';
    c = c.concat(rowItems);
    c = c + '    </ul>';
    return c;
  }
};

setTimeout(function () { window.pb.uicontract.init(); }, 1000);
