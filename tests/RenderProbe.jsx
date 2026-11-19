import { MemoryRouter, Route, Routes } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import MarketingLayout from "@/layout/MarketingLayout";
import HomePage from "@/features/home/pages/Homepage";
import ProductPage from "@/features/products/pages/ProductPage";
import WorkspacePage from "@/features/workspace/pages/WorkspacePage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function RenderProbe({ path }) {
  return (
    <MotionConfig reducedMotion="always">
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/workspace" element={<WorkspacePage />} />
        </Routes>
      </MemoryRouter>
    </MotionConfig>
  );
}
