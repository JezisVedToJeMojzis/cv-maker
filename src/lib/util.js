// Age in whole years from a YYYY-MM-DD birthdate; '' if empty/invalid.
export function calcAge(birth) {
  if (!birth) return '';
  const b = new Date(birth);
  if (isNaN(b.getTime())) return '';
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age >= 0 && age < 130 ? age : '';
}
