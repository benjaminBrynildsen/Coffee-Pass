import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/layout";
import NotFound from "@/pages/not-found";

import Onboarding from "@/pages/onboarding";
import MapPage from "@/pages/map";
import ShopDetail from "@/pages/shop-detail";
import TrailsPage from "@/pages/trails";
import TrailDetail from "@/pages/trail-detail";
// import PassportPage from "@/pages/passport"; // Deprecated, split into Rewards & Friends/Profile
import RewardsPage from "@/pages/rewards";
import FriendsPage from "@/pages/friends";
import FeedPage from "@/pages/feed";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/map" component={MapPage} />
        <Route path="/shop/:id" component={ShopDetail} />
        <Route path="/trails" component={TrailsPage} />
        <Route path="/trail/:id" component={TrailDetail} />
        
        {/* New Pages */}
        <Route path="/rewards" component={RewardsPage} />
        <Route path="/friends" component={FriendsPage} />
        <Route path="/feed" component={FeedPage} />
        
        {/* Redirect old passport route to rewards for now */}
        <Route path="/passport" component={RewardsPage} />
        
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
