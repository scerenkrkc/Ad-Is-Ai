import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Şifremi Unuttum",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Şifreni sıfırla"
      description="Kayıtlı e-posta adresini gir. Bu sürümde bağlantı gönderimi simüle edilir."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
