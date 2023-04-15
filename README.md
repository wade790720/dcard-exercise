## Install
```
yarn install
```

## Run
```
yarn start
```

### Description
1. 處理搜尋 API 的 rate limit，使用 debounce 來限制 API requests 的頻率。
2. 當使用者滾到頁面底部時，使用 hooks/useElementOnScreen 來偵測是否有進入 viewport。
3. hooks/useElementOnScreen 是使用 Intersection Observer API 實作，並且使用 ref 來儲存 DOM element。 