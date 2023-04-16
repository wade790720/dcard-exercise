## Install
```
yarn install
```

## Run
```
yarn start
```

### Description
1. 監聽文字輸入框的變化，使用 useState 將輸入框的值儲存在 state 中，當 useEffect state 變化時觸發 API 請求。
2. 處理搜尋 API 的 rate limit，使用 debounce 來限制 API requests 的頻率。
3. 當使用者滾到頁面底部時，使用 hooks/useElementOnScreen 來偵測是否有進入 viewport。
4. hooks/useElementOnScreen 是使用 Intersection Observer API 實作，並且使用 ref 來儲存 DOM element。 
5. 處理 API request 的錯誤狀態，使用 try/catch 來捕獲錯誤，然後顯示錯誤信息。