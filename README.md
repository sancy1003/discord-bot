# ๐ค Discord Bot

### ๊ฐ์ธ์ ์ผ๋ก ์ฌ์ฉํ๊ธฐ ์ํด ์ ์ํ Discord Bot์๋๋ค.

<br/>

## **๐ป ์ ์ ๊ธฐ๋ฅ**

- ๋ฎค์ง ํ๋ ์ด์ด
- ๊ธฐ์์ฒญ OPEN API๋ฅผ ์ด์ฉํ ์๊ฐ๋๋ณ ์ค๋ ๋ ์จ ์กฐํ
- FIFA ONLINE OPEN API๋ฅผ ์ด์ฉํ ๊ฐ๋จํ ์ ์  ๊ฒ์
- FIFA ์ธ๋ฒค์ ์ฟ ํฐ ๊ฒ์ํ ํฌ๋กค๋ง

<br/>

---

<br/>

## **๐ ์ฌ์ฉ ๋ฐฉ๋ฒ**

<br/>

### 1. Discord Bot ์์ฑ

<br/>

https://discord.com/developers/applications ์ ๋ก๊ทธ์ธํ์ฌ ๋ณธ์ธ์ Bot ์์ฑ

<br/><br/>

### 2. Discord Bot ์ค์ 

<br/>

setting ๋ฉ๋ด์ Bot tab์์ Privileged Gateway Intents์ PRESENCE INTENT, SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT ๋ชจ๋ ํ์ฑํ

<br/><br/>

### 3. ํ๋ก์ ํธ ์ค์น

<br/>

ํ๋ก์ ํธ๋ฅผ ๋ค์ด๋ก๋ ๋ฐ์ ํ ํจํค์ง ์ค์น

```javascript
npm i
```

<br/><br/>

### 4. env ์ค์ 

<br/>

ํ๋ก์ ํธ ํด๋์ .env ํ์ผ ์์ฑ

```
CLIENT_ID= Dicord ๋ด ClientID
GUILD_ID= ๋ด ์ฌ์ฉํ  dicord ์๋ฒ์ guild ID
DISCORD_TOKKEN= Dicord ๋ด
NEXON_KEY= ๋ฅ์จ API ํค
WEATHER_SERVICE_KEY= ๊ธฐ์์ฒญ ์๋น์ค API ํค
```

<br/><br/>

### 5. Discord ์๋ฒ์ ๋ด ๋ช๋ น์ด ์ถ๊ฐ

<br/>

```
node deploy-commands.js
```

<br/><br/>

### 6. ๋ด ์คํ

<br/>

```
npm run start
```

<br/><br/>

### ps. ๋ด ์ด๋ URL ๋ฐ๊ธ ์

<br/>

SCOPES์์ bot, applications.commands ์ฒดํฌ, ๋ด ๊ถํ์ admin์ผ๋ก ์ฃผ๋๊ฒ ํธํฉ๋๋ค. ๐ค
