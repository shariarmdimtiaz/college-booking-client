import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Providers/AuthProviders";
import router from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./Providers/ThemeProvider";
import SearchProvider from "./Providers/SearchProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <SearchProvider>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </HelmetProvider>
        </SearchProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
