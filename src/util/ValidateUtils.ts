import * as crypto from 'crypto';

export function validatePhone(phone: string) {
  return /(03|05|07|08|09)+([0-9]{8})\b/.test(phone);
}

export function validateLengthPwd(password: string) {
  return password.length >= 6;
}

export function MD5(password) {
  return crypto.createHash('sha256', password).digest('hex');
}
