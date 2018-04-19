
// import $ from '../../bower_components/jquery/dist/jquery.min.js'
// window.$ = $
// import '../../bower_components/tachyons/css/tachyons.min.css'
// import '../../bower_components/animate.css/animate.min.css'
import '../stylesheets/app.css'

var Web3 = require('web3');

window.app = {

}

window.onLoadVeiw = {
  loadNomalWeb3:function(){
  console.log('standard web3 init !!!')
  var web3 = new Web3();
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      //window.web3 = new Web3(web3.currentProvider);
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    } else {
      // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
      // var provider = new Web3.providers.HttpProvider("http://localhost:8545");
       window.web3 = new Web3(new Web3.providers.HttpProvider("http://etherscan.io:8545"));
    }
  }
  ,checkNetwork:function(){

      web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          console.log('This is mainnet');
          alert('this is mainnet');
          break
        case "2":
          console.log('This is the deprecated Morden test network.');
          break
        case "3":
          console.log('This is the ropsten test network.');
          break
        default:
          console.log('This is an unknown network.');
        }
       });
    }
}

onLoadVeiw.loadNomalWeb3();

var acs  = web3.eth.accounts;



$(document).on('ready', function() {
    $("#input-b6").fileinput({
        showUpload: false,
        dropZoneEnabled: false,
        maxFileCount: 10,
        mainClass: "input-group-lg"
    });

    $("#input-b6").onchange(function(){
         //submit the form here
         alert('ss')
    });
});