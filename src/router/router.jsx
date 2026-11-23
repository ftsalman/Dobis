import { AppPage } from "@/features/apps/pages/AppPage";
import { AppsPage } from "@/features/apps/pages/AppsPage";
import { BookingPage } from "@/features/booking/pages/BookingPage";
import { ContactPage } from "@/features/contact/pages/ContactPage";
import { Homepage } from "@/features/home/pages/Homepage";
import { IndustryPage } from "@/features/industries/pages/IndustryPage";
import { PricingPage } from "@/features/pricing/pages/PricingPage";
import { ServicesPage } from "@/features/services/pages/ServicesPage";
import { Layout } from "@/layout/Layout";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/apps", element: <AppsPage /> },
      { path: "/apps/:appId", element: <AppPage /> },
      { path: "/industries/:industryId", element: <IndustryPage /> },
      { path: "/services", element: <ServicesPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/book-demo", element: <BookingPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
