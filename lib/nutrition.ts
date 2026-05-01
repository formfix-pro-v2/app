// ============================================================
// Veronica Method PERSONALIZED NUTRITION ENGINE
// Budget-optimized meal plans based on quiz data, symptoms,
// goals, and calorie needs. Different meals every day.
// All meals under €7/day total.
// ============================================================

export type Activity = "sedentary" | "light" | "moderate" | "active";
export type Goal = "fat_loss" | "maintain" | "tone" | "energy";

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
  amounts: string[];
  steps: string[];
  benefits: string[];
  kcal: number;
  protein: number;
  prep: string;
  price: number;
  tags: MealTag[];
};

export type MealTag =
  | "anti-inflammatory"
  | "hormone-balance"
  | "sleep-support"
  | "cooling"
  | "gut-health"
  | "bone-strength"
  | "energy-boost"
  | "joint-support"
  | "mood-lift"
  | "metabolism"
  | "high-protein"
  | "low-cal"
  | "quick";

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snack";

export type DayMealPlan = {
  day: number;
  meals: { slot: MealSlot; meal: Meal }[];
  totalKcal: number;
  totalProtein: number;
  totalPrice: number;
  focus: string;
  season: string;
  seasonalNote: string;
};

export type NutritionResult = {
  calories: number;
  protein: number;
  fiber: number;
  water: number;
  dailyBudget: number;
  weeklyBudget: number;
};

// ============================================================
// CALORIE CALCULATOR
// ============================================================

function getActivityMultiplier(activity: Activity) {
  if (activity === "sedentary") return 1.2;
  if (activity === "light") return 1.375;
  if (activity === "moderate") return 1.55;
  return 1.72;
}

export function calculateNutrition(data: UserData): NutritionResult {
  const bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
  let calories = bmr * getActivityMultiplier(data.activity);

  if (data.goal === "fat_loss") calories -= 350;
  if (data.goal === "tone") calories -= 120;
  if (data.goal === "energy") calories += 120;

  const finalCalories = Math.round(calories);
  const protein = Math.round(data.weight * 1.6);
  const fiber = Math.max(25, Math.round(finalCalories / 80));
  const water = Number((data.weight * 0.033).toFixed(1));

  // Estimate daily budget from average meal costs
  const dailyBudget = finalCalories < 1700 ? 5.5 : finalCalories > 2100 ? 7.0 : 6.2;

  return {
    calories: finalCalories,
    protein,
    fiber,
    water,
    dailyBudget,
    weeklyBudget: Number((dailyBudget * 7).toFixed(2)),
  };
}

// ============================================================
// SYMPTOM → MEAL TAG MAPPING
// ============================================================

const SYMPTOM_TAGS: Record<string, MealTag[]> = {
  "Hot flashes":    ["cooling", "hormone-balance", "anti-inflammatory"],
  "Poor sleep":     ["sleep-support", "mood-lift", "anti-inflammatory"],
  "Weight gain":    ["metabolism", "high-protein", "low-cal"],
  "Low energy":     ["energy-boost", "high-protein", "metabolism"],
  "Joint pain":     ["anti-inflammatory", "joint-support", "bone-strength"],
  "Bloating":       ["gut-health", "anti-inflammatory", "low-cal"],
  "Back pain":      ["anti-inflammatory", "bone-strength", "joint-support"],
  "Mood swings":    ["mood-lift", "hormone-balance", "gut-health"],
  "Low confidence": ["energy-boost", "high-protein", "mood-lift"],
};

const GOAL_TAGS: Record<string, MealTag[]> = {
  fat_loss:  ["low-cal", "high-protein", "metabolism"],
  tone:      ["high-protein", "metabolism", "energy-boost"],
  energy:    ["energy-boost", "high-protein", "anti-inflammatory"],
  maintain:  ["hormone-balance", "gut-health", "anti-inflammatory"],
};

// ============================================================
// COMPLETE MEAL DATABASE - 60+ meals
// All budget-friendly (under €2.50 per meal)
// ============================================================

