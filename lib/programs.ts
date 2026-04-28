// ============================================================
// VELORA PERSONALIZED PROGRAM ENGINE
// Builds unique daily plans based on quiz data, symptoms,
// goals, fitness level, and program phase.
// ============================================================

export type Exercise = {
  name: string;
  image: string;
  start: string;
  end: string;
  why: string;
  reps: string;
  seconds: number;
  category: ExerciseCategory;
  intensity: 1 | 2 | 3; // 1=gentle, 2=moderate, 3=challenging
};

export type ExerciseCategory =
  | "warmup"
  | "cooldown"
  | "core"
  | "lower"
  | "upper"
  | "mobility"
  | "balance"
  | "breathing"
  | "pelvic"
  | "posture";

export type ProgramPhase = "foundation" | "build" | "strengthen" | "master";

export type DayPlan = {
  day: number;
  title: string;
  theme: string;
  description: string;
  phase: ProgramPhase;
  focusAreas: string[];
  exercises: Exercise[];
  totalMinutes: number;
};

export type UserProfile = {
  symptoms: string[];
  severity: Record<string, number>;
  goal: string;
  activity: string;
  age: number;
  time: string;
  sleep: number;
  confidence: number;
};

const img = (file: string) => `/exercises/${file}`;

// ============================================================
// EXERCISE LIBRARY - Organized by category and intensity
// ============================================================

