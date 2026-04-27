// lib/nutrition.ts

export type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active";

export type Goal =
  | "fat_loss"
  | "maintain"
  | "tone"
  | "energy";

export type UserData = {
  age: number;
  height: number;
  weight: number;
  activity: Activity;
  goal: Goal;
  symptoms: string[];
};

export type Meal = {
  title: string;
  subtitle: string;
  ingredients: string[];
  steps: string[];
  benefits: string[];
  kcal: number;
  protein: number;
  prep: string;
};

export type NutritionResult = {
  calories: number;
  protein: number;
  fiber: number;
  water: number;
};

function getActivityMultiplier(
  activity: Activity
) {
  if (
    activity ===
    "sedentary"
  )
    return 1.2;

  if (
    activity === "light"
  )
    return 1.375;

  if (
    activity ===
    "moderate"
  )
    return 1.55;

  return 1.72;
}

export function calculateNutrition(
  data: UserData
): NutritionResult {
  const bmr =
    10 *
      data.weight +
    6.25 *
      data.height -
    5 *
      data.age -
    161;

  let calories =
    bmr *
    getActivityMultiplier(
      data.activity
    );

  if (
    data.goal ===
    "fat_loss"
  )
    calories -= 350;

  if (
    data.goal ===
    "tone"
  )
    calories -= 120;

  if (
    data.goal ===
    "energy"
  )
    calories += 120;

  const protein =
    Math.round(
      data.weight *
        1.6
    );

  const fiber =
    Math.max(
      25,
      Math.round(
        calories /
          80
      )
    );

  const water =
    (
      data.weight *
      0.033
    ).toFixed(1);

  return {
    calories:
      Math.round(
        calories
      ),
    protein,
    fiber,
    water:
      Number(water),
  };
}

/* -----------------------------
MEAL ENGINE
--------------------------------*/

function lowCalMeals(): Meal[] {
  return [
    {
      title:
        "Greek Yogurt Berry Bowl",
      subtitle:
        "Light fat-loss breakfast",
      ingredients: [
        "200g Greek yogurt",
        "Blueberries",
        "1 tbsp chia",
        "Cinnamon",
      ],
      steps: [
        "Add yogurt to bowl",
        "Top with berries",
        "Add chia",
      ],
      benefits: [
        "High protein",
        "Supports appetite control",
        "Hormone-friendly",
      ],
      kcal: 330,
      protein: 28,
      prep: "4 min",
    },
    {
      title:
        "Chicken Power Salad",
      subtitle:
        "Lean lunch for fat loss",
      ingredients: [
        "Chicken breast",
        "Spinach",
        "Cucumber",
        "Olive oil",
      ],
      steps: [
        "Cook chicken",
        "Slice vegetables",
        "Mix all together",
      ],
      benefits: [
        "Lean protein",
        "Low calorie density",
      ],
      kcal: 430,
      protein: 38,
      prep: "12 min",
    },
    {
      title:
        "Salmon Veg Plate",
      subtitle:
        "Balanced dinner",
      ingredients: [
        "Salmon fillet",
        "Broccoli",
        "Sweet potato",
      ],
      steps: [
        "Bake salmon",
        "Steam broccoli",
        "Roast potato",
      ],
      benefits: [
        "Omega-3 support",
        "Recovery",
      ],
      kcal: 520,
      protein: 35,
      prep: "20 min",
    },
    {
      title:
        "Apple Nut Snack",
      subtitle:
        "Smart snack",
      ingredients: [
        "Apple",
        "10 almonds",
      ],
      steps: [
        "Slice apple",
        "Serve with almonds",
      ],
      benefits: [
        "Fiber",
        "Stable energy",
      ],
      kcal: 180,
      protein: 5,
      prep: "2 min",
    },
  ];
}

function energyMeals(): Meal[] {
  return [
    {
      title:
        "Oats Energy Bowl",
      subtitle:
        "Morning fuel",
      ingredients: [
        "Oats",
        "Banana",
        "Protein yogurt",
      ],
      steps: [
        "Cook oats",
        "Top banana",
        "Serve yogurt",
      ],
      benefits: [
        "Long energy",
        "Fiber rich",
      ],
      kcal: 420,
      protein: 26,
      prep: "7 min",
    },
    {
      title:
        "Turkey Rice Bowl",
      subtitle:
        "Midday energy lunch",
      ingredients: [
        "Turkey mince",
        "Rice",
        "Vegetables",
      ],
      steps: [
        "Cook turkey",
        "Boil rice",
        "Combine",
      ],
      benefits: [
        "Protein + carbs",
      ],
      kcal: 560,
      protein: 40,
      prep: "15 min",
    },
    {
      title:
        "Steak & Veg",
      subtitle:
        "Iron-rich dinner",
      ingredients: [
        "Lean steak",
        "Green beans",
        "Potatoes",
      ],
      steps: [
        "Grill steak",
        "Cook veg",
        "Plate",
      ],
      benefits: [
        "Iron support",
        "Strength support",
      ],
      kcal: 620,
      protein: 42,
      prep: "18 min",
    },
    {
      title:
        "Dark Chocolate Bites",
      subtitle:
        "Energy snack",
      ingredients: [
        "Dark chocolate",
        "Walnuts",
      ],
      steps: [
        "Serve portion",
      ],
      benefits: [
        "Mood support",
      ],
      kcal: 210,
      protein: 4,
      prep: "1 min",
    },
  ];
}

function balanceMeals(): Meal[] {
  return [
    {
      title:
        "Hormone Glow Eggs",
      subtitle:
        "Balanced breakfast",
      ingredients: [
        "2 eggs",
        "Avocado",
        "Toast",
      ],
      steps: [
        "Cook eggs",
        "Toast bread",
        "Add avocado",
      ],
      benefits: [
        "Healthy fats",
        "Satiety",
      ],
      kcal: 390,
      protein: 24,
      prep: "8 min",
    },
    {
      title:
        "Mediterranean Lunch",
      subtitle:
        "Anti-inflammatory",
      ingredients: [
        "Chicken",
        "Tomato",
        "Olives",
        "Quinoa",
      ],
      steps: [
        "Cook quinoa",
        "Cook chicken",
        "Mix salad",
      ],
      benefits: [
        "Gut support",
        "Anti-inflammatory",
      ],
      kcal: 500,
      protein: 36,
      prep: "15 min",
    },
    {
      title:
        "Calm Evening Bowl",
      subtitle:
        "Light dinner",
      ingredients: [
        "Salmon",
        "Rice",
        "Zucchini",
      ],
      steps: [
        "Cook salmon",
        "Steam veg",
        "Serve",
      ],
      benefits: [
        "Sleep support",
      ],
      kcal: 510,
      protein: 34,
      prep: "18 min",
    },
    {
      title:
        "Kiwi Yogurt Cup",
      subtitle:
        "Hormone snack",
      ingredients: [
        "Greek yogurt",
        "Kiwi",
      ],
      steps: [
        "Combine and serve",
      ],
      benefits: [
        "Vitamin C",
        "Protein",
      ],
      kcal: 170,
      protein: 14,
      prep: "2 min",
    },
  ];
}

export function getMealPlan(
  calories: number
): Meal[] {
  if (
    calories <
    1700
  ) {
    return lowCalMeals();
  }

  if (
    calories >
    2100
  ) {
    return energyMeals();
  }

  return balanceMeals();
}