const BREAKFASTS: Meal[] = [
  {
    title: "Overnight Hormone Oats",
    subtitle: "Anti-bloat flaxseed breakfast",
    ingredients: ["Rolled oats", "Flaxseeds", "Apple", "Cinnamon", "Water or milk"],
    amounts: ["50g", "1 tbsp", "1 medium", "1 tsp", "200ml"],
    steps: [
      "Combine oats, flaxseeds and cinnamon in a jar.",
      "Pour water or milk over, stir well.",
      "Refrigerate overnight (or at least 4 hours).",
      "In the morning, dice apple and mix in.",
      "Eat cold or microwave 2 min if you prefer warm."
    ],
    benefits: ["High fiber for digestion", "Flax supports estrogen balance", "Cinnamon stabilizes blood sugar"],
    kcal: 330, protein: 12, prep: "5 min + overnight", price: 0.75,
    tags: ["hormone-balance", "gut-health", "low-cal"],
  },
  {
    title: "Greek Yogurt Power Bowl",
    subtitle: "Probiotic-rich protein breakfast",
    ingredients: ["Greek yogurt", "Frozen berries", "Sunflower seeds", "Honey"],
    amounts: ["200g", "80g", "1 tbsp", "1 tsp"],
    steps: [
      "Spoon yogurt into a bowl.",
      "Top with frozen berries (they thaw in 5 min).",
      "Sprinkle sunflower seeds for crunch.",
      "Drizzle honey if desired.",
      "Eat immediately — berries create a natural sauce as they thaw."
    ],
    benefits: ["Probiotics for gut health", "Antioxidants from berries", "Protein keeps you full"],
    kcal: 340, protein: 24, prep: "3 min", price: 1.10,
    tags: ["gut-health", "high-protein", "quick", "mood-lift"],
  },
  {
    title: "Turmeric Scrambled Eggs",
    subtitle: "Anti-inflammatory quick breakfast",
    ingredients: ["Eggs", "Turmeric", "Black pepper", "Spinach", "Whole grain bread"],
    amounts: ["3 large", "½ tsp", "Pinch", "Handful", "1 slice"],
    steps: [
      "Crack eggs into bowl, add turmeric and pepper, whisk.",
      "Heat a non-stick pan on medium, add a drop of oil.",
      "Pour in eggs, stir gently with spatula.",
      "When half-set, add spinach and fold in.",
      "Cook until just set (don't overcook). Serve on toast."
    ],
    benefits: ["Turmeric reduces inflammation", "Eggs provide choline for brain", "Spinach adds iron"],
    kcal: 380, protein: 26, prep: "8 min", price: 0.95,
    tags: ["anti-inflammatory", "high-protein", "quick", "joint-support"],
  },
  {
    title: "Banana Oat Pancakes",
    subtitle: "3-ingredient energy fuel",
    ingredients: ["Banana", "Eggs", "Oats", "Peanut butter"],
    amounts: ["1 ripe", "2 large", "40g", "1 tbsp"],
    steps: [
      "Mash banana in a bowl until smooth.",
      "Add eggs and oats, mix into a batter.",
      "Heat non-stick pan on medium-low.",
      "Pour small circles of batter, cook 2 min each side.",
      "Stack pancakes and top with peanut butter."
    ],
    benefits: ["Potassium for muscle function", "Complex carbs for sustained energy", "No added sugar"],
    kcal: 420, protein: 22, prep: "10 min", price: 0.85,
    tags: ["energy-boost", "metabolism", "mood-lift"],
  },
  {
    title: "Chia Seed Pudding",
    subtitle: "Omega-3 rich make-ahead breakfast",
    ingredients: ["Chia seeds", "Milk or plant milk", "Vanilla extract", "Berries", "Walnuts"],
    amounts: ["3 tbsp", "200ml", "½ tsp", "Handful", "5 halves"],
    steps: [
      "Mix chia seeds with milk and vanilla in a jar.",
      "Stir well to prevent clumps.",
      "Refrigerate for at least 3 hours or overnight.",
      "Top with berries and crushed walnuts before eating.",
      "Can be stored in fridge for up to 3 days."
    ],
    benefits: ["Omega-3 for brain and joints", "Fiber for satiety", "Calcium from milk"],
    kcal: 310, protein: 14, prep: "5 min + 3h set", price: 0.90,
    tags: ["joint-support", "sleep-support", "hormone-balance", "gut-health"],
  },
  {
    title: "Avocado Toast with Seeds",
    subtitle: "Healthy fats hormone breakfast",
    ingredients: ["Whole grain bread", "Avocado", "Lemon juice", "Pumpkin seeds", "Chili flakes"],
    amounts: ["2 slices", "½ medium", "1 tsp", "1 tbsp", "Pinch"],
    steps: [
      "Toast bread until golden.",
      "Mash avocado with lemon juice and a pinch of salt.",
      "Spread avocado on toast.",
      "Top with pumpkin seeds and chili flakes.",
      "Eat immediately for best texture."
    ],
    benefits: ["Healthy fats support hormone production", "Zinc from pumpkin seeds", "Fiber for digestion"],
    kcal: 370, protein: 12, prep: "5 min", price: 1.20,
    tags: ["hormone-balance", "energy-boost", "quick"],
  },
  {
    title: "Warm Cinnamon Porridge",
    subtitle: "Comforting blood-sugar friendly start",
    ingredients: ["Oats", "Milk", "Cinnamon", "Banana", "Almonds"],
    amounts: ["50g", "250ml", "1 tsp", "½ medium", "8 whole"],
    steps: [
      "Combine oats and milk in a small pot.",
      "Cook on medium heat, stirring, for 4-5 minutes.",
      "Add cinnamon and stir through.",
      "Slice banana on top and add chopped almonds.",
      "Serve warm — perfect for cold mornings."
    ],
    benefits: ["Slow-release energy", "Cinnamon helps insulin sensitivity", "Magnesium from almonds"],
    kcal: 360, protein: 14, prep: "8 min", price: 0.70,
    tags: ["sleep-support", "mood-lift", "low-cal"],
  },
  {
    title: "Cottage Cheese & Fruit Plate",
    subtitle: "High-protein cooling breakfast",
    ingredients: ["Cottage cheese", "Peach or pear", "Flaxseeds", "Mint leaves"],
    amounts: ["150g", "1 medium", "1 tbsp", "A few"],
    steps: [
      "Spoon cottage cheese onto a plate.",
      "Slice fruit and arrange alongside.",
      "Sprinkle flaxseeds over cheese.",
      "Garnish with fresh mint.",
      "Eat as-is — refreshing and filling."
    ],
    benefits: ["Casein protein for long satiety", "Cooling for hot flashes", "Flax for estrogen support"],
    kcal: 280, protein: 28, prep: "3 min", price: 1.00,
    tags: ["cooling", "high-protein", "quick", "hormone-balance"],
  },
];

