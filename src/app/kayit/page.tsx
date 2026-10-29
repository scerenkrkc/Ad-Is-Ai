import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Kayıt Ol",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Yeni hesap oluştur"
      description="Öğrenci veya komisyon üyesi olarak kaydol. Rol seçimi sonraki yetkilendirme adımları için saklanır."
    >
      <RegisterForm />
    </AuthShell>
  );
}
