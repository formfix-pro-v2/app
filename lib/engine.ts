
import { QuizAnswers } from "./types";

export function generatePlans(a: QuizAnswers): string[] {
  const result = new Set<string>();

  if (a.goal === "fat_loss") result.add("Belly Fat after 40");
  if (a.goal === "energy") result.add("Menopause Energy Reset");
  if (a.goal === "pain_relief") result.add("Sciatica Relief");
  if (a.goal === "core") result.add("Pelvic Floor Recovery");
  if (a.goal === "posture") result.add("Office Posture Reset");

  if (a.area === "back") result.add("Lower Back Rescue");
  if (a.area === "belly") result.add("Slim Waist Reset");
  if (a.area === "pelvic") result.add("Pelvic Floor Recovery");
  if (a.area === "stress") result.add("Mood Boost Motion");

  if (a.time === "7") result.add("7 Min Busy Mom Workout");
  if (a.time === "10") result.add("10 Min Morning Reset");
  if (a.time === "20") result.add("Full Body Tone");

  return Array.from(result).slice(0, 3);
}
