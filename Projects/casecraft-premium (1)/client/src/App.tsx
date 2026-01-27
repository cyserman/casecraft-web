import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Services from "./pages/Services";
import CriminalDefense from "./pages/CriminalDefense";
import DUIDefense from "./pages/DUIDefense";
import FamilyLaw from "./pages/FamilyLaw";
import Contact from "./pages/Contact";
import FileOrganizer from "./pages/FileOrganizer";
import CaseAssist from "./pages/CaseAssist";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Resources from "./pages/Resources";
import SteveDesk from "./pages/SteveDesk";
import FloatingNav from "./components/FloatingNav";
import { useAuth } from "@/_core/hooks/useAuth";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold text-navy-blue mb-4">Access Restricted</h1>
        <p className="text-charcoal-gray mb-8">This section is only available to authenticated clients.</p>
      </div>
    );
  }

  return <Component />;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/services" component={Services} />
          <Route path="/services/criminal-defense" component={CriminalDefense} />
          <Route path="/services/dui-defense" component={DUIDefense} />
          <Route path="/services/family-law" component={FamilyLaw} />
          <Route path="/resources" component={Resources} />
          <Route path="/steve" component={SteveDesk} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/tools/file-organizer" component={() => <ProtectedRoute component={FileOrganizer} />} />
          <Route path="/tools/case-assist" component={() => <ProtectedRoute component={CaseAssist} />} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
        <FloatingNav />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
