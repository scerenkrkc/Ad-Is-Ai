const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string) {
  const email = value.trim();
  if (!email) return "E-posta adresi gerekli.";
  if (!emailPattern.test(email)) return "Geçerli bir e-posta adresi girin.";
  return "";
}

export function validatePassword(value: string) {
  if (!value) return "Şifre gerekli.";
  if (value.length < 8) return "Şifre en az 8 karakter olmalı.";
  if (!/[A-Za-zÇĞİÖŞÜçğıöşü]/.test(value) || !/\d/.test(value)) {
    return "Şifre en az bir harf ve bir rakam içermeli.";
  }
  return "";
}

export function validateFullName(value: string) {
  const name = value.trim();
  if (!name) return "Ad soyad gerekli.";
  if (name.length < 5) return "Ad soyad en az 5 karakter olmalı.";
  if (!name.includes(" ")) return "Ad ve soyadı birlikte girin.";
  return "";
}
