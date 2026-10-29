"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { TextField } from "@/components/ui/TextField";
import { primaryButtonClass, textLinkClass } from "@/components/ui/styles";
import { DEMO_USER, readRememberedEmail, writeRememberedEmail } from "@/lib/mock-auth";
import { validateEmail, validatePassword } from "@/lib/validation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const registered = searchParams.get("kayit") === "basarili";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const remembered = readRememberedEmail();
    if (remembered) {
      setEmail(remembered);
      setRemember(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const result = login(email, password);
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.message });
      return;
    }

    writeRememberedEmail(remember ? email.trim().toLowerCase() : null);
    router.push("/panel");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {registered ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Hesabınız oluşturuldu. Giriş yaparak devam edebilirsiniz.
        </p>
      ) : null}

      <TextField
        id="login-email"
        label="E-posta"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        autoComplete="email"
        placeholder="ornek@universite.edu.tr"
        icon={<Mail className="h-4 w-4" aria-hidden="true" />}
      />

      <TextField
        id="login-password"
        label="Şifre"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="current-password"
        placeholder="En az 8 karakter"
        icon={<Lock className="h-4 w-4" aria-hidden="true" />}
        trailing={
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <div className="flex items-center justify-between gap-3 text-sm">
        <label className="inline-flex items-center gap-2 text-slate-700">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Beni hatırla
        </label>
        <Link href="/sifremi-unuttum" className={textLinkClass}>
          Şifremi unuttum
        </Link>
      </div>

      {errors.form ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {errors.form}
        </p>
      ) : null}

      <button type="submit" className={`${primaryButtonClass} w-full`} disabled={submitting}>
        {submitting ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Hesabın yok mu?{" "}
        <Link href="/kayit" className={textLinkClass}>
          Hemen kayıt ol
        </Link>
      </p>

      <p className="rounded-xl bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-500">
        Demo hesap: {DEMO_USER.email} · şifre {DEMO_USER.password}
      </p>
    </form>
  );
}
