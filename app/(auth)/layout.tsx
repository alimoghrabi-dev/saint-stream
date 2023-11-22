import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#1a1a1a] relative">
      {children}
    </main>
  );
};

export default Layout;
