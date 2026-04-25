export type GoalType =
  | "fat_loss"
  | "maintain"
  | "tone"
  | "energy";

export type UserProfile = {
  age: number;
  height: number; // cm
  weight: number; // kg
  activity?: number; // 1.2 - 1.55
  goal: GoalType;
  symptoms?: string[];
};

export type NutritionPlan = {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  water: number;
};

export function calculateNutrition(
  user: UserProfile
): NutritionPlan {
  const activity =
    user.activity || 1.35;

  const bmr =
    10 * user.weight +
    6.25 * user.height -
    5 * user.age -
    161;

  let calories =
    bmr * activity;

  if (
    user.goal ===
    "fat_loss"
  ) {
    calories *= 0.85;
  }

  if (
    user.goal === "tone"
  ) {
    calories *= 0.92;
  }

  if (
    user.goal ===
    "energy"
  ) {
    calories *= 1.03;
  }

  const finalCalories =
    Math.round(calories);

  const protein =
    Math.round(
      user.weight * 1.8
    );

  const fats =
    Math.round(
      (finalCalories *
        0.28) /
        9
    );

  const carbs =
    Math.round(
      (finalCalories -
        protein * 4 -
        fats * 9) /
        4
    );

  const fiber = Math.max(
    28,
    Math.round(
      finalCalories / 60
    )
  );

  const water = Math.max(
    2.2,
    Number(
      (
        user.weight *
        0.033
      ).toFixed(1)
    )
  );

  return {
    calories:
      finalCalories,
    protein,
    carbs,
    fats,
    fiber,
    water,
  };
}

export function getPreviewMeals(
  symptoms: string[] = []
) {
  const poorSleep =
    symptoms.includes(
      "Poor sleep"
    );

  const bloating =
    symptoms.includes(
      "Bloating"
    );

  const lowEnergy =
    symptoms.includes(
      "Low energy"
    );

  return {
    breakfast: poorSleep
      ? "Greek yogurt, berries, chia, oats"
      : "Protein oats with berries",

    lunch: bloating
      ? "Salmon, rice, zucchini"
      : "Chicken quinoa power bowl",

    dinner: lowEnergy
      ? "Turkey stir fry + sweet potato"
      : "Lean protein + greens + carbs",

    snack:
      "Apple + almonds",

    locked:
      "30 premium rotating days locked 🔒",
  };
}
