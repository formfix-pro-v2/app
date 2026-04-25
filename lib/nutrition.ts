export type GoalType =
  | "fat_loss"
  | "maintain"
  | "tone"
  | "energy";

export type UserProfile = {
  age: number;
  height: number;
  weight: number;
  activity?: number;
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

export type Meal = {
  key: string;
  type:
    | "breakfast"
    | "lunch"
    | "dinner"
    | "snack";
  title: string;
  subtitle: string;
  kcal: number;
  protein: number;
  prep: string;
  benefits: string;
  ingredients: string[];
  steps: string[];
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
  )
    calories *= 0.85;

  if (
    user.goal === "tone"
  )
    calories *= 0.92;

  if (
    user.goal ===
    "energy"
  )
    calories *= 1.03;

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

  const water = Number(
    (
      user.weight *
      0.033
    ).toFixed(1)
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

export function getMealPlan(
  symptoms: string[] = []
): Meal[] {
  const sleep =
    symptoms.includes(
      "Poor sleep"
    );

  const bloat =
    symptoms.includes(
      "Bloating"
    );

  const energy =
    symptoms.includes(
      "Low energy"
    );

  return [
    {
      key: "b1",
      type: "breakfast",
      title:
        sleep
          ? "Sleep Support Yogurt Bowl"
          : "Protein Berry Oats",
      subtitle:
        "Balanced start with fiber + protein",
      kcal: 420,
      protein: 31,
      prep: "5 min",
      benefits:
        "Stable blood sugar, satiety, hormone support",
      ingredients: [
        "220g Greek yogurt",
        "40g oats",
        "80g berries",
        "10g chia",
        "Cinnamon",
      ],
      steps: [
        "Add yogurt to bowl.",
        "Mix oats and chia.",
        "Top with berries.",
        "Finish with cinnamon.",
      ],
    },

    {
      key: "l1",
      type: "lunch",
      title:
        bloat
          ? "Anti-Bloat Salmon Rice Bowl"
          : "Chicken Quinoa Power Bowl",
      subtitle:
        "Lean protein + quality carbs",
      kcal: 560,
      protein: 42,
      prep: "15 min",
      benefits:
        "Energy support and appetite control",
      ingredients: [
        "140g protein source",
        "70g dry rice/quinoa",
        "Spinach",
        "Cucumber",
        "Olive oil",
      ],
      steps: [
        "Cook grains.",
        "Cook protein.",
        "Slice vegetables.",
        "Assemble bowl.",
      ],
    },

    {
      key: "d1",
      type: "dinner",
      title:
        energy
          ? "Turkey Sweet Potato Plate"
          : "Mediterranean Protein Dinner",
      subtitle:
        "Recovery focused evening meal",
      kcal: 520,
      protein: 40,
      prep: "20 min",
      benefits:
        "Supports recovery and evening satiety",
      ingredients: [
        "150g turkey/chicken",
        "220g sweet potato",
        "Green vegetables",
        "Herbs",
      ],
      steps: [
        "Roast potato.",
        "Cook protein.",
        "Steam vegetables.",
        "Serve warm.",
      ],
    },

    {
      key: "s1",
      type: "snack",
      title:
        "Apple Almond Energy Snack",
      subtitle:
        "Simple hunger control option",
      kcal: 240,
      protein: 8,
      prep: "2 min",
      benefits:
        "Craving control between meals",
      ingredients: [
        "1 apple",
        "20g almonds",
      ],
      steps: [
        "Slice apple.",
        "Serve with almonds.",
      ],
    },
  ];
}