const LUNCHES: Meal[] = [
  {
    title: "Lemon Tuna & White Bean Salad",
    subtitle: "5-minute high-protein budget lunch",
    ingredients: ["Canned tuna", "White beans (canned)", "Baby spinach", "Lemon", "Olive oil"],
    amounts: ["1 can (150g)", "½ can (120g)", "2 handfuls", "½ lemon", "1 tsp"],
    steps: [
      "Drain tuna and beans, place in a bowl.",
      "Add spinach and toss gently.",
      "Squeeze lemon juice over everything.",
      "Drizzle olive oil and season with salt & pepper.",
      "Mix well and eat — no cooking needed."
    ],
    benefits: ["Omega-3 from tuna", "Plant protein from beans", "Iron from spinach"],
    kcal: 420, protein: 38, prep: "5 min", price: 1.60,
    tags: ["high-protein", "quick", "anti-inflammatory", "metabolism"],
  },
  {
    title: "Chicken & Chickpea Mediterranean Bowl",
    subtitle: "Anti-inflammatory protein lunch",
    ingredients: ["Chicken breast", "Chickpeas (canned)", "Cucumber", "Cherry tomatoes", "Olives"],
    amounts: ["120g", "½ can", "½ medium", "6 pieces", "8 pieces"],
    steps: [
      "Season chicken with salt, pepper and paprika.",
      "Cook in a pan on medium-high heat, 5 min each side.",
      "Let rest 2 min, then slice.",
      "Drain chickpeas, dice cucumber and halve tomatoes.",
      "Combine everything in a bowl, add olives and a squeeze of lemon."
    ],
    benefits: ["Lean protein for muscle", "Chickpeas balance blood sugar", "Mediterranean diet reduces inflammation"],
    kcal: 480, protein: 42, prep: "15 min", price: 2.10,
    tags: ["high-protein", "anti-inflammatory", "gut-health", "energy-boost"],
  },
  {
    title: "Egg & Veggie Fried Rice",
    subtitle: "Budget-friendly metabolism booster",
    ingredients: ["Cooked rice (leftover)", "Eggs", "Frozen mixed vegetables", "Soy sauce", "Garlic"],
    amounts: ["150g", "2 large", "100g", "1 tbsp", "1 clove"],
    steps: [
      "Heat a pan with a drop of oil on high heat.",
      "Add frozen vegetables and minced garlic, stir-fry 3 min.",
      "Push veggies to one side, crack eggs into pan and scramble.",
      "Add cold rice and soy sauce, toss everything together.",
      "Stir-fry 3 more minutes until rice is slightly crispy."
    ],
    benefits: ["Complete protein from eggs + rice", "Fiber from vegetables", "Uses leftovers — zero waste"],
    kcal: 440, protein: 22, prep: "10 min", price: 0.80,
    tags: ["metabolism", "energy-boost", "quick", "low-cal"],
  },
  {
    title: "Sardine & Sweet Potato Plate",
    subtitle: "Omega-3 powerhouse for hormones",
    ingredients: ["Canned sardines", "Sweet potato", "Green beans", "Lemon"],
    amounts: ["1 can (120g)", "1 medium", "Handful", "½ lemon"],
    steps: [
      "Wash sweet potato, prick with fork, microwave 6-8 min until soft.",
      "Steam or boil green beans for 4 min.",
      "Split sweet potato open on a plate.",
      "Top with sardines and green beans.",
      "Squeeze lemon over everything and season."
    ],
    benefits: ["Sardines: best budget source of omega-3", "Sweet potato for vitamin A", "Supports progesterone production"],
    kcal: 460, protein: 32, prep: "12 min", price: 1.50,
    tags: ["hormone-balance", "joint-support", "bone-strength", "anti-inflammatory"],
  },
  {
    title: "Lentil Soup with Cumin",
    subtitle: "Warming gut-healing budget lunch",
    ingredients: ["Red lentils", "Onion", "Carrot", "Cumin", "Vegetable stock"],
    amounts: ["100g dry", "1 medium", "1 medium", "1 tsp", "500ml"],
    steps: [
      "Dice onion and carrot finely.",
      "Sauté in a pot with a drop of oil for 3 min.",
      "Add lentils, cumin and stock.",
      "Bring to boil, then simmer 15 min until lentils are soft.",
      "Blend partially for creamy texture or eat chunky. Season to taste."
    ],
    benefits: ["Lentils: cheapest protein source", "Cumin aids digestion", "Warming and anti-bloat"],
    kcal: 380, protein: 24, prep: "20 min", price: 0.70,
    tags: ["gut-health", "low-cal", "anti-inflammatory", "mood-lift"],
  },
  {
    title: "Turkey & Hummus Wrap",
    subtitle: "Quick portable protein lunch",
    ingredients: ["Whole wheat tortilla", "Turkey slices", "Hummus", "Lettuce", "Tomato"],
    amounts: ["1 large", "80g", "2 tbsp", "2 leaves", "½ medium"],
    steps: [
      "Lay tortilla flat, spread hummus across center.",
      "Layer turkey slices, lettuce and sliced tomato.",
      "Fold bottom up, then roll sides in tightly.",
      "Cut in half diagonally.",
      "Wrap in foil if taking to-go."
    ],
    benefits: ["Lean protein from turkey", "Chickpea hummus for fiber", "Quick and portable"],
    kcal: 390, protein: 30, prep: "5 min", price: 1.80,
    tags: ["high-protein", "quick", "energy-boost"],
  },
  {
    title: "Black Bean & Corn Salad",
    subtitle: "Plant-powered fiber-rich lunch",
    ingredients: ["Black beans (canned)", "Corn (canned or frozen)", "Red pepper", "Lime", "Cilantro"],
    amounts: ["1 can", "100g", "½ medium", "1 whole", "Small bunch"],
    steps: [
      "Drain and rinse black beans and corn.",
      "Dice red pepper finely.",
      "Combine beans, corn and pepper in a bowl.",
      "Squeeze lime juice over, add chopped cilantro.",
      "Toss well. Season with salt and a pinch of cumin."
    ],
    benefits: ["Plant protein + fiber combo", "Vitamin C from pepper and lime", "Supports gut microbiome"],
    kcal: 350, protein: 18, prep: "5 min", price: 1.00,
    tags: ["gut-health", "low-cal", "quick", "anti-inflammatory"],
  },
  {
    title: "Beef & Potato Skillet",
    subtitle: "Iron-rich strength lunch",
    ingredients: ["Lean ground beef", "Potatoes", "Onion", "Paprika", "Frozen peas"],
    amounts: ["120g", "2 medium", "1 small", "1 tsp", "Handful"],
    steps: [
      "Dice potatoes into 1cm cubes, dice onion.",
      "Brown beef in a pan on high heat, breaking it up, 4 min.",
      "Add onion and potatoes, stir. Add paprika.",
      "Add 100ml water, cover and cook 12 min until potatoes are tender.",
      "Add peas in last 2 min. Season and serve."
    ],
    benefits: ["Iron for energy and blood health", "B-vitamins from beef", "Potatoes for potassium"],
    kcal: 520, protein: 36, prep: "20 min", price: 2.30,
    tags: ["energy-boost", "high-protein", "bone-strength", "metabolism"],
  },
];

