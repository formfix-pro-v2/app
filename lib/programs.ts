export type UserType =
  | "menopause"
  | "office"
  | "incontinence";

export function getProgram(type: UserType) {
  if (type === "menopause") {
    return {
      title: "Menopause Relief Program",
      subtitle: "Balance hormones, reduce symptoms, regain confidence.",
      modules: [
        "Dry Eyes Recovery",
        "Joint Pain Relief",
        "Hot Flash Control",
        "Energy Rebuild",
        "Belly Fat Reset"
      ]
    };
  }

  if (type === "office") {
    return {
      title: "Office Worker Recovery",
      subtitle: "Undo desk damage and restore posture.",
      modules: [
        "Neck Pain Fix",
        "Lower Back Relief",
        "Tight Hips Reset",
        "Eye Strain Recovery",
        "Shoulder Release"
      ]
    };
  }

  return {
    title: "Pelvic Confidence Program",
    subtitle: "Regain bladder control and pelvic strength.",
    modules: [
      "Stress Leakage Fix",
      "Urgency Control",
      "Pelvic Strength Builder",
      "Postpartum Recovery",
      "Night Control Reset"
    ]
  };
}
