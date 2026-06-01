import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { CustomerHome } from "./pages/CustomerHome";
import { RestaurantDetails } from "./pages/RestaurantDetails";
import { Payment } from "./pages/Payment";
import { Confirmation } from "./pages/Confirmation";
import { OwnerDashboard } from "./pages/OwnerDashboard";

import { AdminPortal } from "./pages/AdminPortal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Login },
      { path: "signup", Component: Signup },
      { path: "home", Component: CustomerHome },
      { path: "restaurant/:id", Component: RestaurantDetails },
      { path: "payment", Component: Payment },
      { path: "confirmation", Component: Confirmation },
      { path: "owner", Component: OwnerDashboard }
    ]
  },
  {
    path: "/admin",
    Component: AdminPortal
  }
]);
