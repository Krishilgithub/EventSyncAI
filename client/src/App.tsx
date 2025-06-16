import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Contact = lazy(() => import("./pages/Contact"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Signin = lazy(() => import("./pages/Signin"));
const Signup = lazy(() => import("./pages/Signup"));

// Layout components
const Navbar = lazy(() => import("./components/layout/Navbar"));
const Footer = lazy(() => import("./components/layout/Footer"));

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<div className="h-16 bg-primary animate-pulse" />}>
          <Navbar />
        </Suspense>

        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-64 bg-dark animate-pulse" />}>
          <Footer />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
