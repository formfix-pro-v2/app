export type PlanType = "free" | "pro" | "elite";

export function generateProgram(plan: PlanType) {
  if (plan === "free") {
    return {
      title: "7-Day Starter Recovery Plan",
      days: [
        "Day 1: 10 min walk + chest stretch",
        "Day 2: Core activation + posture reset",
        "Day 3: Lower back mobility",
        "Day 4: Recovery walk + breathing",
        "Day 5: Glute activation",
        "Day 6: Shoulder opener",
        "Day 7: Full body mobility"
      ]
    };
  }

  if (plan === "pro") {
    return {
      title: "30-Day Performance Recovery Plan",
      days: [
        "Week 1: Pain reduction + mobility",
        "Week 2: Posture rebuild",
        "Week 3: Strength foundation",
        "Week 4: Energy optimization"
      ]
    };
  }

  return {
    title: "90-Day Elite Transformation",
    days: [
      "Month 1: Recovery + fat loss",
      "Month 2: Strength + posture mastery",
      "Month 3: Peak confidence body system"
    ]
  };
}
