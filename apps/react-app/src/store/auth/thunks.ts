import type {
  SignInFormDataInterface,
  SignUpFormDataInterface,
} from "../../Interfaces";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "./authSlice";
import { type AppDispatch } from "../store";
import { InventoryBackend } from "../../api/Index";

export const startLogin = (user: SignInFormDataInterface) => {
  const { email, password } = user;
  return async (dispatch: AppDispatch) => {
    // dispatch(onChecking());
    try {
      const { data } = await InventoryBackend.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.user.name, email: data.user.email }));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    } catch (error: any) {
      dispatch(onLogout(error));
    }
  };
};

export const startRegister = (user: SignUpFormDataInterface) => {
  const { email, password, first_name, last_name } = user;
  return async (dispatch: AppDispatch) => {
    dispatch(onChecking());
    try {
      const { data } = await InventoryBackend.post("/auth/register", {
        email,
        password,
        first_name,
        last_name,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", `${Date.now()}`);
      dispatch(onLogin({ name: data.name, id: data.id }));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    } catch (error: any) {
      dispatch(onLogout(error));
    }
  };
};

export const starLogout = () => {
  return async (dispatch: AppDispatch) => {
    localStorage.clear();
    dispatch(onLogout());
  };
};
