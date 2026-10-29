import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Giriş Yap",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Hesabına giriş yap"
      description="Transkript analizi ve intibak ön değerlendirmesine kaldığın yerden devam et."
    >
      <Suspense fallback={<p className="text-sm text-slate-500">Form yükleniyor...</p>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
