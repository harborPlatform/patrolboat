//alert('test');


$("#copyBtn").click(function(){
	copyToClipboard();
	alert('TEST');
});


function copyToClipboard(){
  var copyText = document.getElementById("acountAdress");
  copyText.select();
  document.execCommand("Copy");
  alert("Copied the text: " + copyText.value);
}


 // var div = document.getElementById('acountAdress')[0];

 // div.addEventListener('click', function (event) {
 //     alert('Hi!');
 // });