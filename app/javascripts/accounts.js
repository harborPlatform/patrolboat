


window.account = {
	init:function(){
		this.refreshWallet();

	},
	clearWallet:function(){

	},
	refreshWallet:function(){
	
		var wallets = window.pb.wallet.list;
		for(var i=0; i<wallets.length; i++) {
			//console.log("i:"+i+" / "+wallets[i]+",");

		var wallet =         ' <div class="demo-card-wide mdl-card mdl-shadow--2dp">';
		    wallet = wallet + '    <div class="inner-container">';
		    wallet = wallet + '      <div class="inner-container-layout" id="copyBtn" onclick="util.copyToClipboard($("#acount-address").text())" style="font-size:1em; color:gray; padding:15px 5px 2px 13px;">';
		    wallet = wallet + '        <i class="far fa-clone" ></i>';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '      <div class="inner-container-layout mdl-card__supporting-text" id="acount-address" style="width:85%; padding:15px 0px 2px 0px;" >';
		    wallet = wallet + '        ' + wallets[i].info.address + '';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '      <div class="inner-container-layout" style="font-size:1em; color:gray; padding:5px 5px 2px 0px;">';
		    wallet = wallet + '        <i class="fas fa-cog"></i>';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '    <div class="inner-container">';
		    wallet = wallet + '      <div class="inner-container-layout mdl-card__supporting-text" style="width:50%; padding-top:0px; padding-bottom:0px">';
		    wallet = wallet + '        <img src=' + wallets[i].view.avatar + ' class="br-100 h4 w4 dib ba b--black-05 pa0">';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '      <div class="inner-container-layout mdl-card__supporting-text" style="width:32%;">';
		    wallet = wallet + '        <h4>99.45</h4>';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '    </div>';
		    wallet = wallet + '    <div class="inner-container" style="height:35px">';
		    wallet = wallet + '      <div class="button-align">';
		    wallet = wallet + '        <div class="inner-container-layout">';
		    wallet = wallet + '          <button class="f6 link dim br3 ba ph3 pv2 mb2 dib navy" style="margin-right:10px;" >';
		    wallet = wallet + '            Button1';
		    wallet = wallet + '          </button>';
		    wallet = wallet + '        </div>';
		    wallet = wallet + '        <div class="inner-container-layout">';
		    wallet = wallet + '          <button class="f6 link dim br3 ba ph3 pv2 mb2 dib navy" style="margin-right:10px;">';
		    wallet = wallet + '            Button2';
		    wallet = wallet + '          </button>';
		    wallet = wallet + '        </div>';
		    wallet = wallet + '        <div class="inner-container-layout">';
		    wallet = wallet + '          <button class="f6 link dim br3 ba ph3 pv2 mb2 dib navy" style="margin-right:10px;">';
		    wallet = wallet + '            Button3';
		    wallet = wallet + '          </button>';
		    wallet = wallet + '        </div>';
		    wallet = wallet + '      </div>';
		    wallet = wallet + '    </div>';
		    wallet = wallet + '    <div class="inner-container" style="border-top:1px solid rgba(0,0,0,.1); height:40px">';
		    wallet = wallet + '        <div class="inner-container-layout mdl-card__supporting-text" style="width:50%; padding:10px 0px 0px 10px; ">';
		    wallet = wallet + '          <font size="2">Test Token </font>';
		    wallet = wallet + '        </div>';
		    wallet = wallet + '        <div class="inner-container-layout mdl-card__supporting-text" style="padding:10px 0px 0px 10px;">';
		    wallet = wallet + '          <font size="3"> 1,320.123545 </font>';
		    wallet = wallet + '        </div>';
		    wallet = wallet + '    </div>';

		   	var e = document.createElement('span');
			e.innerHTML = wallet;
			document.getElementById("wallets").appendChild(e);
		}




		console.log(window.pb.wallet.list);



	}
}

 // window.account.clearWallet();

 setTimeout(function(){  window.account.init(); }, 3000);