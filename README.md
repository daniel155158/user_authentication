# 使用者登入確認器
此專案可以用來確認使用者登入的帳號/密碼是否正確。

## 功能說明
* 使用者輸入帳號/密碼之後，系統會判斷是否正確。

## 如何安裝
1. 打開你的terminal並且clone 此專案至本機電腦
```
git clone https://github.com/daniel155158/user_authentication.git
```
2. 開啟terminal，進入存放此專案的資料夾
```
cd shorten_url
```
3. 安裝npm套件
```
npm install
```
4. 使用nodemon
```
nodemon app.js
```
如果terminal出現: 
```
App is listening on http://localhost:3000
```
表示伺服器順利啟動

現在，你可開啟任一瀏覽器瀏覽器輸入[http://localhost:3000/](http://localhost:3000/) 開始使用此使用者登入確認器囉！
## 開發工具
* Node.js
* Express
* Express-handlebars 
* MongoDB
* Mongoose
* Dotenv
* Bootstrap
* Body-parser
* Cookie-parser