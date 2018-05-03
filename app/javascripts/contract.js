
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
      runtimeContract = structureContract.at(obj.address)

      var item = {};
      item.address = obj.address;
      item.info = obj.runtimeContract;
      item.view = {};
      window.pb.contract.list.push(item);

      console.log(obj);
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
        if(!err){
          Util.alert(err);
        }else{
          Util.msg(h);

        }
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
                  // console.log('loadingResult', n, cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status)
                  
                  //update(n, cmd, hash, receipt.blockNumber, receipt.blockHash, receipt.status)

                  if (receipt.status != '0x0') {
                    // Util.msg( cmd +' hash'+ hash + ' transaction is success')
                  } else {
                    // Util.alert( cmd +' hash'+ hash + ' transaction is false')
                  }
                  // after done
                  
                  
                }
              })
            
          } else {
            // Util.alert('receiptErr:' + receiptErr)
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