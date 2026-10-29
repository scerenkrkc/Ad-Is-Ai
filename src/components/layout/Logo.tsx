import { GraduationCap } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/30">
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight text-slate-900">
          AD&İS AI
        </span>
        <span className="block text-[11px] font-medium text-slate-500">
          Denklik ve İntibak
        </span>
      </span>
    </Link>
  );
}
