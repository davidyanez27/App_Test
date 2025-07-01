import { BrowserRouter } from "react-router";
import { AppRouter } from "./router/AppRouter";
import { ScrollToTop } from "./components/common/ScrollToTop";

export const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRouter />
    </BrowserRouter>
  );
};
