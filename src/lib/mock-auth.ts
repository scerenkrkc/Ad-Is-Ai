import type { PublicUser, StoredUser } from "@/types/user";

const USERS_KEY = "adis.users";
const SESSION_KEY = "adis.session";
const REMEMBER_KEY = "adis.rememberEmail";

export const DEMO_USER: StoredUser = {
  fullName: "Demo Öğrenci",
  email: "demo.ogrenci@universite.edu.tr",
  password: "Demo1234",
  role: "ogrenci",
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export function getUsers(): StoredUser[] {
  if (!canUseStorage()) return [];

  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }

  try {
    const parsed = JSON.parse(raw) as StoredUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
      return [DEMO_USER];
    }
    return parsed;
  } catch {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([DEMO_USER]));
    return [DEMO_USER];
  }
}

export function registerUser(
  input: StoredUser,
): { ok: true } | { ok: false; message: string } {
  const users = getUsers();
  const email = input.email.trim().toLowerCase();
  const exists = users.some((user) => user.email.toLowerCase() === email);

  if (exists) {
    return {
      ok: false,
      message: "Bu e-posta adresi ile kayıtlı bir hesap zaten var.",
    };
  }

  window.localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, { ...input, email }]),
  );
  return { ok: true };
}

export function loginUser(
  email: string,
  password: string,
): { ok: true; user: PublicUser } | { ok: false; message: string } {
  const found = getUsers().find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );

  if (!found || found.password !== password) {
    return { ok: false, message: "E-posta veya şifre hatalı." };
  }

  const user: PublicUser = {
    fullName: found.fullName,
    email: found.email,
    role: found.role,
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { ok: true, user };
}

export function logoutUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
}

export function readSession(): PublicUser | null {
  if (!canUseStorage()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PublicUser;
  } catch {
    return null;
  }
}

export function readRememberedEmail() {
  if (!canUseStorage()) return "";
  return window.localStorage.getItem(REMEMBER_KEY) ?? "";
}

export function writeRememberedEmail(email: string | null) {
  if (!canUseStorage()) return;
  if (email) window.localStorage.setItem(REMEMBER_KEY, email);
  else window.localStorage.removeItem(REMEMBER_KEY);
}

export function hasRegisteredEmail(email: string) {
  return getUsers().some(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
  );
}
