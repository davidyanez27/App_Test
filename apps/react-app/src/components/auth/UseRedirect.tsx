import { Navigate } from "react-router-dom";
import { menuRoutes } from "../../router/router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

export const UseRedirect = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  console.log(status)

  return (
    <Navigate
      to={status === "authenticated" ? menuRoutes[0].to : menuRoutes[1].to}
    />
  );
};
