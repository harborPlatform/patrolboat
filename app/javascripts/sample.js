
// var ethJSABI = require("ethjs-abi");
// var BlockchainUtils = require("truffle-blockchain-utils");

// 	detectNetwork: function() {
//       var self = this;
//       return new Promise(function(accept, reject) {
//         // Try to detect the network we have artifacts for.
//         if (self.network_id) {
//           // We have a network id and a configuration, let's go with it.
//           if (self.networks[self.network_id] != null) {
//             return accept(self.network_id);
//           }
//         }

//         self.web3.version.getNetwork(function(err, result) {
//           if (err) return reject(err);

//           var network_id = result.toString();

//           // If we found the network via a number, let's use that.
//           if (self.hasNetwork(network_id)) {
//             self.setNetwork(network_id);
//             return accept();
//           }

//           // Otherwise, go through all the networks that are listed as
//           // blockchain uris and see if they match.
//           var uris = Object.keys(self._json.networks).filter(function(network) {
//             return network.indexOf("blockchain://") == 0;
//           });

//           var matches = uris.map(function(uri) {
//             return BlockchainUtils.matches.bind(BlockchainUtils, uri, self.web3.currentProvider);
//           });

//           Utils.parallel(matches, function(err, results) {
//             if (err) return reject(err);

//             for (var i = 0; i < results.length; i++) {
//               if (results[i]) {
//                 self.setNetwork(uris[i]);
//                 return accept();
//               }
//             }

//             // We found nothing. Set the network id to whatever the provider states.
//             self.setNetwork(network_id);

//             accept();
//           });

//         });
//       });
//     }

//   var Utils = {
//     is_object: function(val) {
//       return typeof val == "object" && !Array.isArray(val);
//     },
//     is_big_number: function(val) {
//       if (typeof val != "object") return false;

//       // Instanceof won't work because we have multiple versions of Web3.
//       try {
//         new BigNumber(val);
//         return true;
//       } catch (e) {
//         return false;
//       }
//     },
//     decodeLogs: function(C, instance, logs) {
//       return logs.map(function(log) {
//         var logABI = C.events[log.topics[0]];

//         if (logABI == null) {
//           return null;
//         }

//         // This function has been adapted from web3's SolidityEvent.decode() method,
//         // and built to work with ethjs-abi.

//         var copy = Utils.merge({}, log);

//         function partialABI(fullABI, indexed) {
//           var inputs = fullABI.inputs.filter(function (i) {
//             return i.indexed === indexed;
//           });

//           var partial = {
//             inputs: inputs,
//             name: fullABI.name,
//             type: fullABI.type,
//             anonymous: fullABI.anonymous
//           };

//           return partial;
//         }

//         var argTopics = logABI.anonymous ? copy.topics : copy.topics.slice(1);
//         var indexedData = "0x" + argTopics.map(function (topics) { return topics.slice(2); }).join("");
//         var indexedParams = ethJSABI.decodeEvent(partialABI(logABI, true), indexedData);

//         var notIndexedData = copy.data;
//         var notIndexedParams = ethJSABI.decodeEvent(partialABI(logABI, false), notIndexedData);

//         copy.event = logABI.name;

//         copy.args = logABI.inputs.reduce(function (acc, current) {
//           var val = indexedParams[current.name];

//           if (val === undefined) {
//             val = notIndexedParams[current.name];
//           }

//           acc[current.name] = val;
//           return acc;
//         }, {});

//         Object.keys(copy.args).forEach(function(key) {
//           var val = copy.args[key];

//           // We have BN. Convert it to BigNumber
//           if (val.constructor.isBN) {
//             copy.args[key] = C.web3.toBigNumber("0x" + val.toString(16));
//           }
//         });

//         delete copy.data;
//         delete copy.topics;

//         return copy;
//       }).filter(function(log) {
//         return log != null;
//       });
//     },
//     promisifyFunction: function(fn, C) {
//       var self = this;
//       return function() {
//         var instance = this;

//         var args = Array.prototype.slice.call(arguments);
//         var tx_params = {};
//         var last_arg = args[args.length - 1];

//         // It's only tx_params if it's an object and not a BigNumber.
//         if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
//           tx_params = args.pop();
//         }

//         tx_params = Utils.merge(C.class_defaults, tx_params);

//         return C.detectNetwork().then(function() {
//           return new Promise(function(accept, reject) {
//             var callback = function(error, result) {
//               if (error != null) {
//                 reject(error);
//               } else {
//                 accept(result);
//               }
//             };
//             args.push(tx_params, callback);
//             fn.apply(instance.contract, args);
//           });
//         });
//       };
//     },
//     synchronizeFunction: function(fn, instance, C) {
//       var self = this;
//       return function() {
//         var args = Array.prototype.slice.call(arguments);
//         var tx_params = {};
//         var last_arg = args[args.length - 1];

//         // It's only tx_params if it's an object and not a BigNumber.
//         if (Utils.is_object(last_arg) && !Utils.is_big_number(last_arg)) {
//           tx_params = args.pop();
//         }

//         tx_params = Utils.merge(C.class_defaults, tx_params);

//         return C.detectNetwork().then(function() {
//           return new Promise(function(accept, reject) {
//             var callback = function(error, tx) {
//               if (error != null) {
//                 reject(error);
//                 return;
//               }

//               var timeout = C.synchronization_timeout || 240000;
//               var start = new Date().getTime();

//               var make_attempt = function() {
//                 C.web3.eth.getTransactionReceipt(tx, function(err, receipt) {
//                   if (err) return reject(err);

//                   if (receipt != null) {
//                     return accept({
//                       tx: tx,
//                       receipt: receipt,
//                       logs: Utils.decodeLogs(C, instance, receipt.logs)
//                     });
//                   }

