export type Exercise = {
  name: string;
  why: string;
  start: string;
  end: string;
  reps: string;
  image: string;
};

export type DayPlan = {
  title: string;
  theme: string;
  exercises: Exercise[];
};

export const plans: DayPlan[] = [
  {
    title: "Day 1",
    theme: "Sleep Reset",
    exercises: [
      {
        name: "Breathing Calm Reset",
        why: "Supports nervous system and deeper sleep.",
        start: "Sit tall with relaxed shoulders.",
        end: "Slow inhale through nose, long exhale.",
        reps: "3 min",
        image: "/exercises/breathing.jpg",
      },
      {
        name: "Cat-Cow Flow",
        why: "Releases spine tension before bed.",
        start: "Hands and knees.",
        end: "Alternate round and arch.",
        reps: "60 sec",
        image: "/exercises/catcow.jpg",
      },
      {
        name: "Glute Bridge",
        why: "Relieves lower-back tightness.",
        start: "Lie on back, knees bent.",
        end: "Lift hips upward.",
        reps: "3 x 12",
        image: "exercises/bridge.jpg",
      },
    ],
  },

  {
    title: "Day 2",
    theme: "Energy + Belly Tone",
    exercises: [
      {
        name: "Chair Squat",
        why: "Supports metabolism and legs.",
        start: "Stand in front of chair.",
        end: "Sit back then rise.",
        reps: "3 x 12",
        image: "/exercises/squat.jpg",
      },
      {
        name: "March in Place",
        why: "Boosts circulation.",
        start: "Stand tall.",
        end: "Lift knees rhythmically.",
        reps: "2 min",
        image: "/exercises/march.jpg",
      },
      {
        name: "Wall Posture Reset",
        why: "Open chest and posture.",
        start: "Back near wall.",
        end: "Head + shoulders aligned.",
        reps: "45 sec",
        image: "/exercises/wall.jpg",
      },
    ],
  },

  {
    title: "Day 3",
    theme: "Joint Relief",
    exercises: [
      {
        name: "Ankle Circles",
        why: "Reduce stiffness.",
        start: "Sit tall.",
        end: "Circle ankle both ways.",
        reps: "20 each",
        image: "/exercises/ankle.jpg",
      },
      {
        name: "Shoulder Rolls",
        why: "Release upper tension.",
        start: "Stand relaxed.",
        end: "Roll shoulders slowly.",
        reps: "20 reps",
        image: "/exercises/shoulder.jpg",
      },
      {
        name: "Hip Openers",
        why: "Improve mobility.",
        start: "Wide stance.",
        end: "Gentle side shift.",
        reps: "60 sec",
        image: "/exercises/hip.jpg",
      },
    ],
  },

  {
    title: "Day 4",
    theme: "Cooling Reset",
    exercises: [
      {
        name: "Breath Walk",
        why: "Useful during hot flashes.",
        start: "Walk calmly.",
        end: "Sync breath with steps.",
        reps: "5 min",
        image: "/exercises/walk.jpg",
      },
      {
        name: "Forward Fold Support",
        why: "Calms body tension.",
        start: "Stand wide.",
        end: "Lean onto chair.",
        reps: "45 sec",
        image: "/exercises/fold.jpg",
      },
      {
        name: "Neck Release",
        why: "Reduce stress load.",
        start: "Sit tall.",
        end: "Gentle side stretch.",
        reps: "30 sec each",
        image: "/exercises/neck.jpg",
      },
    ],
  },

  {
    title: "Day 5",
    theme: "Mood + Confidence",
    exercises: [
      {
        name: "Power Posture Hold",
        why: "Confidence and breathing.",
        start: "Stand tall.",
        end: "Hands on hips chest open.",
        reps: "60 sec",
        image: "/exercises/power.jpg",
      },
      {
        name: "Glute Bridge",
        why: "Strong body feeling.",
        start: "Back on floor.",
        end: "Lift hips.",
        reps: "3 x 12",
        image: "/exercises/bridge.jpg",
      },
      {
        name: "Smile Walk",
        why: "Mood lift.",
        start: "Walk slowly.",
        end: "Relax jaw + smile.",
        reps: "5 min",
        image: "/exercises/walk.jpg",
      },
    ],
  },

  {
    title: "Day 6",
    theme: "Tone + Strength",
    exercises: [
      {
        name: "Chair Squat",
        why: "Leg tone.",
        start: "Stand front chair.",
        end: "Lower + rise.",
        reps: "3 x 15",
        image: "/exercises/squat.jpg",
      },
      {
        name: "Wall Push Up",
        why: "Upper body tone.",
        start: "Hands on wall.",
        end: "Chest toward wall.",
        reps: "3 x 12",
        image: "/exercises/pushup.jpg",
      },
      {
        name: "March in Place",
        why: "Burn calories.",
        start: "Stand tall.",
        end: "Lift knees.",
        reps: "2 min",
        image: "/exercises/march.jpg",
      },
    ],
  },

  {
    title: "Day 7",
    theme: "Recovery Flow",
    exercises: [
      {
        name: "Cat-Cow Flow",
        why: "Recovery spine flow.",
        start: "Hands knees.",
        end: "Round / arch.",
        reps: "60 sec",
        image: "/exercises/catcow.jpg",
      },
      {
        name: "Breathing Calm Reset",
        why: "Stress reduction.",
        start: "Sit tall.",
        end: "Slow breathing.",
        reps: "3 min",
        image: "/exercises/breathing.jpg",
      },
      {
        name: "Forward Fold Support",
        why: "Gentle relaxation.",
        start: "Stand with chair.",
        end: "Lean softly.",
        reps: "45 sec",
        image: "/exercises/fold.jpg",
      },
    ],
  },
];
