import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";

const RoutesConfig = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                {/* Protected route */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutesConfig;