//                   if (timeout > 0 && new Date().getTime() - start > timeout) {
//                     return reject(new Error("Transaction " + tx + " wasn't processed in " + (timeout / 1000) + " seconds!"));
//                   }

//                   setTimeout(make_attempt, 1000);
//                 });
//               };

//               make_attempt();
//             };

//             args.push(tx_params, callback);
//             fn.apply(self, args);
//           });
//         });
//       };
//     },
//     merge: function() {
//       var merged = {};
//       var args = Array.prototype.slice.call(arguments);

//       for (var i = 0; i < args.length; i++) {
//         var object = args[i];
//         var keys = Object.keys(object);
//         for (var j = 0; j < keys.length; j++) {
//           var key = keys[j];
//           var value = object[key];
//           merged[key] = value;
//         }
//       }

//       return merged;
//     },
//     parallel: function (arr, callback) {
//       callback = callback || function () {};
//       if (!arr.length) {
//         return callback(null, []);
//       }
//       var index = 0;
//       var results = new Array(arr.length);
//       arr.forEach(function (fn, position) {
//         fn(function (err, result) {
//           if (err) {
//             callback(err);
//             callback = function () {};
//           } else {
//             index++;
//             results[position] = result;
//             if (index >= arr.length) {
//               callback(null, results);
//             }
//           }
//         });
//       });
//     },
//     bootstrap: function(fn) {
//       // Add our static methods
//       Object.keys(fn._static_methods).forEach(function(key) {
//         fn[key] = fn._static_methods[key].bind(fn);
//       });

//       // Add our properties.
//       Object.keys(fn._properties).forEach(function(key) {
//         fn.addProp(key, fn._properties[key]);
//       });

//       return fn;
//     }
//   };
  
// function Contract(contract) {
//     var self = this;
//     var constructor = this.constructor;
//     this.abi = constructor.abi;

//     if (typeof contract == "string") {
//       var address = contract;
//       var contract_class = constructor.web3.eth.contract(this.abi);
//       contract = contract_class.at(address);
//     }

//     this.contract = contract;

//     // Provision our functions.
//     for (var i = 0; i < this.abi.length; i++) {
//       var item = this.abi[i];
//       if (item.type == "function") {
//         if (item.constant == true) {
//           this[item.name] = Utils.promisifyFunction(contract[item.name], constructor);
//         } else {
//           this[item.name] = Utils.synchronizeFunction(contract[item.name], this, constructor);
//         }

//         this[item.name].call = Utils.promisifyFunction(contract[item.name].call, constructor);
//         this[item.name].sendTransaction = Utils.promisifyFunction(contract[item.name].sendTransaction, constructor);
//         this[item.name].request = contract[item.name].request;
//         this[item.name].estimateGas = Utils.promisifyFunction(contract[item.name].estimateGas, constructor);
//       }

//       if (item.type == "event") {
//         this[item.name] = contract[item.name];
//       }
//     }

//     this.sendTransaction = Utils.synchronizeFunction(function(tx_params, callback) {
//       if (typeof tx_params == "function") {
//         callback = tx_params;
//         tx_params = {};
//       }

//       tx_params.to = self.address;

//       constructor.web3.eth.sendTransaction.apply(constructor.web3.eth, [tx_params, callback]);
//     }, this, constructor);

//     this.send = function(value) {
//       return self.sendTransaction({value: value});
//     };

//     this.allEvents = contract.allEvents;
//     this.address = contract.address;
//     this.transactionHash = contract.transactionHash;
//   };




// </br>
// <div class="measure center  ba b--black bg-transparent">
//   <ul class="list pa3  mt0 ">
//     <li
//       class="flex items-center lh-copy tc bb b--black-10">
//         <div class="tc flex-auto">
//           <!-- <span class="f2 db black-70">Send Ether</span> -->
//           <h1 class=" lh-title">Send</h1>
//           <!-- <h1 class="f6 f-subheadline-l fw6 tc">Send ether</h1> -->
//         </div>
//     </li>
//     <li
//       class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
//         <div class="pl3 flex-auto">
//           <span class="f3 db black-70">To</span>
//           <span class="f6 db black-70">address</span>
//         </div>
//         <div>
//           <span href="tel:" class="f6 link blue hover-dark-gray">0x31CBAD1832f2fF60D0548Cdd1BA2cF9d0E5608bB</span>
//         </div>
//     </li>
//     <li
//       class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
//         <div class="pl3 flex-auto">
//           <span class="f4 db black-70">Ether</span>
//           <span class="f6 db black-70"></span>
//         </div>
//         <div>
//           <input class="pa2 input-reset ba b--black-90 bg-transparent w-100 measure" type="number" name="send_ether"  id="send_ether">
//         </div>
//     </li>
//     <li
//       class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
//         <div class="pl3 flex-auto">
//           <span class="f4 db black-70">Gas price</span>
//           <span class="f6 db black-30"></span>
//         </div>
//         <div>
//           <input class="pa2 input-reset ba b--black-90 bg-transparent w-100 measure" type="number" name="send_gasprice"  id="send_gasprice">
//         </div>
//     </li>
//     <li
//       class="flex items-center lh-copy pa3 ph0-l bb b--black-10">
//         <div class="pl3 flex-auto">
//           <span class="f4 db black-70">Gas Limit</span>
//           <span class="f6 db black-30"></span>
//         </div>
//         <div>
//           <input class="pa2 input-reset ba b--black-90 bg-transparent w-100 measure" type="number" name="send_gaslimit"  id="send_gaslimit">
//         </div>
//     </li>
//   </ul>
//   <div class="ma3 tr"><input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" type="submit" value="send"></div>
// </div>
