import { createBrowserRouter } from "react-router-dom";
import { HomePage, SignIn, SignUp } from "../pages";
import { AppLayout } from "../layouts";
import { UseRedirect } from "../components";


export const menuRoutes = [
  {
    to: "/dashboard",
    icon: "fa-solid fa-spell-check",
    title: "SignUp",
    description: "Page to loging into the app",
    component: <HomePage />,
  },
  {
    to: "/singin",
    icon: "fa-solid fa-spell-check",
    title: "SignIn",
    description: "Page to loging into the app",
    component: <SignIn />,
  },
  {
    to: "/singup",
    icon: "fa-solid fa-spell-check",
    title: "SignUp",
    description: "Page to loging into the app",
    component: <SignUp />,
  },
];

export const router = createBrowserRouter([
  {
    path: "/singin",
    element: <SignIn />,
  },
  {
    path: "/singup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: (
          <UseRedirect/>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <SignIn />,
  },
]);
