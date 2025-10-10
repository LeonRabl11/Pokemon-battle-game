import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
