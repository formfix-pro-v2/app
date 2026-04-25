export type Exercise = {
  name: string;
  image: string;
  start: string;
  end: string;
  why: string;
  reps: string;
  seconds: number;
};

export type DayPlan = {
  day?: number;
  title: string;
  theme: string;
  description: string;
  exercises: Exercise[];
};

const img = (file: string) =>
  `/app/exercises/${file}`;

/* MASTER EXERCISE LIBRARY */
const library: Exercise[] = [
  {
    name: "Bridge Lift",
    image: img("bridge.jpg"),
    start:
      "Lie on back, knees bent, feet flat.",
    end:
      "Lift hips upward and squeeze glutes.",
    why:
      "Strengthens glutes, pelvic floor and low back.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Cat-Cow Flow",
    image: img("catcow.jpg"),
    start:
      "Hands and knees.",
    end:
      "Alternate arching and rounding spine.",
    why:
      "Improves spinal mobility and stiffness.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Wall Posture Reset",
    image: img("wallposture.jpg"),
    start:
      "Stand against wall.",
    end:
      "Lengthen spine, tuck chin gently.",
    why:
      "Restores posture and alignment.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Chair Squat",
    image: img("chairsquat.jpg"),
    start:
      "Stand in front of chair.",
    end:
      "Lower hips back then rise.",
    why:
      "Builds leg strength safely.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "March in Place",
    image: img("march.jpg"),
    start:
      "Stand tall.",
    end:
      "Lift knees rhythmically.",
    why:
      "Boosts circulation and metabolism.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Bird Dog",
    image: img("birddog.jpg"),
    start:
      "Hands and knees.",
    end:
      "Extend opposite arm and leg.",
    why:
      "Core balance and spinal support.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Pelvic Tilt",
    image: img("pelvictilt.jpg"),
    start:
      "Lie down knees bent.",
    end:
      "Flatten lower back gently.",
    why:
      "Great for pelvic floor and back comfort.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Child Pose Reach",
    image: img("childpose.jpg"),
    start:
      "Kneel, hips to heels.",
    end:
      "Arms forward and relax chest.",
    why:
      "Calms nervous system and eases back tension.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Thoracic Opener",
    image: img("thoracic.jpg"),
    start:
      "Hands behind head.",
    end:
      "Open elbows wide and lift chest.",
    why:
      "Relieves desk posture tightness.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Standing Twist",
    image: img("twist.jpg"),
    start:
      "Stand relaxed.",
    end:
      "Rotate torso side to side.",
    why:
      "Improves waist mobility.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Heel Slides",
    image: img("heelslide.jpg"),
    start:
      "Lie on back.",
    end:
      "Slide heel out then in.",
    why:
      "Core activation and hip comfort.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Calf Raise",
    image: img("calfraise.jpg"),
    start:
      "Stand with support.",
    end:
      "Rise to toes slowly.",
    why:
      "Improves circulation.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Arm Sweep Breath",
    image: img("armsweep.jpg"),
    start:
      "Arms by sides.",
    end:
      "Lift arms overhead with inhale.",
    why:
      "Stress relief and rib mobility.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Glute Squeeze",
    image: img("glutesqueeze.jpg"),
    start:
      "Stand tall.",
    end:
      "Squeeze glutes 5 sec / release.",
    why:
      "Pelvic support and posture.",
    reps: "2 min",
    seconds: 120,
  },
  {
    name: "Side Leg Lift",
    image: img("sideleg.jpg"),
    start:
      "Lie on side.",
    end:
      "Lift top leg slowly.",
    why:
      "Hip stability and balance.",
    reps: "2 min",
    seconds: 120,
  },
];

/* ROTATION */
function rotateExercises(
  day: number,
  count: number
): Exercise[] {
  const arr: Exercise[] = [];

  for (
    let i = 0;
    i < count;
    i++
  ) {
    arr.push(
      library[
        (day - 1 + i) %
          library.length
      ]
    );
  }

  return arr;
}

/* MAIN BUILDER */
export function buildPlan(
  day: number,
  symptoms: string[] = [],
  selectedTime = "10 min"
): DayPlan {
  let count = 5;

  if (
    selectedTime ===
    "20 min"
  )
    count = 10;

  if (
    selectedTime ===
    "30+ min"
  )
    count = 15;

  let title =
    "Hormone Balance Reset";

  let theme =
    "Energy + Posture + Daily Wellness";

  let description =
    "Structured daily movement plan to reduce symptoms and rebuild confidence.";

  if (
    symptoms.includes(
      "Poor sleep"
    ) ||
    symptoms.includes(
      "Hot flashes"
    )
  ) {
    title =
      "Sleep + Cooling Recovery";

    theme =
      "Evening nervous system reset";

    description =
      "Designed for sleep support, overheating reduction and calm evenings.";
  }

  if (
    symptoms.includes(
      "Weight gain"
    )
  ) {
    title =
      "Metabolism Sculpt";

    theme =
      "Lean shape + calorie support";

    description =
      "Strength + movement focused plan for belly fat and energy.";
  }

  if (
    symptoms.includes(
      "Joint pain"
    )
  ) {
    title =
      "Joint Ease Mobility";

    theme =
      "Pain reduction + flexibility";

    description =
      "Low impact movement for hips, knees, shoulders and stiffness.";
  }

  if (
    symptoms.includes(
      "Low confidence"
    )
  ) {
    title =
      "Confidence Feminine Reset";

    theme =
      "Posture + elegance + body confidence";

    description =
      "Tone body, improve posture and restore feminine energy.";
  }

  return {
    day,
    title: `${title} - Day ${day}`,
    theme,
    description,
    exercises:
      rotateExercises(
        day,
        count
      ),
  };
}

/* LEGACY EXPORT FOR OLD DASHBOARD */
export const plans: DayPlan[] =
  Array.from(
    { length: 30 },
    (_, i) =>
      buildPlan(i + 1)
  );

/* SMART EXPORT */
export function getPlan(
  day: number,
  symptoms: string[] = [],
  selectedTime = "10 min"
) {
  return buildPlan(
    day,
    symptoms,
    selectedTime
  );
}

/* SESSION PAGE COMPATIBILITY */
export function getTodayProgram(
  day: number,
  symptoms: string[] = [],
  selectedTime = "20 min"
) {
  const safeDay =
    Math.max(
      1,
      Math.min(30, day || 1)
    );

  return buildPlan(
    safeDay,
    symptoms,
    selectedTime
  );
}