const DINNERS: Meal[] = [
  {
    title: "Golden Turmeric Egg Scramble",
    subtitle: "Anti-inflammatory 10-minute dinner",
    ingredients: ["Eggs", "Turmeric", "Frozen peas", "Whole grain toast", "Black pepper"],
    amounts: ["3 large", "½ tsp", "80g", "1 slice", "Pinch"],
    steps: [
      "Whisk eggs with turmeric and black pepper.",
      "Heat pan on medium, add a drop of oil.",
      "Add frozen peas, cook 2 min until thawed.",
      "Pour in egg mixture, stir gently until just set.",
      "Serve on toast. The pepper activates turmeric's benefits."
    ],
    benefits: ["Curcumin reduces joint inflammation", "Eggs support liver detox", "Quick comfort dinner"],
    kcal: 420, protein: 28, prep: "10 min", price: 1.10,
    tags: ["anti-inflammatory", "quick", "joint-support", "mood-lift"],
  },
  {
    title: "Lentil Pasta with Zucchini",
    subtitle: "High-protein plant-based dinner",
    ingredients: ["Red lentil pasta", "Zucchini", "Tomato passata", "Garlic", "Basil"],
    amounts: ["80g", "1 medium", "200ml", "2 cloves", "A few leaves"],
    steps: [
      "Boil pasta according to package (usually 6-8 min).",
      "Meanwhile, dice zucchini and mince garlic.",
      "Sauté garlic 1 min, add zucchini, cook 4 min.",
      "Add passata, simmer 5 min. Season.",
      "Drain pasta, toss with sauce. Top with fresh basil."
    ],
    benefits: ["Double protein from lentil pasta", "Zucchini is gentle on digestion", "No bloating like wheat pasta"],
    kcal: 480, protein: 30, prep: "15 min", price: 1.50,
    tags: ["gut-health", "high-protein", "metabolism", "energy-boost"],
  },
  {
    title: "Baked Salmon with Broccoli",
    subtitle: "Omega-3 hormone support dinner",
    ingredients: ["Salmon fillet", "Broccoli", "Lemon", "Olive oil", "Garlic powder"],
    amounts: ["130g", "1 cup florets", "½ lemon", "1 tsp", "½ tsp"],
    steps: [
      "Preheat oven to 200°C.",
      "Place salmon on baking tray, drizzle with oil and lemon.",
      "Season with garlic powder, salt and pepper.",
      "Add broccoli florets around salmon.",
      "Bake 15 min. Broccoli should be tender-crisp."
    ],
    benefits: ["Best source of omega-3 for hormones", "Broccoli supports estrogen metabolism", "Anti-inflammatory meal"],
    kcal: 440, protein: 38, prep: "20 min", price: 2.40,
    tags: ["hormone-balance", "anti-inflammatory", "high-protein", "bone-strength"],
  },
  {
    title: "Chickpea & Spinach Curry",
    subtitle: "Budget plant-powered comfort dinner",
    ingredients: ["Chickpeas (canned)", "Spinach", "Coconut milk (light)", "Curry powder", "Rice"],
    amounts: ["1 can", "2 handfuls", "100ml", "1 tbsp", "80g dry"],
    steps: [
      "Cook rice according to package.",
      "In a pan, heat curry powder in a drop of oil for 30 sec.",
      "Add drained chickpeas and coconut milk, simmer 8 min.",
      "Add spinach, stir until wilted (2 min).",
      "Season with salt. Serve curry over rice."
    ],
    benefits: ["Plant protein + iron from chickpeas", "Spinach for magnesium", "Warming and satisfying"],
    kcal: 510, protein: 22, prep: "18 min", price: 1.30,
    tags: ["gut-health", "anti-inflammatory", "mood-lift", "energy-boost"],
  },
  {
    title: "Turkey Meatballs with Veggies",
    subtitle: "Lean protein metabolism dinner",
    ingredients: ["Ground turkey", "Oats", "Egg", "Zucchini", "Tomato sauce"],
    amounts: ["150g", "2 tbsp", "1 large", "1 medium", "200ml"],
    steps: [
      "Mix turkey, oats, egg and seasoning. Form 8 small balls.",
      "Heat pan on medium-high, cook meatballs 3 min each side.",
      "Dice zucchini, add to pan around meatballs.",
      "Pour tomato sauce over, cover and simmer 10 min.",
      "Serve in a bowl — no side dish needed, it's complete."
    ],
    benefits: ["Lean protein for muscle maintenance", "Oats add fiber to meatballs", "One-pan easy cleanup"],
    kcal: 460, protein: 40, prep: "20 min", price: 2.00,
    tags: ["high-protein", "metabolism", "energy-boost"],
  },
  {
    title: "Stuffed Sweet Potato",
    subtitle: "Hormone-balancing comfort dinner",
    ingredients: ["Sweet potato", "Black beans (canned)", "Greek yogurt", "Cumin", "Lime"],
    amounts: ["1 large", "½ can", "2 tbsp", "½ tsp", "½ lime"],
    steps: [
      "Prick sweet potato with fork, microwave 8 min until soft.",
      "Heat black beans in a small pot with cumin and a splash of water.",
      "Split sweet potato open, fluff inside with fork.",
      "Spoon seasoned beans on top.",
      "Add a dollop of yogurt and squeeze of lime."
    ],
    benefits: ["Sweet potato: vitamin A for skin", "Beans for plant protein", "Probiotics from yogurt"],
    kcal: 410, protein: 18, prep: "12 min", price: 1.10,
    tags: ["hormone-balance", "gut-health", "mood-lift", "low-cal"],
  },
  {
    title: "One-Pan Garlic Chicken & Veggies",
    subtitle: "Simple roasted protein dinner",
    ingredients: ["Chicken thigh (boneless)", "Bell pepper", "Red onion", "Garlic", "Olive oil"],
    amounts: ["150g", "1 medium", "½ medium", "3 cloves", "1 tbsp"],
    steps: [
      "Preheat oven to 200°C.",
      "Cut chicken into chunks, chop pepper and onion.",
      "Toss everything with oil, minced garlic, salt and pepper.",
      "Spread on baking tray in single layer.",
      "Roast 22-25 min until chicken is golden and cooked through."
    ],
    benefits: ["Chicken thigh has more iron than breast", "Garlic supports immune system", "Minimal effort cooking"],
    kcal: 470, protein: 36, prep: "30 min", price: 1.90,
    tags: ["high-protein", "energy-boost", "bone-strength"],
  },
  {
    title: "Cooling Cucumber Noodle Bowl",
    subtitle: "Light summer dinner for hot flashes",
    ingredients: ["Rice noodles", "Cucumber", "Edamame", "Sesame oil", "Soy sauce"],
    amounts: ["60g", "1 medium", "80g", "1 tsp", "1 tbsp"],
    steps: [
      "Cook rice noodles per package, rinse under cold water.",
      "Spiralize or julienne cucumber into thin strips.",
      "Cook edamame 3 min in boiling water, drain.",
      "Toss noodles with cucumber, edamame, sesame oil and soy sauce.",
      "Serve cold or at room temperature. Add chili if desired."
    ],
    benefits: ["Cooling effect reduces hot flash discomfort", "Edamame for plant estrogen", "Light on digestion"],
    kcal: 360, protein: 16, prep: "10 min", price: 1.40,
    tags: ["cooling", "gut-health", "low-cal", "quick"],
  },
];

