export type Activity =
  | "sedentary"
  | "light"
  | "moderate"
  | "active";

export type Goal =
  | "fat_loss"
  | "tone"
  | "maintain"
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
  kcal: number;
  protein: number;
  prep: string;
  ingredients: string[];
  steps: string[];
};

export function calculateNutrition(
  data: UserData
) {
  const bmr =
    10 * data.weight +
    6.25 * data.height -
    5 * data.age -
    161;

  const multipliers = {
    sedentary: 1.2,
    light: 1.35,
    moderate: 1.5,
    active: 1.7,
  };

  let calories = Math.round(
    bmr *
      multipliers[
        data.activity
      ]
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
    calories -= 150;

  if (
    data.goal ===
    "energy"
  )
    calories += 150;

  const protein =
    Math.round(
      data.weight * 1.7
    );

  const fiber = 28;

  const water =
    (
      data.weight *
      0.033
    ).toFixed(1);

  return {
    calories,
    protein,
    fiber,
    water,
  };
}

export function getMealPlan(
  calories: number
): Meal[] {
  if (calories < 1650) {
    return lowPlan();
  }

  if (calories < 2100) {
    return mediumPlan();
  }

  return highPlan();
}

function lowPlan(): Meal[] {
  return [
    {
      title:
        "Greek Yogurt Berry Bowl",
      subtitle:
        "High protein metabolism breakfast",
      kcal: 390,
      protein: 28,
      prep: "5 min",
      ingredients: [
        "200g greek yogurt",
        "80g berries",
        "20g oats",
        "1 tsp chia",
      ],
      steps: [
        "Add yogurt to bowl",
        "Top with berries",
        "Add oats + chia",
      ],
    },
    {
      title:
        "Chicken Salad Bowl",
      subtitle:
        "Lean lunch for fat loss",
      kcal: 470,
      protein: 42,
      prep: "10 min",
      ingredients: [
        "130g chicken breast",
        "greens",
        "tomato",
        "olive oil",
      ],
      steps: [
        "Cook chicken",
        "Slice vegetables",
        "Combine and season",
      ],
    },
    {
      title:
        "Salmon Vegetables",
      subtitle:
        "Omega-3 hormone support",
      kcal: 520,
      protein: 38,
      prep: "20 min",
      ingredients: [
        "150g salmon",
        "broccoli",
        "sweet potato",
      ],
      steps: [
        "Bake salmon",
        "Steam broccoli",
        "Roast potato",
      ],
    },
    {
      title:
        "Apple + Almonds",
      subtitle:
        "Smart snack",
      kcal: 220,
      protein: 7,
      prep: "1 min",
      ingredients: [
        "1 apple",
        "20g almonds",
      ],
      steps: [
        "Serve together",
      ],
    },
  ];
}

function mediumPlan(): Meal[] {
  return [
    {
      title:
        "Protein Oats Bowl",
      subtitle:
        "Balanced energy breakfast",
      kcal: 520,
      protein: 34,
      prep: "7 min",
      ingredients: [
        "50g oats",
        "protein yogurt",
        "banana",
      ],
      steps: [
        "Cook oats",
        "Top with yogurt",
        "Add banana",
      ],
    },
    {
      title:
        "Turkey Rice Bowl",
      subtitle:
        "Lean lunch",
      kcal: 610,
      protein: 45,
      prep: "15 min",
      ingredients: [
        "150g turkey",
        "rice",
        "vegetables",
      ],
      steps: [
        "Cook turkey",
        "Cook rice",
        "Mix vegetables",
      ],
    },
    {
      title:
        "Beef Power Plate",
      subtitle:
        "Strength dinner",
      kcal: 650,
      protein: 48,
      prep: "20 min",
      ingredients: [
        "150g beef",
        "potatoes",
        "greens",
      ],
      steps: [
        "Cook beef",
        "Bake potatoes",
        "Serve greens",
      ],
    },
    {
      title:
        "Protein Shake",
      subtitle:
        "Recovery snack",
      kcal: 260,
      protein: 25,
      prep: "1 min",
      ingredients: [
        "protein powder",
        "milk",
      ],
      steps: [
        "Blend and serve",
      ],
    },
  ];
}

function highPlan(): Meal[] {
  return [
    {
      title:
        "Athlete Breakfast",
      subtitle:
        "High output start",
      kcal: 650,
      protein: 38,
      prep: "10 min",
      ingredients: [
        "eggs",
        "toast",
        "fruit",
      ],
      steps: [
        "Cook eggs",
        "Toast bread",
        "Serve fruit",
      ],
    },
    {
      title:
        "Chicken Pasta Bowl",
      subtitle:
        "Performance lunch",
      kcal: 760,
      protein: 50,
      prep: "20 min",
      ingredients: [
        "chicken",
        "pasta",
        "veg",
      ],
      steps: [
        "Cook pasta",
        "Cook chicken",
        "Combine",
      ],
    },
    {
      title:
        "Salmon Rice Dinner",
      subtitle:
        "Recovery dinner",
      kcal: 790,
      protein: 48,
      prep: "20 min",
      ingredients: [
        "salmon",
        "rice",
        "veg",
      ],
      steps: [
        "Cook salmon",
        "Cook rice",
        "Serve together",
      ],
    },
    {
      title:
        "Greek Yogurt Snack",
      subtitle:
        "Extra protein",
      kcal: 280,
      protein: 22,
      prep: "1 min",
      ingredients: [
        "greek yogurt",
        "berries",
      ],
      steps: [
        "Serve chilled",
      ],
    },
  ];
}