const EXERCISES: Exercise[] = [
  // --- WARM-UP ---
  {
    name: "Gentle March in Place",
    image: img("march.jpg"),
    start: "Stand tall, arms relaxed by your sides.",
    end: "Lift knees alternately in a gentle rhythm, swinging arms naturally.",
    why: "Warms up the body, increases blood flow and prepares joints for movement.",
    reps: "2 min", seconds: 120,
    category: "warmup", intensity: 1,
  },
  {
    name: "Ankle & Wrist Circles",
    image: img("ankle.jpg"),
    start: "Stand with support or sit comfortably.",
    end: "Rotate each ankle and wrist 10 times in each direction.",
    why: "Lubricates joints and prevents stiffness during exercise.",
    reps: "1 min", seconds: 60,
    category: "warmup", intensity: 1,
  },
  {
    name: "Walking Warm-Up",
    image: img("walk.jpg"),
    start: "Stand tall with good posture.",
    end: "Walk in place with exaggerated arm swings, gradually increasing pace.",
    why: "Elevates heart rate gently and activates full-body circulation.",
    reps: "2 min", seconds: 120,
    category: "warmup", intensity: 1,
  },

  // --- BREATHING & NERVOUS SYSTEM ---
  {
    name: "Diaphragmatic Breathing",
    image: img("breathing.jpg"),
    start: "Sit or lie comfortably, one hand on chest, one on belly.",
    end: "Breathe deeply into belly for 4 counts, hold 4, exhale 6. Repeat.",
    why: "Activates parasympathetic nervous system, reduces cortisol and hot flash intensity.",
    reps: "3 min", seconds: 180,
    category: "breathing", intensity: 1,
  },
  {
    name: "Box Breathing Reset",
    image: img("breathing.jpg"),
    start: "Sit tall with eyes closed.",
    end: "Inhale 4 counts, hold 4, exhale 4, hold 4. Repeat 6 cycles.",
    why: "Calms the nervous system, improves sleep quality and reduces anxiety.",
    reps: "2 min", seconds: 120,
    category: "breathing", intensity: 1,
  },
  {
    name: "Evening Wind-Down Breath",
    image: img("breathing.jpg"),
    start: "Lie on back, knees bent, arms relaxed.",
    end: "Long exhales (twice the length of inhales) for 3 minutes.",
    why: "Prepares body for deep sleep, reduces night sweats and restlessness.",
    reps: "3 min", seconds: 180,
    category: "breathing", intensity: 1,
  },

  // --- CORE ---
  {
    name: "Bridge Lift",
    image: img("bridge.jpg"),
    start: "Lie on back, knees bent, feet flat hip-width apart.",
    end: "Press through heels, lift hips until body forms a line. Squeeze glutes at top, hold 3 sec.",
    why: "Strengthens glutes and pelvic floor, supports lower back and improves posture.",
    reps: "12 reps", seconds: 120,
    category: "core", intensity: 1,
  },
  {
    name: "Single-Leg Bridge",
    image: img("bridge.jpg"),
    start: "Lie on back, one leg extended toward ceiling.",
    end: "Lift hips pressing through grounded foot. Hold 2 sec at top.",
    why: "Advanced glute and core activation, corrects muscle imbalances.",
    reps: "8 each side", seconds: 120,
    category: "core", intensity: 3,
  },
  {
    name: "Dead Bug Hold",
    image: img("bridge.jpg"),
    start: "Lie on back, arms up, knees at 90°.",
    end: "Slowly extend opposite arm and leg while keeping lower back pressed to floor.",
    why: "Deep core stabilization without straining the neck or back.",
    reps: "10 reps", seconds: 120,
    category: "core", intensity: 2,
  },
  {
    name: "Bird-Dog",
    image: img("birddog.jpg"),
    start: "Get onto all fours, hands under shoulders, knees under hips. Keep back flat.",
    end: "Simultaneously extend the opposite arm and leg until they are parallel with the body, keeping core tight.",
    why: "Strengthens core muscles (abs and lower back), glutes, and improves balance.",
    reps: "12 each side", seconds: 120,
    category: "core", intensity: 2,
  },

  // --- LOWER BODY ---
  {
    name: "Chair Squat",
    image: img("chairsquat.jpg"),
    start: "Stand in front of a sturdy chair, feet hip-width.",
    end: "Lower hips back until you lightly touch the chair, then stand. Keep chest lifted.",
    why: "Builds functional leg strength safely, supports bone density.",
    reps: "12 reps", seconds: 120,
    category: "lower", intensity: 1,
  },
  {
    name: "Bodyweight Squat",
    image: img("squat.jpg"),
    start: "Stand with feet shoulder-width, toes slightly out.",
    end: "Lower until thighs are parallel, drive through heels to stand.",
    why: "Full lower body strengthening, boosts metabolism and bone health.",
    reps: "15 reps", seconds: 120,
    category: "lower", intensity: 2,
  },
  {
    name: "Sumo Squat Pulse",
    image: img("squat.jpg"),
    start: "Wide stance, toes pointed out 45°.",
    end: "Lower into deep squat, pulse 3 times at bottom, then stand.",
    why: "Targets inner thighs and glutes, improves hip mobility.",
    reps: "10 reps", seconds: 120,
    category: "lower", intensity: 3,
  },
  {
    name: "Standing Calf Raise",
    image: img("walk.jpg"),
    start: "Stand near wall for balance, feet hip-width.",
    end: "Rise onto toes slowly (3 sec up), hold at top, lower slowly (3 sec down).",
    why: "Improves circulation in legs, reduces swelling and supports ankle stability.",
    reps: "15 reps", seconds: 90,
    category: "lower", intensity: 1,
  },

  // --- UPPER BODY ---
  {
    name: "Wall Push-Up",
    image: img("pushup.jpg"),
    start: "Stand arm's length from wall, hands at shoulder height.",
    end: "Bend elbows to bring chest toward wall, push back. Keep body straight.",
    why: "Builds upper body strength without floor strain, supports bone density in wrists.",
    reps: "12 reps", seconds: 90,
    category: "upper", intensity: 1,
  },
  {
    name: "Incline Push-Up",
    image: img("pushup.jpg"),
    start: "Hands on sturdy counter or bench, body in plank line.",
    end: "Lower chest toward surface, push back up with control.",
    why: "Progressive upper body strength, prepares for full push-ups.",
    reps: "10 reps", seconds: 90,
    category: "upper", intensity: 2,
  },
  {
    name: "Power Pose Hold",
    image: img("power.jpg"),
    start: "Stand with feet wide, arms raised in a V shape.",
    end: "Hold strong stance for 30 seconds. Breathe deeply and feel grounded.",
    why: "Builds shoulder endurance, boosts confidence through posture.",
    reps: "3 × 30 sec", seconds: 120,
    category: "upper", intensity: 1,
  },

  // --- MOBILITY ---
  {
    name: "Cat-Cow Flow",
    image: img("catcow.jpg"),
    start: "Hands and knees, wrists under shoulders, knees under hips.",
    end: "Inhale: arch spine, lift chest (cow). Exhale: round spine, tuck chin (cat).",
    why: "Restores spinal mobility, relieves morning stiffness and back tension.",
    reps: "10 cycles", seconds: 120,
    category: "mobility", intensity: 1,
  },
  {
    name: "Hip Opener Stretch",
    image: img("hip.jpg"),
    start: "Stand or kneel with one foot forward in a lunge position.",
    end: "Gently press hips forward, feeling stretch in hip flexor. Hold each side.",
    why: "Releases tight hip flexors from sitting, reduces lower back pain.",
    reps: "30 sec each", seconds: 120,
    category: "mobility", intensity: 1,
  },
  {
    name: "Standing Twist",
    image: img("twist.jpg"),
    start: "Stand with feet hip-width, arms at shoulder height.",
    end: "Rotate torso left and right with control, keeping hips stable.",
    why: "Improves thoracic mobility, aids digestion and reduces waist stiffness.",
    reps: "20 reps", seconds: 90,
    category: "mobility", intensity: 1,
  },
  {
    name: "Neck Release Sequence",
    image: img("neck.jpg"),
    start: "Sit or stand tall, shoulders relaxed.",
    end: "Tilt ear to shoulder (hold 15s each side), then chin to chest (hold 15s).",
    why: "Relieves tension headaches, reduces neck stiffness from desk work.",
    reps: "3 positions", seconds: 90,
    category: "mobility", intensity: 1,
  },
  {
    name: "Shoulder Roll & Open",
    image: img("shoulder.jpg"),
    start: "Stand tall, arms by sides.",
    end: "Roll shoulders back 10 times, then clasp hands behind back and open chest.",
    why: "Counteracts forward posture, opens chest for better breathing.",
    reps: "2 min", seconds: 120,
    category: "mobility", intensity: 1,
  },

  // --- BALANCE ---
  {
    name: "Single-Leg Stand",
    image: img("walk.jpg"),
    start: "Stand near wall for safety, shift weight to one foot.",
    end: "Lift other foot off ground, hold 20-30 seconds. Switch sides.",
    why: "Improves balance and proprioception, reduces fall risk.",
    reps: "30 sec each", seconds: 90,
    category: "balance", intensity: 1,
  },
  {
    name: "Heel-to-Toe Walk",
    image: img("walk.jpg"),
    start: "Stand at one end of room.",
    end: "Walk in a straight line placing heel directly in front of toes each step.",
    why: "Trains balance and coordination, strengthens stabilizer muscles.",
    reps: "2 lengths", seconds: 90,
    category: "balance", intensity: 2,
  },

  // --- PELVIC FLOOR ---
  {
    name: "Pelvic Floor Activation",
    image: img("bridge.jpg"),
    start: "Sit or lie comfortably with neutral spine.",
    end: "Gently contract pelvic floor (as if stopping urine flow), hold 5 sec, release. Repeat.",
    why: "Strengthens pelvic floor muscles weakened by hormonal changes.",
    reps: "10 reps", seconds: 120,
    category: "pelvic", intensity: 1,
  },
  {
    name: "Bridge with Pelvic Squeeze",
    image: img("bridge.jpg"),
    start: "Lie on back, knees bent, small ball or pillow between knees.",
    end: "Lift hips while squeezing knees together. Hold 5 sec at top.",
    why: "Combines glute strength with pelvic floor engagement for maximum benefit.",
    reps: "10 reps", seconds: 120,
    category: "pelvic", intensity: 2,
  },

  // --- POSTURE ---
  {
    name: "Wall Posture Reset",
    image: img("wallposture.jpg"),
    start: "Stand with back against wall, heels 2 inches from wall.",
    end: "Press head, shoulders, and hips to wall. Tuck chin slightly. Hold.",
    why: "Resets posture alignment, builds awareness of correct standing position.",
    reps: "1 min hold", seconds: 90,
    category: "posture", intensity: 1,
  },
  {
    name: "Scapula Squeeze",
    image: img("shoulder.jpg"),
    start: "Sit or stand tall, arms by sides.",
    end: "Squeeze shoulder blades together and down, hold 5 sec, release.",
    why: "Strengthens upper back muscles that support upright posture.",
    reps: "12 reps", seconds: 90,
    category: "posture", intensity: 1,
  },

  // --- COOL-DOWN ---
  {
    name: "Forward Fold Release",
    image: img("fold.jpg"),
    start: "Stand with feet hip-width, soft bend in knees.",
    end: "Fold forward from hips, let head and arms hang heavy. Sway gently.",
    why: "Releases lower back tension, calms the nervous system after exercise.",
    reps: "1 min", seconds: 60,
    category: "cooldown", intensity: 1,
  },
  {
    name: "Child's Pose Rest",
    image: img("fold.jpg"),
    start: "Kneel on floor, big toes touching, knees wide.",
    end: "Fold forward, arms extended, forehead to floor. Breathe deeply.",
    why: "Full-body relaxation, stretches hips, back and shoulders simultaneously.",
    reps: "2 min", seconds: 120,
    category: "cooldown", intensity: 1,
  },
];