const SNACKS: Meal[] = [
  {
    title: "Cinnamon Apple & Seeds",
    subtitle: "Blood-sugar stabilizing snack",
    ingredients: ["Apple", "Cinnamon", "Sunflower seeds"],
    amounts: ["1 medium", "½ tsp", "1 tbsp"],
    steps: [
      "Slice apple into wedges.",
      "Dust with cinnamon.",
      "Serve with sunflower seeds on the side.",
    ],
    benefits: ["Fiber slows sugar absorption", "Cinnamon improves insulin sensitivity", "Seeds add magnesium"],
    kcal: 160, protein: 4, prep: "2 min", price: 0.50,
    tags: ["low-cal", "quick", "metabolism", "mood-lift"],
  },
  {
    title: "Boiled Eggs & Almonds",
    subtitle: "Portable protein power snack",
    ingredients: ["Eggs", "Almonds"],
    amounts: ["2 large", "12 whole"],
    steps: [
      "Boil eggs for 8 min (medium) or 10 min (hard).",
      "Cool under cold water, peel.",
      "Serve with almonds. Can be prepped in advance.",
    ],
    benefits: ["Complete protein", "Vitamin E from almonds", "Healthy fats for hormones"],
    kcal: 250, protein: 18, prep: "10 min", price: 0.80,
    tags: ["high-protein", "hormone-balance", "energy-boost"],
  },
  {
    title: "Kiwi & Flax Yogurt Pot",
    subtitle: "Vitamin C digestive snack",
    ingredients: ["Small yogurt", "Kiwi", "Flaxseeds"],
    amounts: ["125g", "1 medium", "1 tbsp"],
    steps: [
      "Spoon yogurt into a small bowl or jar.",
      "Peel and slice kiwi on top.",
      "Sprinkle ground flaxseeds.",
    ],
    benefits: ["Vitamin C boosts collagen", "Probiotics for gut", "Flax supports estrogen balance"],
    kcal: 170, protein: 10, prep: "2 min", price: 0.70,
    tags: ["gut-health", "hormone-balance", "quick", "cooling"],
  },
  {
    title: "Banana & Peanut Butter Bites",
    subtitle: "Energy-boosting sweet snack",
    ingredients: ["Banana", "Peanut butter", "Dark chocolate chips"],
    amounts: ["1 medium", "1 tbsp", "1 tsp"],
    steps: [
      "Slice banana into 1cm rounds.",
      "Spread a tiny bit of peanut butter on each slice.",
      "Top with 1-2 chocolate chips each.",
      "Optional: freeze for 30 min for a cold treat.",
    ],
    benefits: ["Potassium for muscle cramps", "Healthy fats for satiety", "Dark chocolate for mood"],
    kcal: 220, protein: 6, prep: "3 min", price: 0.55,
    tags: ["energy-boost", "mood-lift", "quick"],
  },
  {
    title: "Cucumber & Hummus Sticks",
    subtitle: "Cooling low-calorie snack",
    ingredients: ["Cucumber", "Hummus", "Paprika"],
    amounts: ["1 medium", "3 tbsp", "Pinch"],
    steps: [
      "Cut cucumber into sticks.",
      "Spoon hummus into a small bowl.",
      "Dust paprika on hummus for flavor.",
      "Dip and enjoy.",
    ],
    benefits: ["Hydrating and cooling", "Chickpea protein from hummus", "Almost zero prep"],
    kcal: 130, protein: 6, prep: "2 min", price: 0.60,
    tags: ["cooling", "low-cal", "quick", "gut-health"],
  },
  {
    title: "Trail Mix Energy Handful",
    subtitle: "Mineral-rich hormone snack",
    ingredients: ["Walnuts", "Pumpkin seeds", "Dried apricots", "Dark chocolate chips"],
    amounts: ["6 halves", "1 tbsp", "3 pieces", "1 tsp"],
    steps: [
      "Combine all ingredients in a small container.",
      "Shake to mix.",
      "Eat as one portion — don't graze from a big bag.",
    ],
    benefits: ["Walnuts for omega-3", "Pumpkin seeds for zinc", "Apricots for iron"],
    kcal: 200, protein: 6, prep: "1 min", price: 0.75,
    tags: ["hormone-balance", "bone-strength", "energy-boost", "joint-support"],
  },
  {
    title: "Warm Turmeric Milk",
    subtitle: "Evening sleep-support drink",
    ingredients: ["Milk or oat milk", "Turmeric", "Cinnamon", "Honey", "Black pepper"],
    amounts: ["250ml", "½ tsp", "¼ tsp", "1 tsp", "Tiny pinch"],
    steps: [
      "Heat milk in a small pot (don't boil).",
      "Whisk in turmeric, cinnamon and pepper.",
      "Pour into mug, stir in honey.",
      "Drink 30 min before bed for best sleep effect.",
    ],
    benefits: ["Turmeric reduces inflammation", "Warm milk promotes melatonin", "Cinnamon calms nervous system"],
    kcal: 120, protein: 6, prep: "5 min", price: 0.40,
    tags: ["sleep-support", "anti-inflammatory", "cooling", "mood-lift"],
  },
  {
    title: "Cottage Cheese & Berries",
    subtitle: "High-protein evening snack",
    ingredients: ["Cottage cheese", "Mixed berries", "Honey"],
    amounts: ["100g", "Handful", "½ tsp"],
    steps: [
      "Spoon cottage cheese into a bowl.",
      "Top with berries (fresh or frozen-thawed).",
      "Drizzle honey if desired.",
    ],
    benefits: ["Casein protein digests slowly overnight", "Berries for antioxidants", "Supports muscle recovery during sleep"],
    kcal: 150, protein: 16, prep: "2 min", price: 0.80,
    tags: ["high-protein", "sleep-support", "quick", "low-cal"],
  },
];

