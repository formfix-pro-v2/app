export type UserType = "menopause" | "office" | "incontinence";

export type ProgramDay = {
  title: string;
  focus: string;
  tasks: string[];
};

export type ProgramData = {
  title: string;
  subtitle: string;
  modules: string[];
  days: ProgramDay[];
};

export function getProgram(type: UserType): ProgramData {
  if (type === "menopause") {
    return {
      title: "Menopause Relief System",
      subtitle:
        "Designed to reduce common menopause symptoms and rebuild confidence.",
      modules: [
        "Hot Flash Control",
        "Dry Eyes Support",
        "Joint Pain Relief",
        "Sleep Reset",
        "Belly Fat Balance",
      ],
      days: [
        {
          title: "Day 1",
          focus: "Cooling + Recovery",
          tasks: [
            "10 min walk",
            "Breathing reset 5 min",
            "Hydration target: 2L",
          ],
        },
        {
          title: "Day 2",
          focus: "Joint Relief",
          tasks: [
            "Mobility flow 12 min",
            "Omega-rich meal",
            "Stretch hips 5 min",
          ],
        },
        {
          title: "Day 3",
          focus: "Energy Rebuild",
          tasks: [
            "Morning sunlight 10 min",
            "Core activation",
            "Low sugar day",
          ],
        },
      ],
    };
  }

  if (type === "office") {
    return {
      title: "Office Worker Recovery",
      subtitle:
        "Undo desk posture damage, stiffness and daily pain fast.",
      modules: [
        "Neck Pain Fix",
        "Forward Head Reset",
        "Lower Back Relief",
        "Tight Hips Repair",
        "Eye Strain Recovery",
      ],
      days: [
        {
          title: "Day 1",
          focus: "Neck Reset",
          tasks: [
            "Chin tucks x15",
            "Desk posture setup",
            "Walk break every hour",
          ],
        },
        {
          title: "Day 2",
          focus: "Back Recovery",
          tasks: [
            "Cat-Cow x15",
            "Glute bridges x20",
            "Stand 5 min every hour",
          ],
        },
        {
          title: "Day 3",
          focus: "Hip Mobility",
          tasks: [
            "Hip flexor stretch",
            "Bodyweight squats x20",
            "Walk 20 min",
          ],
        },
      ],
    };
  }

  return {
    title: "Pelvic Confidence Program",
    subtitle:
      "Support pelvic strength and bladder control naturally.",
    modules: [
      "Stress Leakage Fix",
      "Urgency Control",
      "Pelvic Floor Strength",
      "Postpartum Recovery",
      "Night Bathroom Reduction",
    ],
    days: [
      {
        title: "Day 1",
        focus: "Connection",
        tasks: [
          "Pelvic floor holds x10",
          "Breathing 5 min",
          "Reduce caffeine",
        ],
      },
      {
        title: "Day 2",
        focus: "Strength",
        tasks: [
          "Bridge hold x12",
          "Quick contractions x10",
          "Walk 15 min",
        ],
      },
      {
        title: "Day 3",
        focus: "Control",
        tasks: [
          "Urgency breathing drill",
          "Core brace x10",
          "Hydration timing",
        ],
      },
    ],
  };
}
