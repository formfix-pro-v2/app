export function saveUser(email: string) {
  localStorage.setItem("user_email", email);
}

export function getUser() {
  return localStorage.getItem("user_email") || "";
}

export function setPremium(value: boolean) {
  localStorage.setItem("premium", String(value));
}

export function isPremium() {
  return localStorage.getItem("premium") === "true";
}

export function saveProgress(value: number) {
  localStorage.setItem("progress", String(value));
}

export function getProgress() {
  return Number(localStorage.getItem("progress") || "0");
}
