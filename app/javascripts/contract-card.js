

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
  },
  refreshContract:function () {
    console.log('cnt:', window.pb.contract.list.length);
    var container = '  <div id ="contract-card-containner" class="list w-100 ba b--black-20  ">';
    container = container + this.addAllContract();
    container = container + '  </div>';
    container = container + '';
    var e = document.createElement('span');
    e.innerHTML = container;
    document.getElementById('contract-card').appendChild(e);
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
  bindRaw:function (abi, name, addr) {
    var rowItem = '';
    for (var i = 0; i < abi.length; i++) {
      // console.log(abi[i]);
      if (abi[i].constant !== undefined) {
        if (abi[i].constant) {
          util.msg('constant is true');
        }
      }

      rowItem = rowItem + '      <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10" data-item="' +
       JSON.stringify(abi[i]) + '" onclick="util.msg(\' ' + abi[i].name + '\',)">';
      rowItem = rowItem + '          <div class="pl3 flex-auto">';
      rowItem = rowItem + '            <span class="f3 db black-70">' + abi[i].name + '</span>';
      rowItem = rowItem + '            <span class="f6 db black-70">function</span>';
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

setTimeout(function () { window.pb.uicontract.init(); }, 2000);