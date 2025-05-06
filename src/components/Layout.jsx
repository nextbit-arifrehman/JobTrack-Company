import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router";

const Layout = ({ children, title = "JobTrack" }) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title based on provided title prop
    document.title = title;
    
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [title, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;