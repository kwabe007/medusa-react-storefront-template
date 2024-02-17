import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <Navbar />
      </header>
      <main className="container flex justify-center flex-grow mx-auto mt-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}