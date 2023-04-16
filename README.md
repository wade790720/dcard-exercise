## Install
```
yarn install
```

## Run
```
yarn start
```

## Description
1. 使用 useState 將輸入框的值儲存在 state 中，當 state 改變時，重新渲染組件。
2. 使用 debounce 來限制 API requests 的頻率，以避免過度請求。
3. 使用 hooks/useElementOnScreen 來偵測當使用者滾到頁面底部時，觸發 API 請求。
4. 使用 Intersection Observer API 實作 hooks/useElementOnScreen，並使用 useCallback 來優化性能。
5. 使用 Try/catch 來處理 API request 的錯誤狀態，並顯示錯誤信息。
6. 使用 React.memo 將組件包裝，以減少不必要的渲染，從而提高性能。
7. 使用 React.lazy 和 Suspense 將代碼拆分成小塊，並在需要時動態加載，從而提高性能。
8. 使用 React Hook 和 React Context 來實現將業務邏輯和UI邏輯分離開來，使代碼更具可讀性，並減少耦合性。
9. 使用 CSS Module 來實現 CSS 的模塊化，避免 CSS 樣式污染。

## Performance
使用 React Profiler 來紀錄 React Component Tree 的渲染資訊，以便找到效能瓶頸。
![optimization.jpeg](https://tinypic.host/images/2023/04/17/optimization.jpeg)