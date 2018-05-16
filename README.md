# Patrol boat
Ethereum Smart contract test tool with UI support

*Other languages: [English](README.md), [한국어](README.ko.md)]*

## SeoulEthereumMeetup Hackathon (2018/4/24 14:00 ~ next day 06:00)
- Plan for presentation : 
[link](https://docs.google.com/presentation/d/1w-jPVe7lhoqhAhg9ll8uCGPwQR5UBhfOHTf5KheTMbI/edit?usp=sharing)
- Result announcement :
[link](https://docs.google.com/presentation/d/1RUSk7vmv6_51ADHiQG2vxPdCh-pVrXnARmgalBTGA2c/edit?usp=sharing)

## Problem
Smart contract testing is difficult and takes too much time.

## Improvement goal
* It is easier to access (no-install, like myetherwallet).
* You can test contracts deployed on ganache-cli as easily as possible.
* UX is designed to be easy to test and use.
* It is practical as a test tool.
* Reduce development and testing time for Smart Contract and dapp

![Alt text](https://github.com/harborPlatform/patrolboat/blob/master/screenshot_201805016.JPG "screenshot 201805016")



- avatar
//https://github.com/Ashwinvalento/cartoon-avatar
 * MALE : 1 - 129 * FEMALE : 1 - 114
 example
 https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png

- ICON 
https://fontawesome.com/

- wallet structure
  <데이터 영역>
   지갑주소: 고유식별자
   금액: Eth 잔액
   EthRC20:배열 데이터
  <View영역>
   별칭:임이의 이름
   아바타: 별칭 이미지이며, 임이의 이미지
   아바타성별
   아바타 번호

- contract structure
  <데이터 영역>
    address : 배포된 주소
    info : 실행 가능한 contract 객체
  <View영역>
   view : UI관련 설정들 추가
