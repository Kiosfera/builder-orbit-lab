import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Farm from "./pages/Farm";
import Stocking from "./pages/Stocking";
import Inventory from "./pages/Inventory";
import Feeding from "./pages/Feeding";
import WaterQuality from "./pages/WaterQuality";
import Health from "./pages/Health";
import Biometry from "./pages/Biometry";
import Monitoring from "./pages/Monitoring";
import Tasks from "./pages/Tasks";
import CycleHistory from "./pages/CycleHistory";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/farm" element={<Farm />} />
            <Route path="/stocking" element={<Stocking />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/feeding" element={<Feeding />} />
            <Route path="/water-quality" element={<WaterQuality />} />
            <Route path="/health" element={<Health />} />
            <Route path="/biometry" element={<Biometry />} />
            <Route path="/monitoring" element={<Monitoring />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/cycle-history" element={<CycleHistory />} />
            <Route path="/reports" element={<Reports />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
