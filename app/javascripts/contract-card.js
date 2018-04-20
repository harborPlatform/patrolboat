
window.contract = {
	init:function(){
		this.refreshContract();

	},
	clearContract:function(){

	},
	refreshContract:function(){
		console.log(window.pb.contract.list);

		var contracts = window.pb.contract.list;
		for(var i=0; i<contracts.length; i++) {
			//console.log("i:"+i+" / "+contracts[i]+",");

		var contract =            '  <div class=" w-30 ba b--black-20 bg-white shadow-1 ma3">';
		    contract = contract + '    <ul class="list pa3  mt0 ">';
		    contract = contract + '      <li class="flex items-center lh-copy tc bb b--black-10">';
		    contract = contract + '          <div class="tc flex-auto">';
		    contract = contract + '            <div><span class="f2 lh-title">ContractName </span><i class="fas fa-sync-alt"></i></div>';
		    contract = contract + '            <div>';
		    contract = contract + '            <span class="f7 blue tl">'+contracts[i].address+'</span>';
		    contract = contract + '          </div>';
		    contract = contract + '          </div>';
		    contract = contract + '      </li>';
		    contract = contract + '      <li class="flex items-center lh-copy pa3 ph0-l bb b--black-10">';
		    contract = contract + '          <div class="pl3 flex-auto">';
		    contract = contract + '            <span class="f3 db black-70">supply</span>';
		    contract = contract + '            <span class="f6 db black-70">function</span>';
		    contract = contract + '          </div>';
		    contract = contract + '          <div>';
		    contract = contract + '            <span class="f6 link blue">30</span>';
		    contract = contract + '          </div>';
		    contract = contract + '      </li>';
		    contract = contract + '    </ul>';
		    contract = contract + '  </div>';
		    contract = contract + '';


		   	var e = document.createElement('span');
			e.innerHTML = contract;
			document.getElementById("contract-card").appendChild(e);
		}
	}
}
 setTimeout(function(){  window.contract.init(); }, 2000);