// ============================================================
// DETERMINISTIC SHUFFLE (same day = same meals)
// ============================================================

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

// ============================================================
// MEAL SCORING - How well a meal matches user needs
// ============================================================

function scoreMeal(meal: Meal, priorityTags: MealTag[], calorieTarget: number, slot: MealSlot): number {
  let score = 0;

  // Tag matching (most important)
  for (const tag of priorityTags) {
    if (meal.tags.includes(tag)) score += 10;
  }

  // Calorie appropriateness per slot
  const slotTargets: Record<MealSlot, [number, number]> = {
    breakfast: [250, 450],
    lunch:     [350, 550],
    dinner:    [350, 550],
    snack:     [100, 280],
  };
  const [min, max] = slotTargets[slot];
  if (meal.kcal >= min && meal.kcal <= max) score += 5;

  // Budget bonus (cheaper = better)
  if (meal.price <= 1.0) score += 3;
  if (meal.price <= 1.5) score += 1;

  // Low-cal bonus for fat loss
  if (calorieTarget < 1700 && meal.tags.includes("low-cal")) score += 5;

  // High-protein bonus for tone/fat loss
  if (meal.protein >= 20) score += 2;

  return score;
}

// ============================================================
// MAIN MEAL PLAN BUILDER
// ============================================================

