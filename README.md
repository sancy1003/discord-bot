# 🤖 Discord Bot

### 개인적으로 사용하기 위해 제작한 Discord Bot입니다.

<br/>

## **💻 제작 기능**

- 뮤직 플레이어
- 기상청 OPEN API를 이용한 시간대별 오늘 날씨 조회
- FIFA ONLINE OPEN API를 이용한 간단한 전적 검색
- FIFA 인벤의 쿠폰 게시판 크롤링

<br/>

---

<br/>

## **🔍 사용 방법**

<br/>

### 1. Discord Bot 생성

<br/>

https://discord.com/developers/applications 에 로그인하여 본인의 Bot 생성

<br/><br/>

### 2. Discord Bot 설정

<br/>

setting 메뉴의 Bot tab에서 Privileged Gateway Intents의 PRESENCE INTENT, SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT 모두 활성화

<br/><br/>

### 3. 프로젝트 설치

<br/>

프로젝트를 다운로드 받은 후 패키지 설치

```javascript
npm i
```

<br/><br/>

### 4. env 설정

<br/>

프로젝트 폴더에 .env 파일 생성

```
CLIENT_ID= Dicord 봇 ClientID
GUILD_ID= 봇 사용할 dicord 서버의 guild ID
DISCORD_TOKKEN= Dicord 봇
NEXON_KEY= 넥슨 API 키
WEATHER_SERVICE_KEY= 기상청 서비스 API 키
```

<br/><br/>

### 5. Discord 서버에 봇 명령어 추가

<br/>

```
node deploy-commands.js
```

<br/><br/>

### 6. 봇 실행

<br/>

```
npm run start
```

<br/><br/>

### ps. 봇 초대 URL 발급 시

<br/>

SCOPES에서 bot, applications.commands 체크, 봇 권한은 admin으로 주는게 편합니다. 🤗
