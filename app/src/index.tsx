import React from "react";
import ReactDOM from "react-dom";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { getQuestions } from "@services/PollsApi";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 60 * 1000,
    },
  },
});
const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
  key: `pollsOfflineCache`,
  throttleTime: 0,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

const prefetchData = () => {
  queryClient.prefetchInfiniteQuery("questions", () => getQuestions());
};

prefetchData();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
