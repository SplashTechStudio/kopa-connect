import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MemberProvider } from "@/context/MemberContext";
import { CartProvider } from "@/context/CartContext";
import { RequireAuth } from "@/components/RequireAuth";

import Landing from "./pages/Landing";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Marketplace from "./pages/Marketplace";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import Accommodation from "./pages/Accommodation";
import ListingDetail from "./pages/ListingDetail";
import RoommateDetail from "./pages/RoommateDetail";
import Community from "./pages/Community";
import Academy from "./pages/Academy";
import CourseDetail from "./pages/CourseDetail";
import Notifications from "./pages/Notifications";
import Welfare from "./pages/Welfare";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MemberProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/verify" element={<Verify />} />

              <Route path="/app" element={<RequireAuth><Dashboard /></RequireAuth>} />
              <Route path="/app/finance" element={<RequireAuth><Finance /></RequireAuth>} />
              <Route path="/app/marketplace" element={<RequireAuth><Marketplace /></RequireAuth>} />
              <Route path="/app/marketplace/:id" element={<RequireAuth><ItemDetail /></RequireAuth>} />
              <Route path="/app/cart" element={<RequireAuth><Cart /></RequireAuth>} />
              <Route path="/app/accommodation" element={<RequireAuth><Accommodation /></RequireAuth>} />
              <Route path="/app/accommodation/:id" element={<RequireAuth><ListingDetail /></RequireAuth>} />
              <Route path="/app/roommate/:id" element={<RequireAuth><RoommateDetail /></RequireAuth>} />
              <Route path="/app/community" element={<RequireAuth><Community /></RequireAuth>} />
              <Route path="/app/academy" element={<RequireAuth><Academy /></RequireAuth>} />
              <Route path="/app/academy/:id" element={<RequireAuth><CourseDetail /></RequireAuth>} />
              <Route path="/app/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />
              <Route path="/app/welfare" element={<RequireAuth><Welfare /></RequireAuth>} />
              <Route path="/app/profile" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/app/admin" element={<RequireAuth admin><Admin /></RequireAuth>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </MemberProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
