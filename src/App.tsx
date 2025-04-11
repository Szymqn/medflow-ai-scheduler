
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import MedicalDashboard from "./pages/MedicalDashboard";
import OperationTests from "./pages/OperationTests";
import ProfilePage from "./pages/ProfilePage";
import OperationsPage from "./pages/OperationsPage";
import CalendarPage from "./pages/CalendarPage";
import TestsPage from "./pages/TestsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/medical-dashboard" element={<MedicalDashboard />} />
          <Route path="/operation-tests" element={<OperationTests />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
