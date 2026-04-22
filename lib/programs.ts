export type UserType =
  | "menopause"
  | "office"
  | "incontinence";

export function getProgram(type: UserType) {
  if (type === "menopause") {
    return {
      title: "Menopause Recovery System",
      subtitle: "Support hormones, reduce symptoms, feel younger.",
      modules: [
        "Hot Flash Control",
        "Dry Eyes Support",
        "Joint Pain Relief",
        "Energy Reset",
        "Belly Fat Balance"
      ]
    };
  }

  if (type === "office") {
    return {
      title: "Desk Worker Recovery",
      subtitle: "Undo office damage fast.",
      modules: [
        "Neck Pain Fix",
        "Lower Back Reset",
        "Forward Head Posture",
        "Eye Strain Relief",
        "Hip Mobility Restore"
      ]
    };
  }

  return {
    title: "Pelvic Confidence System",
    subtitle: "Restore control naturally.",
    modules: [
      "Stress Leakage Fix",
      "Urgency Control",
      "Pelvic Strength",
      "Postpartum Recovery",
      "Night Bathroom Reduction"
    ]
  };
}
