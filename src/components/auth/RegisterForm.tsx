"use client";

import { Eye, EyeOff, GraduationCap, Lock, Mail, UserRound, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { TextField } from "@/components/ui/TextField";
import { primaryButtonClass, textLinkClass } from "@/components/ui/styles";
import { registerUser } from "@/lib/mock-auth";
import { validateEmail, validateFullName, validatePassword } from "@/lib/validation";
import type { UserRole } from "@/types/user";

const roles: {
  id: UserRole;
  label: string;
  hint: string;
  icon: typeof GraduationCap;
}[] = [
  {
    id: "ogrenci",
    label: "Öğrenci",
    hint: "Transkript yükler ve ön raporu görür.",
    icon: GraduationCap,
  },
  {
    id: "komisyon",
    label: "Komisyon Üyesi",
    hint: "Başvuruları ve intibak önerilerini inceler.",
    icon: Users,
  },
];

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    form?: string;
  }>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      fullName: validateFullName(fullName),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword:
        confirmPassword !== password ? "Şifre tekrarı eşleşmiyor." : confirmPassword ? "" : "Şifre tekrarını girin.",
      role: role ? "" : "Bir kullanıcı rolü seçin.",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    const result = registerUser({
      fullName: fullName.trim(),
      email,
      password,
      role: role as UserRole,
    });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ form: result.message });
      return;
    }

    router.push("/giris?kayit=basarili");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <TextField
        id="register-fullName"
        label="Ad Soyad"
        value={fullName}
        onChange={setFullName}
        error={errors.fullName}
        autoComplete="name"
        placeholder="Ayşe Yılmaz"
        icon={<UserRound className="h-4 w-4" aria-hidden="true" />}
      />
      <TextField
        id="register-email"
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
        id="register-password"
        label="Şifre"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={setPassword}
        error={errors.password}
        autoComplete="new-password"
        placeholder="En az 8 karakter, harf ve rakam"
        icon={<Lock className="h-4 w-4" aria-hidden="true" />}
        trailing={
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
      <TextField
        id="register-confirmPassword"
        label="Şifre Tekrarı"
        type={showConfirm ? "text" : "password"}
        value={confirmPassword}
        onChange={setConfirmPassword}
        error={errors.confirmPassword}
        autoComplete="new-password"
        placeholder="Şifreyi yeniden girin"
        icon={<Lock className="h-4 w-4" aria-hidden="true" />}
        trailing={
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
            onClick={() => setShowConfirm((value) => !value)}
            aria-label={showConfirm ? "Şifre tekrarını gizle" : "Şifre tekrarını göster"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />

      <fieldset>
        <legend className="text-sm font-medium text-slate-800">Kullanıcı rolü</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {roles.map((item) => {
            const selected = role === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                aria-pressed={selected}
                className={`rounded-2xl border px-3 py-3 text-left transition ${
                  selected
                    ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                    : "border-slate-200 bg-white hover:border-indigo-200"
                }`}
              >
                <Icon className={`h-4 w-4 ${selected ? "text-indigo-700" : "text-slate-500"}`} aria-hidden="true" />
                <span className="mt-2 block text-sm font-semibold text-slate-900">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-slate-500">{item.hint}</span>
              </button>
            );
          })}
        </div>
        {errors.role ? <p className="mt-1.5 text-sm text-rose-600">{errors.role}</p> : null}
      </fieldset>

      {errors.form ? (
        <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">
          {errors.form}
        </p>
      ) : null}

      <button type="submit" className={`${primaryButtonClass} w-full`} disabled={submitting}>
        {submitting ? "Kaydediliyor..." : "Kayıt Ol"}
      </button>

      <p className="text-center text-sm text-slate-600">
        Zaten hesabın var mı?{" "}
        <Link href="/giris" className={textLinkClass}>
          Giriş yap
        </Link>
      </p>
    </form>
  );
}
