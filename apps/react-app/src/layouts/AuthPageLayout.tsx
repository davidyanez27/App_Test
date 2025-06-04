import { Outlet } from "react-router";
import { GridShape, ThemeToggleTwo } from "../components";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthPageLayout = ({children}:AuthLayoutProps) => {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <Outlet/>
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <h1 className="mb-2 font-semibold text-white/90 text-title-sm sm:text-title-md">
                Mechventory
              </h1>
              <p className="text-center text-gray-400 dark:text-white/60">
                Built for Flow. Designed for Scale.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeToggleTwo/>
        </div>
      </div>
    </div>
  );
}
