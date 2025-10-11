import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate, Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const { token, login } = useAuth();
  const location = useLocation() as { state?: { from?: string } };
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { remember: true },
  });

  if (token) {
    const to = location.state?.from ?? "/home";
    return <Navigate to={to} replace />;
  }

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {

      await login({
        email: values.email,
        password: values.password,
        remember: values.remember,
      });

      const to = location.state?.from ?? "/home";
      navigate(to, { replace: true });
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-black">
      <div className="w-full max-w-md rounded-2xl shadow bg-white p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
  
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              aria-invalid={!!errors.email}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
         
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              id="password"
              type="password"
              aria-invalid={!!errors.password}
              className="mt-1 w-full rounded-xl border px-3 py-2"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>
      
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("remember")} />
            Remember me
          </label>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl py-2 font-medium bg-gray-900 text-white disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm">
          Need an account? <Link to="/register" className="underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
