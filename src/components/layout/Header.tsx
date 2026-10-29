"use client";

import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { useAuth } from "@/components/providers/AuthProvider";
import { primaryButtonClass, secondaryButtonClass } from "@/components/ui/styles";
import { roleLabels } from "@/types/user";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/transkript", label: "Transkript" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link href="/panel" className="px-2 text-right">
                <span className="block text-sm font-semibold text-slate-900">
                  {user.fullName}
                </span>
                <span className="block text-xs text-indigo-700">
                  {roleLabels[user.role]}
                </span>
              </Link>
              <button type="button" onClick={handleLogout} className={secondaryButtonClass}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link href="/giris" className={secondaryButtonClass}>
                Giriş Yap
              </Link>
              <Link href="/kayit" className={primaryButtonClass}>
                Kayıt Ol
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {user ? (
              <>
                <Link href="/panel" className={primaryButtonClass}>
                  Panele Git
                </Link>
                <button type="button" onClick={handleLogout} className={secondaryButtonClass}>
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <Link href="/giris" className={secondaryButtonClass}>
                  Giriş Yap
                </Link>
                <Link href="/kayit" className={primaryButtonClass}>
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
