
window.contract = {
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
    if (window.pb.contract.list.length === 0) {
      return;
    }
    var container = '  <div id ="contract-card-containner" class=" w-30 ba b--black-20 bg-white shadow-1 ma3">';
    container = container + this.bindTable();
    container = container + '  </div>';
    container = container + '';
    var e = document.createElement('span');
    e.innerHTML = container;
    document.getElementById('contract-card').appendChild(e);
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
  bindTable:function () {
    console.log(window.pb.contract.list);
    var contracts = window.pb.contract.list;
    var c = '';
    for (var i = 0; i < contracts.length; i++) {
      var abi = contracts[i].info.abi;
      var name = contracts[i].name;
      var addr = contracts[i].address;
      // console.log('@@@@@@@@@@@@@@');
      // console.log( contracts[i]);
      // var keys = Object.keys(contracts[i].info);
      // console.log(keys);
      console.log(abi);
      var rowItems = this.bindRaw(abi, name, addr);
      console.log(contracts[i]);
      c = c + ' <ul class="list pa3 mt0">';
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
    }
    return c;
  }
};

setTimeout(function () { window.contract.init(); }, 2000);
