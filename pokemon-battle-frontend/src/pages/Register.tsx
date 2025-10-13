import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof schema>;

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Registration failed";
}

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues): Promise<void> => {
    setServerError(null);
    try {
      await registerUser({ email: values.email, password: values.password });
      navigate("/login");
    } catch (err: unknown) {
      setServerError(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-white bg-gradient-to-b from-purple-900 via-blue-800 to-blue-600">
      <div className="w-full max-w-md rounded-2xl shadow bg-gray-800 p-6 space-y-4">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl border px-3 py-2"
              {...register("confirm")}
            />
            {errors.confirm && (
              <p className="text-xs text-red-600 mt-1">
                {errors.confirm.message}
              </p>
            )}
          </div>

          {serverError && <p className="text-sm text-red-600">{serverError}</p>}

          <button
            disabled={isSubmitting}
            className="w-full rounded-xl py-2 font-medium bg-gradient-to-r from-white via-orange-200 to-yellow-200 text-black disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Sign up"}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
