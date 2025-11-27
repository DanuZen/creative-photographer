import { ReactNode } from "react";
import { HeaderNavigation } from "./HeaderNavigation";

interface LayoutProps {
  children: ReactNode;
  fullPage?: boolean;
}

export function Layout({ children, fullPage = false }: LayoutProps) {
  // Full page scroll layout (for About and other content pages)
  if (fullPage) {
    return (
      <>
        <HeaderNavigation />
        <div className="w-full min-h-screen pt-[120px] sm:pt-[130px] md:pt-[140px]">
          <div className="mx-auto px-4 md:px-10 lg:max-w-[1200px] lg:px-0">
            <main>{children}</main>
          </div>
        </div>
      </>
    );
  }

  // Grid centered layout (for Home gallery)
  return (
    <>
      <HeaderNavigation />
      <div
        className="grid w-screen min-h-screen overflow-y-auto md:h-screen md:max-h-screen md:overflow-hidden items-start md:items-center layout-home"
        style={{
          gridTemplateRows: "auto 1fr",
          overscrollBehavior: "contain",
        }}
      >
        <style>{`
          .layout-home {
            grid-template-columns: [full-start] 1rem [content-start] 1fr [content-end] 1rem [full-end];
          }
          @media (min-width: 768px) {
            .layout-home {
              grid-template-columns: [full-start] 2.5rem [content-start] 1fr [content-end] 2.5rem [full-end];
              grid-template-rows: 1fr minmax(500px, calc(100vh - 200px)) 1fr;
            }
          }
          @media (min-width: 1024px) {
            .layout-home {
              grid-template-columns: [full-start] 1fr [content-start] min(1200px, 100%) [content-end] 1fr [full-end];
              grid-template-rows: 1fr min(740px, calc(100vh - 260px)) 1fr;
            }
          }
        `}</style>
        <div
          className="flex flex-col pointer-events-auto"
          style={{
            gridColumn: "content-start / content-end",
            gridRow: "2",
          }}
        >
          <main className="flex-shrink-0">{children}</main>
        </div>
      </div>
    </>
  );
}
