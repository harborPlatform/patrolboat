//alert('test');


function copyToClipboard(){
  var copyText = document.getElementById("acountAdress");
  copyText.select();
  document.execCommand("Copy");
  alert("Copied the text: " + copyText.value);
}