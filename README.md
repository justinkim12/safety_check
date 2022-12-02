# Readme

## 프로젝트 소개

### 🌏  ISO45001 인증 진단 및 관리 시스템

- 국제표준화기구 ISO의 ISO45001:2018 안전보건경영시스템 인증을 통과하기 위한 내부심사 체크리스트 및 문서관리 툴입니다.
- 시각화 된 대시보드를 통해 한눈에 전체 진행률을 파악할 수 있으며, 반기별 점검 항목 및 미해결 항목, 자체 점검 항목을 확인 할 수 있습니다.

### 🎯 개발 목적 및 필요성

- 중대재해처벌법 시행으로 인해(2022) 기업들은 해당 시행령을 만족해야만 합니다.
- 소기업들은 안전보건관리체계 구축에 힘듦을 겪는데, 표준화된 안전관리 규정 절차 만드는 것에서 가장 어려움을 느끼고, 파일을 5년동안 보관하고, 인수인계하는것에 어려움을 느끼고 있습니다.
- 중대재해처벌법 시행령은 모두 ISO45001의 항목과 대응되며, 이 프로그램을 사용하는 것으로 기업들이 중대재해처벌법의 시행령을 만족함과 동시에 ISO 45001인증도 통과할 수 있도록 유도할 수 있습니다.

## ❗Setup

### React 앱 구동을 위한 기본 설정

프로젝트 폴더로 이동하여 해당 명령어 실행. 

```bash
npm install

npm add @nivo/core @nivo/sunburst
```

### php 및 sql 설정

1. WAMP 설치(기본 경로인 C 드라이브)

1. 이후 C:\Bitnami\wampstack-7.4.29-0\apache2\htdocs (wampstack 버젼 차이는 있을 수 있음) 폴더 로 이동
2. backend 폴더를 해당 폴더에 복사, 붙여넣기
3. package.json 내에 "proxy": "[http://127.0.0.1:80](http://127.0.0.1/)" 추가
4. MySql localhost 서버 연결
5. localhost 내에 database_sql 파일 실행
6. data.php 파일의 $dbConn, fileLogic.php 파일의 $conn, $parsing.php 파일의 $connect 안의 password를 본인 비밀번호로 수정

## 🔧 기능 소개

- 대시보드
    
    ![KakaoTalk_Photo_2022-12-02-15-58-56.png](Readme%2048aa66913a4d4850b7e97c1d86d216d4/KakaoTalk_Photo_2022-12-02-15-58-56.png)
    
    반기별 1회 확인 필요 항목 표시
    
    캘린더 위젯
    
    자체 점검항목 표시
    
    미해결 항목 표시
    
- 진행률 페이지
    
    ![KakaoTalk_Photo_2022-12-02-15-58-41.png](Readme%2048aa66913a4d4850b7e97c1d86d216d4/KakaoTalk_Photo_2022-12-02-15-58-41.png)
    
    전체 진행률 확인
    
    요소별 진행률 확인
    
- 체크리스트 페이지
    
    ![KakaoTalk_Photo_2022-12-02-15-58-49.png](Readme%2048aa66913a4d4850b7e97c1d86d216d4/KakaoTalk_Photo_2022-12-02-15-58-49.png)
    
    담당 부서, 심사 결과 관리
    
    항목 별 관련 문서 업로드, 로그 처리
    
    관리자가 임의로 점검하고자 하는 항목 체크
    
    미해결, 자체점검, 반기별 심사항목 필터링
    
    리모콘으로 원하는 항목 번호 입력해 이동
    
- 문서 로그 페이지
    
    ![KakaoTalk_Photo_2022-12-02-15-59-04.png](Readme%2048aa66913a4d4850b7e97c1d86d216d4/KakaoTalk_Photo_2022-12-02-15-59-04.png)
    
    문서 업로드 로그 확인 가능

***
    
+public 폴더 : 기본적 html 틀 폴더

+ src 폴더 : 실질적 javascript 코드 폴더
    + components 폴더 : 그래프와 캘린더 기능 수행의 컴포넌트 폴더
        + src/components/Cal.js : 캘린더 컴포넌트 
            + 일정 등록 
            + 일정 수정(drag&drop 가능) 
            + 일정 삭제
        + src/components/graph.js : 그래프 폴더
            - DB 미해결 항목 데이터 기반 그래프 생성
    
    + routes 폴더 : 각 페이지별 구현 코드
        + src/route/Home.js : 대시보드 
            + src/route/Home.css : 대시보드 css 파일
        + src/route/ProgressPage.js : 진행률 페이지
            + src/route/Progress.css : 진행률 페이지 css 파일
        + src/route/ChecklistPage.js : 체크리스트 페이지
            + src/route/checklist.js : 체크리스트 페이지 css 파일
            + src/route/remote.css : 체크리스트 내 리모콘 css 파일
        + src/route/DocumentPage.js : 문서 로그 페이지

+ backend 폴더 : DB 관련 폴더 
    + uploads 폴더 : 문서 저장 경로 폴더
    + backend/data.php : MySQL에서 테이블 데이터를 가져오는 PHP 파일
    + backend/fileLogic.php : 문서 업로드 시 문서 데이터 처리하는 PHP 파일
    + backend/parsing.php : 체크리스트 데이터 저장 시 DB로 데이터 전송하는 PHP 파일
    + database_sql.sql : DB 서버 생성용 sql 파일





## 📖 기술 스택

### Front&Backend

React 18.2.0

php 7.4.29

mysql 8.0.28

apache 7.4.29

### Library

axios

nivo

## 💽 DB구조

![KakaoTalk_Image_2022-12-02-15-39-59.png](Readme%2048aa66913a4d4850b7e97c1d86d216d4/KakaoTalk_Image_2022-12-02-15-39-59.png)