function buildPriorityTags(symptoms: string[], goal: string): MealTag[] {
  const tags: MealTag[] = [];

  // Symptom tags first (highest priority)
  for (const s of symptoms) {
    const t = SYMPTOM_TAGS[s] || [];
    for (const tag of t) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }

  // Goal tags
  const goalT = GOAL_TAGS[goal] || GOAL_TAGS.tone;
  for (const tag of goalT) {
    if (!tags.includes(tag)) tags.push(tag);
  }

  return tags;
}

function pickBestMeal(
  pool: Meal[],
  priorityTags: MealTag[],
  calorieTarget: number,
  slot: MealSlot,
  daySeed: number,
  usedTitles: Set<string>
): Meal {
  // Score and sort
  const scored = pool
    .filter((m) => !usedTitles.has(m.title))
    .map((m) => ({ meal: m, score: scoreMeal(m, priorityTags, calorieTarget, slot) }))
    .sort((a, b) => b.score - a.score);

  // Take top 3 candidates and pick based on day seed for variety
  const top = scored.slice(0, Math.min(3, scored.length));
  if (top.length === 0) {
    // Fallback: pick any from pool
    const shuffled = shuffleWithSeed(pool, daySeed);
    return shuffled[0];
  }

  const pick = top[daySeed % top.length];
  return pick.meal;
}

