
// import $ from '../../bower_components/jquery/dist/jquery.min.js'
// window.$ = $
// import '../../bower_components/tachyons/css/tachyons.min.css'
// import '../../bower_components/animate.css/animate.min.css'

import '../stylesheets/basic.css'
import '../stylesheets/dropzone.css'
import '../stylesheets/notyf.min.css'

import '../stylesheets/notyf.min.css'
import '../stylesheets/app.css'

// import './dropzone.js'

// import { default as tfc } from 'truffle-contract'

import './core.js'
import './accounts.js'


// Dropzone.options.myAwesomeDropzone = {
//   init: function() {
//     this.on("addedfile", function(file) { alert("Added file."); });
//   }
// };


// var myDropzone = new Dropzone("dropzone_json", { url: "/file/post"});

/*
wallet structure
  <데이터 영역>
   지갑주소: 고유식별자
   금액: Eth 잔액
   EthRC20:배열 데이터
  <View영역>
   별칭:임이의 이름
   아바타: 별칭 이미지이며, 임이의 이미지
   아바타성별
   아바타 번호

avatar
//https://github.com/Ashwinvalento/cartoon-avatar
 * MALE : 1 - 129 * FEMALE : 1 - 114
example
https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

ico 
https://fontawesome.com/
*/

/*
contract structure
  <데이터 영역>
    address : 배포된 주소
    info : 실행 가능한 contract 객체
      
  <View영역>
   view : UI관련 설정들 추가
*/