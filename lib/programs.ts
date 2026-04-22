export type UserType =
  | "menopause"
  | "office"
  | "incontinence";

type Day = {
  focus: string;
  tasks: string[];
};

type Program = {
  title: string;
  subtitle: string;
  modules: string[];
  days: Day[];
};

export function getProgram(type: UserType): Program {
  if (type === "menopause") {
    return {
      title: "Menopause Relief Program",
      subtitle:
        "Support hormones, reduce symptoms and restore confidence.",
      modules: [
        "Hot Flash Control",
        "Dry Eyes Support",
        "Joint Pain Relief",
        "Sleep Reset",
        "Energy Recovery",
      ],
      days: [
        {
          focus: "Cooling + Recovery",
          tasks: [
            "10 min walk",
            "Hydration goal",
            "Breathing reset",
          ],
        },
        {
          focus: "Joint Relief",
          tasks: [
            "Mobility routine",
            "Stretch hips",
            "Anti-inflammatory meal",
          ],
        },
        {
          focus: "Energy Reset",
          tasks: [
            "Morning sunlight",
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
        "Fix posture, reduce pain and undo desk damage.",
      modules: [
        "Neck Pain Fix",
        "Back Relief",
        "Posture Reset",
        "Hip Mobility",
        "Eye Strain Recovery",
      ],
      days: [
        {
          focus: "Neck Reset",
          tasks: [
            "Chin tucks x15",
            "Desk setup fix",
            "Hourly walk break",
          ],
        },
        {
          focus: "Back Recovery",
          tasks: [
            "Cat-Cow x15",
            "Glute bridge x20",
            "Stand every hour",
          ],
        },
        {
          focus: "Hip Mobility",
          tasks: [
            "Hip stretch",
            "Bodyweight squats",
            "Walk 20 min",
          ],
        },
      ],
    };
  }

  return {
    title: "Pelvic Confidence Program",
    subtitle:
      "Improve bladder control and pelvic strength.",
    modules: [
      "Stress Leakage Fix",
      "Urgency Control",
      "Pelvic Strength",
      "Postpartum Recovery",
      "Night Bathroom Reduction",
    ],
    days: [
      {
        focus: "Connection",
        tasks: [
          "Pelvic holds x10",
          "Breathing drill",
          "Reduce caffeine",
        ],
      },
      {
        focus: "Strength",
        tasks: [
          "Bridge holds",
          "Quick contractions",
          "Walk 15 min",
        ],
      },
      {
        focus: "Control",
        tasks: [
          "Urgency drill",
          "Core brace",
          "Hydration timing",
        ],
      },
    ],
  };
}
