import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider"; 
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Battle from "./pages/Battle";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded-2xl shadow bg-white text-center space-y-4">
        <h1 className="text-2xl font-semibold">Home</h1>
        <div className="flex gap-4 justify-center">
          <Link className="underline" to="/login">
            Login
          </Link>
          <Link className="underline" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/battle" replace />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/battle" element={<Battle />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
