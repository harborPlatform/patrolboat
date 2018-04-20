
window.pb.wallet = {
  list:[],
  pushWallet:function(addr){
    var item = {};
    item.info = {};
    item.view = {};

    item.info.address = addr.toString();
    item.info.balance = window.pb.wallet.refreshBalance(addr);
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
    // alert(addr)
    console.log('dddddddfadfadf')
    // var bal = web3.fromWei(web3.eth.getBalance(addr));
    // console.log('balance:'+bal);
    // return bal;
    // web3.eth.getBalance(addr,function(bal){
    //   alert(bal)
    // });
  },
  refreshAllBalance:function(){

  },popAvata:function(){
    var gender = window.util.getRandomInt(0,1);
    var avatar = {};
    if(gender){
      var num = window.util.getRandomInt(1,129);
      avatar.gender = gender;
      avatar.num = num;
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/'+num+'.png';

    }else{
      var num = window.util.getRandomInt(1,114);
      avatar.gender = gender;
      avatar.num = num;
      avatar.path = 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/'+num+'.png';
    }

    return avatar;
  },
  getPrivateKey:function () {

  }
}