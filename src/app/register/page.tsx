import { Suspense } from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#030303]">
          <div className="text-sm text-slate-500">Loading...</div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}