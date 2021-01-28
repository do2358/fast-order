export function validatePhone(phone: string) {
  return /(03|05|07|08|09)+([0-9]{8})\b/.test(phone);
}
