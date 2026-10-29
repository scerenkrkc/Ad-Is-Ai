export type UserRole = "ogrenci" | "komisyon";

export type PublicUser = {
  fullName: string;
  email: string;
  role: UserRole;
};

export type StoredUser = PublicUser & {
  password: string;
};

export const roleLabels: Record<UserRole, string> = {
  ogrenci: "Öğrenci",
  komisyon: "Komisyon Üyesi",
};