// ============================================================
// SYMPTOM → EXERCISE MAPPING
// Which categories help which symptoms
// ============================================================

const SYMPTOM_FOCUS: Record<string, ExerciseCategory[]> = {
  "Hot flashes":    ["breathing", "mobility", "cooldown"],
  "Poor sleep":     ["breathing", "mobility", "cooldown", "pelvic"],
  "Weight gain":    ["lower", "core", "upper", "balance"],
  "Low energy":     ["lower", "core", "upper", "warmup"],
  "Joint pain":     ["mobility", "warmup", "balance", "cooldown"],
  "Bloating":       ["mobility", "breathing", "core"],
  "Back pain":      ["core", "mobility", "pelvic", "posture"],
  "Mood swings":    ["breathing", "balance", "posture", "mobility"],
  "Low confidence": ["posture", "upper", "core", "balance"],
};

const GOAL_FOCUS: Record<string, ExerciseCategory[]> = {
  fat_loss:  ["lower", "core", "upper", "balance"],
  tone:      ["lower", "core", "upper", "pelvic"],
  energy:    ["lower", "mobility", "balance", "upper"],
  maintain:  ["mobility", "breathing", "balance", "core"],
};

// ============================================================
// PHASE SYSTEM - Progressive difficulty over 30/90 days
// ============================================================

