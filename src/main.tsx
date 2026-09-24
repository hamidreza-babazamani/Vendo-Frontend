import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

// تنظیمات React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // ۵ دقیقه
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(20px)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px",
              padding: "12px 20px",
              fontFamily: "Vazirmatn, sans-serif",
            },
            success: {
              iconTheme: {
                primary: "#FF6B35",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);