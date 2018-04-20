
var MultiSigWallet = artifacts.require('./MultiSigWallet.sol');
var Ownable = artifacts.require('./Ownable.sol');

module.exports = function(deployer, network, accounts) {

  return deployer.deploy(Ownable).then(async()=>{
    var own = await Ownable.deployed();
  });

  // return deployer.deploy(MultiSigWallet,accounts[0],1).then(async()=>{
  //   // var ms = await MultiSigWallet.deployed();
  // });
};



const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)} 
}

function latestTime() {
  return web3.eth.getBlock('latest').timestamp; 
}

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'))
}

