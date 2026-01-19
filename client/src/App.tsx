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
import PassportPage from "@/pages/passport";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Onboarding} />
        <Route path="/map" component={MapPage} />
        <Route path="/shop/:id" component={ShopDetail} />
        <Route path="/trails" component={TrailsPage} />
        <Route path="/trail/:id" component={TrailDetail} />
        <Route path="/passport" component={PassportPage} />
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
