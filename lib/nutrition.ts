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
  price: number; // Nova cena po obroku
};

export type NutritionResult = {
  calories: number;
  protein: number;
  fiber: number;
  water: number;
  dailyBudget: number; // Ukupan trošak za dan
  weeklyBudget: number; // Ukupan trošak za nedelju
};

function getActivityMultiplier(activity: Activity) {
  if (activity === "sedentary") return 1.2;
  if (activity === "light") return 1.375;
  if (activity === "moderate") return 1.55;
  return 1.72;
}

export function calculateNutrition(data: UserData): NutritionResult {
  const bmr =
    10 * data.weight + 6.25 * data.height - 5 * data.age - 161;

  let calories = bmr * getActivityMultiplier(data.activity);

  if (data.goal === "fat_loss") calories -= 350;
  if (data.goal === "tone") calories -= 120;
  if (data.goal === "energy") calories += 120;

  const finalCalories = Math.round(calories);
  const protein = Math.round(data.weight * 1.6);
  const fiber = Math.max(25, Math.round(finalCalories / 80));
  const water = (data.weight * 0.033).toFixed(1);

  // Dobijamo plan obroka da bismo izračunali budžet
  const currentMeals = getMealPlan(finalCalories);
  const dailyBudget = Number(currentMeals.reduce((sum, meal) => sum + meal.price, 0).toFixed(2));

  return {
    calories: finalCalories,
    protein,
    fiber,
    water: Number(water),
    dailyBudget,
    weeklyBudget: Number((dailyBudget * 7).toFixed(2)),
  };
}

/* -----------------------------
MEAL ENGINE (Budget Optimized)
Strategija: Visoka nutritivna vrednost uz niske troškove (ispod 9€/dan)
--------------------------------*/

function lowCalMeals(): Meal[] {
  return [
    {
      title: "Overnight Hormone Oats",
      subtitle: "Cheap, fast & anti-bloat breakfast",
      ingredients: ["Oats", "Flaxseeds", "Apple", "Cinnamon"],
      steps: ["Mix oats and seeds with water/milk", "Leave overnight", "Top with apple"],
      benefits: ["High fiber", "Digestive support", "Estrogen balance"],
      kcal: 330,
      protein: 12,
      prep: "2 min",
      price: 0.90,
    },
    {
      title: "Lemon Tuna & Bean Salad",
      subtitle: "Ultra-cheap high protein lunch",
      ingredients: ["Canned tuna", "White beans", "Spinach", "Lemon juice"],
      steps: ["Drain tuna and beans", "Mix with spinach", "Squeeze lemon"],
      benefits: ["Omega-3 support", "Lean protein", "Thyroid health"],
      kcal: 430,
      protein: 38,
      prep: "5 min",
      price: 1.80,
    },
    {
      title: "Golden Turmeric Eggs",
      subtitle: "Anti-inflammatory budget dinner",
      ingredients: ["3 Eggs", "Turmeric", "Frozen peas", "Whole grain toast"],
      steps: ["Whisk eggs with turmeric", "Scramble with peas", "Serve on toast"],
      benefits: ["Liver support", "Cortisol regulation"],
      kcal: 490,
      protein: 32,
      prep: "8 min",
      price: 1.40,
    },
    {
      title: "Cinnamon Apple Snack",
      subtitle: "Smart budget metabolism snack",
      ingredients: ["Apple", "Cinnamon", "Handful of sunflower seeds"],
      steps: ["Slice apple", "Dust with cinnamon", "Add seeds"],
      benefits: ["Stable blood sugar", "Magnesium source"],
      kcal: 180,
      protein: 5,
      prep: "2 min",
      price: 0.60,
    },
  ];
}

function energyMeals(): Meal[] {
  return [
    {
      title: "Power Banana Pancakes",
      subtitle: "Energy fuel morning meal",
      ingredients: ["2 Eggs", "1 Banana", "Oats", "Peanut butter"],
      steps: ["Mash banana", "Mix with eggs and oats", "Fry on pan", "Top with PB"],
      benefits: ["Potassium", "Complex carbs", "Muscle fuel"],
      kcal: 480,
      protein: 24,
      prep: "10 min",
      price: 1.20,
    },
    {
      title: "Beef & Potato Skillet",
      subtitle: "Iron-rich power lunch",
      ingredients: ["Lean ground beef", "Potatoes", "Onions", "Carrots"],
      steps: ["Sauté onions and beef", "Add cubed potatoes", "Cook until tender"],
      benefits: ["Iron for energy", "B-vitamins", "Strength support"],
      kcal: 620,
      protein: 40,
      prep: "18 min",
      price: 2.60,
    },
    {
      title: "Lentil Pasta Glow",
      subtitle: "High protein economy dinner",
      ingredients: ["Red lentil pasta", "Tomato sauce", "Zucchini"],
      steps: ["Boil pasta", "Mix with sauce and sautéed zucchini"],
      benefits: ["Plant-based protein", "Bloat-free carbs"],
      kcal: 580,
      protein: 35,
      prep: "12 min",
      price: 1.70,
    },
    {
      title: "Boiled Eggs & Almonds",
      subtitle: "Portable protein power",
      ingredients: ["2 Eggs", "15 Almonds"],
      steps: ["Boil eggs", "Serve with nuts"],
      benefits: ["Vitamin E", "Hormone building blocks"],
      kcal: 240,
      protein: 16,
      prep: "8 min",
      price: 1.00,
    },
  ];
}

function balanceMeals(): Meal[] {
  return [
    {
      title: "Greek Protein Bowl",
      subtitle: "Hormone glow breakfast",
      ingredients: ["Greek yogurt", "Sunflower seeds", "Frozen berries"],
      steps: ["Add yogurt to bowl", "Top with seeds and berries"],
      benefits: ["Probiotics", "Skin health", "Satiety"],
      kcal: 390,
      protein: 26,
      prep: "3 min",
      price: 1.30,
    },
    {
      title: "Mediterranean Chickpea Chicken",
      subtitle: "Anti-inflammatory lunch",
      ingredients: ["Chicken breast", "Chickpeas", "Cucumber", "Olives"],
      steps: ["Cook chicken", "Mix with chickpeas and veg", "Add olives"],
      benefits: ["Blood sugar balance", "Gut support"],
      kcal: 510,
      protein: 42,
      prep: "15 min",
      price: 2.20,
    },
    {
      title: "Sardine & Sweet Potato Plate",
      subtitle: "Ultimate hormone dinner (Budget)",
      ingredients: ["Canned sardines", "Sweet potato", "Green beans"],
      steps: ["Bake sweet potato", "Steam beans", "Serve with sardines"],
      benefits: ["Omega-3 boost", "Progesterone support"],
      kcal: 520,
      protein: 34,
      prep: "20 min",
      price: 1.90,
    },
    {
      title: "Kiwi & Seeds Pot",
      subtitle: "Light hormone snack",
      ingredients: ["1 Kiwi", "1 tbsp Flaxseeds", "Small yogurt"],
      steps: ["Mix flax with yogurt", "Top with sliced kiwi"],
      benefits: ["Vitamin C", "Digestive health"],
      kcal: 170,
      protein: 10,
      prep: "2 min",
      price: 0.80,
    },
  ];
}

export function getMealPlan(calories: number): Meal[] {
  if (calories < 1700) {
    return lowCalMeals();
  }
  if (calories > 2100) {
    return energyMeals();
  }
  return balanceMeals();
}
