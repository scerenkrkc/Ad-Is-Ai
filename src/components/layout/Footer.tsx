import { Logo } from "@/components/layout/Logo";
import Link from "next/link";

const groups = [
  {
    title: "Ürün",
    links: [
      { href: "/", label: "Ana Sayfa" },
      { href: "/transkript", label: "Transkript Yükle" },
      { href: "/hakkimizda", label: "Hakkımızda" },
    ],
  },
  {
    title: "Hesap",
    links: [
      { href: "/giris", label: "Giriş Yap" },
      { href: "/kayit", label: "Kayıt Ol" },
      { href: "/sifremi-unuttum", label: "Şifremi Unuttum" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
            Akademik Denklik ve İntibak Sistemi, yatay geçiş, dikey geçiş ve çift
            anadal başvurularında transkript analizini hızlandırmak için tasarlandı.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-slate-900">{group.title}</h2>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition hover:text-indigo-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">
          © 2026 AD&İS AI. Akademik kullanım için ön
          değerlendirme arayüzü.
        </p>
      </div>
    </footer>
  );
}
