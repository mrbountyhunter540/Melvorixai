import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#030303]">
          <div className="text-sm text-slate-500">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}