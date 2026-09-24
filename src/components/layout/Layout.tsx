import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* پس‌زمینه تزئینی */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* دایره نارنجی */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-3xl animate-float" />
        {/* دایره بنفش */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        {/* دایره وسط */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;