"use client";

import { Mail } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { TextField } from "@/components/ui/TextField";
import { primaryButtonClass, textLinkClass } from "@/components/ui/styles";
import { hasRegisteredEmail } from "@/lib/mock-auth";
import { validateEmail } from "@/lib/validation";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [knownAccount, setKnownAccount] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validateEmail(email);
    setError(message);
    if (message) return;
    setKnownAccount(hasRegisteredEmail(email));
    setSent(true);
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-3 text-sm leading-6 text-indigo-900">
          {knownAccount
            ? "Sıfırlama bağlantısı bu simülasyonda e-posta kutusuna gönderilmiş kabul edildi. Gerçek posta entegrasyonu sonraki aşamada eklenecek."
            : "Bu e-posta ile kayıtlı bir hesap bulunamadı. Yine de gerçek bir sistemde, hesabın varlığı açıklanmadan aynı bilgi gösterilir."}
        </p>
        <Link href="/giris" className={`${primaryButtonClass} w-full`}>
          Giriş ekranına dön
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <TextField
        id="reset-email"
        label="E-posta"
        type="email"
        value={email}
        onChange={setEmail}
        error={error}
        autoComplete="email"
        placeholder="ornek@universite.edu.tr"
        icon={<Mail className="h-4 w-4" aria-hidden="true" />}
      />
      <button type="submit" className={`${primaryButtonClass} w-full`}>
        Sıfırlama bağlantısı gönder
      </button>
      <p className="text-center text-sm text-slate-600">
        Şifreni hatırladın mı?{" "}
        <Link href="/giris" className={textLinkClass}>
          Giriş yap
        </Link>
      </p>
    </form>
  );
}
