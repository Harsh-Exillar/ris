import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSecurity } from "@/hooks/use-security";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: 1,
    }
  }
});

const SecurityWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isSecure, errors } = useSecurity();

  useEffect(() => {
    if (!isSecure && errors.length > 0) {
      console.warn('Security validation failed:', errors);
    }
  }, [isSecure, errors]);

  // In production, you might want to render an error page if security fails
  // For now, we'll just log warnings and continue
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SecurityWrapper>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SecurityWrapper>
  </QueryClientProvider>
);

export default App;
