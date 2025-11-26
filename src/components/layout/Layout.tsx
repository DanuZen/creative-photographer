import { ReactNode } from "react";
import { HeaderNavigation } from "./HeaderNavigation";

interface LayoutProps {
  children: ReactNode;
  fullPage?: boolean;
}

export function Layout({ children, fullPage = false }: LayoutProps) {
  // Full page scroll layout (for About and other content pages) - Same grid, scrollable
  if (fullPage) {
    return (
      <div
        className="w-screen min-h-screen"
        style={{
          overscrollBehavior: "contain",
        }}
      >
        {/* Absolute Header */}
        <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 pt-8">
          <HeaderNavigation />
        </header>
        
        {/* Content with top padding for header */}
        <main className="pt-[140px] sm:pt-[160px] lg:pt-[180px] px-4 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
          {children}
        </main>
      </div>
    );
  }

  // Grid centered layout (for Home gallery)
  return (
    <div
      className="w-screen min-h-screen"
      style={{
        overscrollBehavior: "contain",
      }}
    >
      {/* Absolute Header */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 pt-8">
        <HeaderNavigation />
      </header>
      
      {/* Centered Gallery Content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
}
