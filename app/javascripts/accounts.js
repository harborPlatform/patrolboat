//alert('test');


// $("#copyBtn").click(function(){
// 	copyToClipboard();
// 	alert('TEST');
// });


// function copyToClipboard(){
//   var copyText = document.getElementById("acountAdress");
//   copyText.select();
//   document.execCommand("Copy");
//   alert("Copied the text: " + copyText.value);
// }


 // var div = document.getElementById('acountAdress')[0];

 // div.addEventListener('click', function (event) {
 //     alert('Hi!');
 // });

window.account = {
	init:function(){
		this.refreshWallet();
	},
	clearWallet:function(){

	},
	refreshWallet:function(){

	}
}

 // window.account.clearWallet();

 setTimeout(function(){  window.account.init(); }, 3000);