function getPhase(day: number): ProgramPhase {
  if (day <= 7)  return "foundation";
  if (day <= 16) return "build";
  if (day <= 24) return "strengthen";
  return "master";
}

function getPhaseIntensity(phase: ProgramPhase): (1 | 2 | 3)[] {
  switch (phase) {
    case "foundation": return [1];
    case "build":      return [1, 2];
    case "strengthen": return [2, 3];
    case "master":     return [2, 3];
  }
}

const PHASE_TITLES: Record<ProgramPhase, string> = {
  foundation: "Foundation",
  build:      "Building Strength",
  strengthen: "Getting Stronger",
  master:     "Mastery",
};

// ============================================================
// DAY THEMES - Rotating focus areas through the week
// ============================================================

type DayTheme = {
  name: string;
  primary: ExerciseCategory[];
  secondary: ExerciseCategory[];
};

const WEEK_THEMES: DayTheme[] = [
  { name: "Full Body Flow",       primary: ["lower", "upper", "core"],       secondary: ["mobility"] },
  { name: "Core & Pelvic Health", primary: ["core", "pelvic", "breathing"],  secondary: ["mobility"] },
  { name: "Lower Body Strength",  primary: ["lower", "balance"],             secondary: ["core"] },
  { name: "Mobility & Recovery",  primary: ["mobility", "breathing"],        secondary: ["posture", "balance"] },
  { name: "Upper Body & Posture", primary: ["upper", "posture"],             secondary: ["core"] },
  { name: "Balance & Stability",  primary: ["balance", "core", "lower"],     secondary: ["mobility"] },
  { name: "Restore & Breathe",    primary: ["breathing", "mobility", "cooldown"], secondary: ["pelvic"] },
];

