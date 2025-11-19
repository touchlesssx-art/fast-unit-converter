import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 - Page Not Found | ConverterX</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to ConverterX homepage to access our currency and unit conversion tools." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Don't worry, you can still access all our conversion tools from the links below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              to="/"
              className="flex flex-col items-center gap-3 p-6 bg-gradient-card border border-border/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-xl">
                <Home className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Home</h3>
                <p className="text-sm text-muted-foreground">Start here</p>
              </div>
            </Link>

            <Link
              to="/units"
              className="flex flex-col items-center gap-3 p-6 bg-gradient-card border border-border/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-xl">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Unit Converter</h3>
                <p className="text-sm text-muted-foreground">Convert units</p>
              </div>
            </Link>

            <Link
              to="/category/currency"
              className="flex flex-col items-center gap-3 p-6 bg-gradient-card border border-border/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-3 bg-primary/10 rounded-xl">
                <ArrowLeft className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Currency</h3>
                <p className="text-sm text-muted-foreground">Convert currency</p>
              </div>
            </Link>
          </div>

          <div className="bg-muted/50 rounded-2xl p-6">
            <h3 className="font-semibold mb-3 text-foreground">Popular Conversions</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/convert/length/meter-to-kilometer" className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                Meter to Kilometer
              </Link>
              <Link to="/convert/weight/kilogram-to-pound" className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                Kg to Lb
              </Link>
              <Link to="/convert/temperature/celsius-to-fahrenheit" className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                Celsius to Fahrenheit
              </Link>
              <Link to="/currency/USD" className="px-4 py-2 bg-background border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                USD Converter
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