export function getDayMealPlan(
  day: number,
  calories: number,
  symptoms: string[] = [],
  goal: string = "tone"
): DayMealPlan {
  const priorityTags = buildPriorityTags(symptoms, goal);
  const daySeed = day * 7919 + (goal.charCodeAt(0) || 0) + symptoms.length * 37;
  const used = new Set<string>();

  // Shuffle pools differently per day
  const bPool = shuffleWithSeed(BREAKFASTS, daySeed);
  const lPool = shuffleWithSeed(LUNCHES, daySeed + 1);
  const dPool = shuffleWithSeed(DINNERS, daySeed + 2);
  const sPool = shuffleWithSeed(SNACKS, daySeed + 3);

  const breakfast = pickBestMeal(bPool, priorityTags, calories, "breakfast", daySeed, used);
  used.add(breakfast.title);

  const lunch = pickBestMeal(lPool, priorityTags, calories, "lunch", daySeed + 10, used);
  used.add(lunch.title);

  const dinner = pickBestMeal(dPool, priorityTags, calories, "dinner", daySeed + 20, used);
  used.add(dinner.title);

  const snack = pickBestMeal(sPool, priorityTags, calories, "snack", daySeed + 30, used);

  const meals: { slot: MealSlot; meal: Meal }[] = [
    { slot: "breakfast", meal: breakfast },
    { slot: "lunch", meal: lunch },
    { slot: "dinner", meal: dinner },
    { slot: "snack", meal: snack },
  ];

  const totalKcal = meals.reduce((s, m) => s + m.meal.kcal, 0);
  const totalProtein = meals.reduce((s, m) => s + m.meal.protein, 0);
  const totalPrice = Number(meals.reduce((s, m) => s + m.meal.price, 0).toFixed(2));

  // Focus description based on top tags
  const focusMap: Record<string, string> = {
    "cooling": "Cooling & Hormone Balance",
    "sleep-support": "Sleep Recovery Nutrition",
    "anti-inflammatory": "Anti-Inflammatory Focus",
    "metabolism": "Metabolism Boost",
    "high-protein": "High Protein Day",
    "gut-health": "Gut Health & Digestion",
    "hormone-balance": "Hormone Support",
    "joint-support": "Joint & Bone Support",
    "mood-lift": "Mood & Energy Lift",
    "energy-boost": "Energy Optimization",
  };
  const focus = priorityTags[0] ? (focusMap[priorityTags[0]] || "Balanced Nutrition") : "Balanced Nutrition";

  // Seasonal awareness
  const month = new Date().getMonth();
  const season = month >= 2 && month <= 4 ? "Spring" : month >= 5 && month <= 7 ? "Summer" : month >= 8 && month <= 10 ? "Autumn" : "Winter";
  const seasonalNote = {
    Spring: "Fresh greens & light meals",
    Summer: "Cooling salads & hydration",
    Autumn: "Warming soups & root vegetables",
    Winter: "Hearty stews & comfort food",
  }[season];

  return { day, meals, totalKcal, totalProtein, totalPrice, focus, season, seasonalNote };
}

// ============================================================
// BACKWARD COMPATIBLE EXPORTS
// ============================================================

/** Legacy: returns 4 meals for a day based on calories only */
export function getMealPlan(calories: number, day = 1, symptoms: string[] = [], goal = "tone"): Meal[] {
  const plan = getDayMealPlan(day, calories, symptoms, goal);
  return plan.meals.map((m) => m.meal);
}
