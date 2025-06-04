import { HelmetProvider } from "react-helmet-async"


interface AppWrapperProps {
    children: React.ReactNode;
}

export const AppWrapper = ({children}:AppWrapperProps) => {
  return (
    <HelmetProvider>{ children }</HelmetProvider>
  )
}