// ============================================================
// MAIN PROGRAM BUILDER
// ============================================================

function getExerciseCount(time: string): number {
  if (time === "10 min") return 5;
  if (time === "30 min" || time === "30+ min") return 12;
  return 8; // 20 min default
}

function pickExercises(
  categories: ExerciseCategory[],
  intensities: (1 | 2 | 3)[],
  count: number,
  daySeed: number,
  exclude: Set<string>
): Exercise[] {
  // Filter exercises matching categories and intensity
  const pool = EXERCISES.filter(
    (e) =>
      categories.includes(e.category) &&
      intensities.includes(e.intensity) &&
      !exclude.has(e.name)
  );

  if (pool.length === 0) {
    // Fallback: relax intensity filter
    const relaxed = EXERCISES.filter(
      (e) => categories.includes(e.category) && !exclude.has(e.name)
    );
    return shuffleWithSeed(relaxed, daySeed).slice(0, count);
  }

  return shuffleWithSeed(pool, daySeed).slice(0, count);
}

// Deterministic shuffle so same day always gives same result
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let s = seed;
  for (let i = copy.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTitle(
  phase: ProgramPhase,
  dayTheme: DayTheme,
  symptoms: string[],
  day: number
): { title: string; description: string } {
  // Symptom-specific titles take priority
  const primarySymptom = symptoms[0];

  const symptomTitles: Record<string, string> = {
    "Hot flashes":    "Cooling & Calm",
    "Poor sleep":     "Sleep Recovery",
    "Weight gain":    "Metabolism Boost",
    "Low energy":     "Energy Activation",
    "Joint pain":     "Joint Ease",
    "Bloating":       "Digestive Flow",
    "Back pain":      "Back Relief",
    "Mood swings":    "Mood Balance",
    "Low confidence": "Confidence Builder",
  };

  const symptomDescs: Record<string, string> = {
    "Hot flashes":    "Breathing techniques and gentle movement to regulate body temperature and calm the nervous system.",
    "Poor sleep":     "Evening-friendly exercises that prepare your body for deep, restorative sleep.",
    "Weight gain":    "Metabolism-boosting strength work combined with movement that targets stubborn areas.",
    "Low energy":     "Energizing movements that wake up your body without exhausting it.",
    "Joint pain":     "Gentle mobility work that lubricates joints and reduces stiffness safely.",
    "Bloating":       "Twists and breathing that support digestion and reduce abdominal discomfort.",
    "Back pain":      "Core stabilization and mobility to relieve and prevent back pain.",
    "Mood swings":    "Mindful movement and breathing to stabilize mood and reduce stress hormones.",
    "Low confidence": "Posture-building and strength exercises that help you stand taller and feel powerful.",
  };

  const base = primarySymptom && symptomTitles[primarySymptom]
    ? symptomTitles[primarySymptom]
    : dayTheme.name;

  const desc = primarySymptom && symptomDescs[primarySymptom]
    ? symptomDescs[primarySymptom]
    : `${PHASE_TITLES[phase]} phase: ${dayTheme.name.toLowerCase()} focused session.`;

  return {
    title: `${base} – Day ${day} (${PHASE_TITLES[phase]})`,
    description: desc,
  };
}

export function buildPlan(
  day: number,
  profile: Partial<UserProfile> = {}
): DayPlan {
  const {
    symptoms = [],
    severity = {},
    goal = "tone",
    activity = "light",
    age = 48,
    time = "20 min",
    sleep = 5,
  } = profile;

  const phase = getPhase(((day - 1) % 30) + 1); // Cycle every 30 days
  const intensities = getPhaseIntensity(phase);

  // Adjust intensity for age and fitness
  const adjustedIntensities = [...intensities];
  if (age >= 60 || activity === "sedentary") {
    // Keep only gentler options
    const idx = adjustedIntensities.indexOf(3);
    if (idx !== -1) adjustedIntensities[idx] = 2;
  }

  const exerciseCount = getExerciseCount(time);
  const dayTheme = WEEK_THEMES[(day - 1) % 7];
  const daySeed = day * 7919 + symptoms.length * 31 + (goal.charCodeAt(0) || 0);

  // Build priority categories from symptoms + goal + day theme
  const symptomCategories: ExerciseCategory[] = [];
  const sortedSymptoms = [...symptoms].sort(
    (a, b) => (severity[b] || 3) - (severity[a] || 3)
  );
  for (const s of sortedSymptoms) {
    const cats = SYMPTOM_FOCUS[s] || [];
    for (const c of cats) {
      if (!symptomCategories.includes(c)) symptomCategories.push(c);
    }
  }

  const goalCategories = GOAL_FOCUS[goal] || GOAL_FOCUS.tone;
  const themeCategories = [...dayTheme.primary, ...dayTheme.secondary];

  // Merge priorities: symptoms first, then goal, then day theme
  const allCategories: ExerciseCategory[] = [];
  for (const c of [...symptomCategories, ...goalCategories, ...themeCategories]) {
    if (!allCategories.includes(c)) allCategories.push(c);
  }

  // Build the session
  const used = new Set<string>();
  const exercises: Exercise[] = [];

  // 1. Always start with warm-up
  const warmups = pickExercises(["warmup"], [1], 1, daySeed, used);
  for (const e of warmups) { exercises.push(e); used.add(e.name); }

  // 2. If poor sleep or hot flashes are severe, add breathing early
  if (
    (symptoms.includes("Poor sleep") && sleep <= 4) ||
    (symptoms.includes("Hot flashes") && (severity["Hot flashes"] || 3) >= 4)
  ) {
    const breathe = pickExercises(["breathing"], [1], 1, daySeed + 1, used);
    for (const e of breathe) { exercises.push(e); used.add(e.name); }
  }

  // 3. Main exercises from priority categories
  const mainCount = exerciseCount - exercises.length - 1; // -1 for cooldown
  const mainExercises = pickExercises(
    allCategories,
    adjustedIntensities as (1 | 2 | 3)[],
    mainCount,
    daySeed + 2,
    used
  );
  for (const e of mainExercises) { exercises.push(e); used.add(e.name); }

  // 4. Always end with cool-down
  const cooldowns = pickExercises(["cooldown"], [1], 1, daySeed + 3, used);
  for (const e of cooldowns) { exercises.push(e); used.add(e.name); }

  // Calculate total time
  const totalSeconds = exercises.reduce((sum, e) => sum + e.seconds, 0);

  const { title, description } = buildTitle(phase, dayTheme, symptoms, day);

  const focusAreas = [...new Set(exercises.map((e) => e.category))];

  return {
    day,
    title,
    theme: `${PHASE_TITLES[phase]} • ${dayTheme.name}`,
    description,
    phase,
    focusAreas,
    exercises,
    totalMinutes: Math.round(totalSeconds / 60),
  };
}

// ============================================================
// PUBLIC API - Backward compatible
// ============================================================

/** Load quiz data from localStorage and build plan */
function loadProfile(): Partial<UserProfile> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("quizData");
    if (!raw) return {};
    const data = JSON.parse(raw);
    return {
      symptoms: data.symptoms || [],
      severity: data.severity || {},
      goal: data.goal || "tone",
      activity: data.activity || "light",
      age: Number(data.age) || 48,
      time: data.time || "20 min",
      sleep: Number(data.sleep) || 5,
      confidence: Number(data.confidence) || 5,
    };
  } catch {
    return {};
  }
}

export function getTodayProgram(
  day: number,
  symptoms?: string[],
  selectedTime?: string
): DayPlan {
  const profile = loadProfile();

  // Allow overrides from function params (backward compat)
  if (symptoms && symptoms.length > 0) profile.symptoms = symptoms;
  if (selectedTime) profile.time = selectedTime;

  const safeDay = Math.max(1, Math.min(90, day || 1));
  return buildPlan(safeDay, profile);
}

export function getPlan(
  day: number,
  symptoms: string[] = [],
  selectedTime = "10 min"
) {
  return getTodayProgram(day, symptoms, selectedTime);
}

/** Generate preview plans (used by legacy code) */
export const plans: DayPlan[] = Array.from({ length: 30 }, (_, i) =>
  buildPlan(i + 1)
);
