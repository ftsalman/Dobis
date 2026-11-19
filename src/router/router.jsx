import { BookingPage } from "@/features/booking/pages/BookingPage";
import { ContactPage } from "@/features/contact/pages/ContactPage";
import { Homepage } from "@/features/home/pages/Homepage";
import { PricingPage } from "@/features/pricing/pages/PricingPage";
import { Layout } from "@/layout/Layout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/book-demo", element: <BookingPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
