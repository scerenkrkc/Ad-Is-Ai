import type { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({ title, description, children }: AuthShellProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(79,70,229,0.18),_transparent_55%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-indigo-950/10 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
