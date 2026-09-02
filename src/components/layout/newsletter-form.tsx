"use client";

import { Send } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5"
    >
      <input
        type="email"
        required
        placeholder="Enter your email"
        className="h-9 w-full bg-transparent px-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400"
      >
        <Send size={14} />
      </button>
    </form>
  );
}