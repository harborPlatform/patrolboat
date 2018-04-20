
// import $ from '../../bower_components/jquery/dist/jquery.min.js'
// window.$ = $
// import '../../bower_components/tachyons/css/tachyons.min.css'
// import '../../bower_components/animate.css/animate.min.css'
import '../stylesheets/app.css'
// import { default as tfc } from 'truffle-contract'
import './core.js'
import './accounts.js'

alert(window.pb.wallet.list[0]);

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
*/

/*
contract structure
  <데이터 영역>
    
  <View영역>
   
*/