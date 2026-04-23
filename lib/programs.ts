export type Exercise = {
  name: string;
  why: string;
  start: string;
  end: string;
  reps: string;
  seconds: number;
  image: string;
};

export type DayPlan = {
  title: string;
  theme: string;
  description: string;
  exercises: Exercise[];
};

const img = (file: string) => `/app/exercises/${file}`;

export const plans: DayPlan[] = [
  {
    title: "Day 1",
    theme: "Sleep + Hot Flash Reset",
    description:
      "Evening-focused calming flow for nervous system balance, cooler nights and deeper sleep.",
    exercises: [
      {
        name: "Breathing Calm Reset",
        why: "Reduces stress and supports better sleep.",
        start: "Sit tall, one hand on belly.",
        end: "Slow inhale 4 sec / exhale 6 sec.",
        reps: "3 rounds",
        seconds: 180,
        image: img("breathing.jpg"),
      },
      {
        name: "Cat-Cow Flow",
        why: "Releases spinal tension.",
        start: "Hands and knees.",
        end: "Round then arch spine.",
        reps: "60 sec",
        seconds: 60,
        image: img("catcow.jpg"),
      },
      {
        name: "Bridge Hold",
        why: "Supports hips and low back.",
        start: "Lie down knees bent.",
        end: "Lift hips upward.",
        reps: "3 x 20 sec",
        seconds: 60,
        image: img("bridge.jpg"),
      },
      {
        name: "Forward Fold Support",
        why: "Calms body and hamstrings.",
        start: "Stand holding chair.",
        end: "Lean forward gently.",
        reps: "45 sec",
        seconds: 45,
        image: img("fold.jpg"),
      },
      {
        name: "Neck Release",
        why: "Relieves tension headaches.",
        start: "Sit tall.",
        end: "Tilt ear to shoulder.",
        reps: "30 sec each side",
        seconds: 60,
        image: img("neck.jpg"),
      },
    ],
  },

  {
    title: "Day 2",
    theme: "Metabolism + Belly Tone",
    description:
      "Gentle body-toning routine to support energy, strength and metabolism.",
    exercises: [
      {
        name: "Chair Squat",
        why: "Builds lower-body strength.",
        start: "Stand in front of chair.",
        end: "Sit back then rise.",
        reps: "3 x 12",
        seconds: 90,
        image: img("squat.jpg"),
      },
      {
        name: "March in Place",
        why: "Raises heart rate safely.",
        start: "Stand tall.",
        end: "Lift knees rhythmically.",
        reps: "90 sec",
        seconds: 90,
        image: img("march.jpg"),
      },
      {
        name: "Wall Push Up",
        why: "Tones arms and chest.",
        start: "Hands on wall.",
        end: "Lower chest then push away.",
        reps: "3 x 12",
        seconds: 75,
        image: img("pushup.jpg"),
      },
      {
        name: "Standing Twist",
        why: "Activates waist and posture.",
        start: "Stand tall arms bent.",
        end: "Rotate left and right.",
        reps: "45 sec",
        seconds: 45,
        image: img("twist.jpg"),
      },
      {
        name: "Bridge Pulse",
        why: "Targets glutes and core.",
        start: "Bridge position lifted.",
        end: "Small pulses upward.",
        reps: "30 reps",
        seconds: 60,
        image: img("bridge.jpg"),
      },
    ],
  },

  {
    title: "Day 3",
    theme: "Joint Ease + Mobility",
    description:
      "Designed for stiffness in knees, hips, shoulders and low back.",
    exercises: [
      {
        name: "Ankle Circles",
        why: "Improves circulation and comfort.",
        start: "Sit tall.",
        end: "Circle ankle slowly.",
        reps: "20 each",
        seconds: 60,
        image: img("ankle.jpg"),
      },
      {
        name: "Shoulder Rolls",
        why: "Releases upper body tension.",
        start: "Relax arms.",
        end: "Roll backward slowly.",
        reps: "20 reps",
        seconds: 45,
        image: img("shoulder.jpg"),
      },
      {
        name: "Hip Openers",
        why: "Improves hip movement.",
        start: "Wide stance.",
        end: "Shift side to side.",
        reps: "60 sec",
        seconds: 60,
        image: img("hip.jpg"),
      },
      {
        name: "Wall Calf Stretch",
        why: "Helps walking comfort.",
        start: "Hands on wall.",
        end: "Back heel pressed down.",
        reps: "30 sec each",
        seconds: 60,
        image: img("wall.jpg"),
      },
      {
        name: "Cat-Cow Flow",
        why: "Spinal mobility reset.",
        start: "Hands knees.",
        end: "Round / arch.",
        reps: "60 sec",
        seconds: 60,
        image: img("catcow.jpg"),
      },
    ],
  },

  {
    title: "Day 4",
    theme: "Cooling Reset",
    description:
      "Use on stressful or overheating days to calm the system.",
    exercises: [
      {
        name: "Breath Walk",
        why: "Helps regulate stress response.",
        start: "Walk calmly.",
        end: "Sync steps with breath.",
        reps: "5 min",
        seconds: 300,
        image: img("walk.jpg"),
      },
      {
        name: "Forward Fold Support",
        why: "Reduces body tension.",
        start: "Stand wide stance.",
        end: "Lean onto chair.",
        reps: "45 sec",
        seconds: 45,
        image: img("fold.jpg"),
      },
      {
        name: "Neck Release",
        why: "Calming tension release.",
        start: "Sit tall.",
        end: "Tilt side gently.",
        reps: "30 sec each",
        seconds: 60,
        image: img("neck.jpg"),
      },
      {
        name: "Shoulder Rolls",
        why: "Stress reset.",
        start: "Relax arms.",
        end: "Roll slowly.",
        reps: "20 reps",
        seconds: 45,
        image: img("shoulder.jpg"),
      },
      {
        name: "Breathing Calm Reset",
        why: "Cooling nervous system.",
        start: "Sit tall.",
        end: "Long slow exhale.",
        reps: "2 min",
        seconds: 120,
        image: img("breathing.jpg"),
      },
    ],
  },

  {
    title: "Day 5",
    theme: "Confidence + Posture",
    description:
      "Stand taller, feel elegant and restore feminine presence.",
    exercises: [
      {
        name: "Wall Posture Reset",
        why: "Aligns head and shoulders.",
        start: "Back near wall.",
        end: "Head + shoulders touch wall.",
        reps: "45 sec",
        seconds: 45,
        image: img("wall.jpg"),
      },
      {
        name: "Power Posture Hold",
        why: "Boosts confidence and breath.",
        start: "Stand tall.",
        end: "Hands hips chest open.",
        reps: "60 sec",
        seconds: 60,
        image: img("power.jpg"),
      },
      {
        name: "Chair Squat",
        why: "Strong elegant lower body.",
        start: "Stand front chair.",
        end: "Sit back rise tall.",
        reps: "3 x 12",
        seconds: 90,
        image: img("squat.jpg"),
      },
      {
        name: "Wall Push Up",
        why: "Upper body tone.",
        start: "Hands wall.",
        end: "Push away.",
        reps: "3 x 12",
        seconds: 75,
        image: img("pushup.jpg"),
      },
      {
        name: "Smile Walk",
        why: "Mood lift.",
        start: "Walk softly.",
        end: "Relax jaw + smile.",
        reps: "5 min",
        seconds: 300,
        image: img("walk.jpg"),
      },
    ],
  },

  {
    title: "Day 6",
    theme: "Tone + Strength",
    description:
      "Build lean muscle and maintain metabolism after 40.",
    exercises: [
      {
        name: "Chair Squat",
        why: "Leg tone.",
        start: "Stand front chair.",
        end: "Lower + rise.",
        reps: "3 x 15",
        seconds: 100,
        image: img("squat.jpg"),
      },
      {
        name: "Wall Push Up",
        why: "Arm tone.",
        start: "Hands wall.",
        end: "Push away.",
        reps: "3 x 15",
        seconds: 90,
        image: img("pushup.jpg"),
      },
      {
        name: "March in Place",
        why: "Burn calories.",
        start: "Stand tall.",
        end: "Lift knees.",
        reps: "2 min",
        seconds: 120,
        image: img("march.jpg"),
      },
      {
        name: "Bridge Pulse",
        why: "Glute shaping.",
        start: "Lift hips.",
        end: "Pulse upward.",
        reps: "30 reps",
        seconds: 60,
        image: img("bridge.jpg"),
      },
      {
        name: "Standing Twist",
        why: "Core engagement.",
        start: "Tall stance.",
        end: "Rotate side-side.",
        reps: "45 sec",
        seconds: 45,
        image: img("twist.jpg"),
      },
    ],
  },

  {
    title: "Day 7",
    theme: "Recovery Flow",
    description:
      "Gentle restorative day for consistency and recovery.",
    exercises: [
      {
        name: "Cat-Cow Flow",
        why: "Spine mobility.",
        start: "Hands knees.",
        end: "Round / arch.",
        reps: "60 sec",
        seconds: 60,
        image: img("catcow.jpg"),
      },
      {
        name: "Breathing Calm Reset",
        why: "Stress reduction.",
        start: "Sit tall.",
        end: "Slow breathing.",
        reps: "3 min",
        seconds: 180,
        image: img("breathing.jpg"),
      },
      {
        name: "Forward Fold Support",
        why: "Relaxation.",
        start: "Use chair.",
        end: "Lean softly.",
        reps: "45 sec",
        seconds: 45,
        image: img("fold.jpg"),
      },
      {
        name: "Neck Release",
        why: "Release tension.",
        start: "Sit tall.",
        end: "Side tilt.",
        reps: "30 sec each",
        seconds: 60,
        image: img("neck.jpg"),
      },
      {
        name: "Walk Softly",
        why: "Recovery circulation.",
        start: "Easy pace.",
        end: "Relaxed walk.",
        reps: "5 min",
        seconds: 300,
        image: img("walk.jpg"),
      },
    ],
  },
];
