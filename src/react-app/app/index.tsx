import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { HomePage } from "@/pages/home";
import { CalculatorPage } from "@/pages/calculator";
import { ErrorBoundary } from "@/app/providers/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/calculator" component={CalculatorPage} />
          <Route>404 Not Found</Route>
        </Switch>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
