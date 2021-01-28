function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomOtp(): string {
  const NUMBER = '0123456789';
  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += NUMBER[getRndInteger(0, NUMBER.length - 1)];
  }
  return otp;
}

export function getExpire(date: Date, minutes = 0): Date {
  return new Date(date.getTime() + minutes * 60000);
}
