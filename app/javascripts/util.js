
window.util = {

  alert:function(msg){
    var notyf = new Notyf();
    notyf.alert(msg);
  },
  msg:function(){
    var notyf = new Notyf();
    notyf.confirm(msg);
  },
  getRandomInt:function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },
  copyToClipboard (text) {
    text = text.replace(/\s+/, "");
    text = text.replace(/\s+$/g, "");
    text = text.replace(/\n/g, "");
    text = text.replace(/\r/g, "");

    var textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.select()
    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      alert('Copying text command was ' + msg)
    } catch (err) {
      console.log('Oops, unable to copy')
    }
    document.body.removeChild(textArea)
  },
  duplicateCheck:function(arr,addr) {
    var counts = [];
    for(var i = 0; i <= arr.length; i++) {
        if(counts[a[i]] === undefined) {
            counts[a[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
  },
  toastMsg:function(){

  }
}
