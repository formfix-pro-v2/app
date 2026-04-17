// --- PUNA BAZA PODATAKA (SVAKI PROGRAM IMA 10 VEŽBI) ---
const fitnessDatabase: Record<string, Plan> = {
  // --- MENOPAUSE CATEGORY ---
  "pelvic-health": {
    category: "MENOPAUSE",
    title: "Pelvic Floor & Core",
    description: "Deep core engagement for stability and bladder control.",
    exercises: [
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Tilt your pelvis back and press lower back into the floor.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Lift hips toward the ceiling, squeeze glutes at the top.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Lower opposite arm and leg while keeping back flat.", duration: 45 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Extend opposite arm and leg, maintain a neutral spine.", duration: 45 },
      { name: "Clamshells", img: "exercises/clamshells.jpg", desc: "On your side, lift top knee while keeping feet together.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "On your stomach, lift chest and legs simultaneously.", duration: 45 },
      { name: "Knee Fall-Outs", img: "exercises/knee-fallout.jpg", desc: "Lying on back, slowly drop one knee to the side.", duration: 45 },
      { name: "Plank on Knees", img: "exercises/plank.jpg", desc: "Hold a straight line from head to knees, engage core.", duration: 60 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "In bridge position, lift one knee then the other.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Rest hips on heels and stretch arms forward.", duration: 60 }
    ]
  },
  "bone-density": {
    category: "MENOPAUSE",
    title: "Bone Density & Strength",
    description: "Weight-bearing exercises to support skeletal health.",
    exercises: [
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Hold a squat against the wall to load the femur.", duration: 45 },
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Rise on toes to strengthen lower leg bones.", duration: 45 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Controlled stepping for hip bone loading.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Drive through heels to engage posterior chain.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Total body tension for structural integrity.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Balance on all fours, extending opposite limbs.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Strengthen the spine's supporting muscles.", duration: 45 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core bracing to protect the vertebrae.", duration: 45 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic load on hips and spine.", duration: 45 }
    ]
  },
  "hormonal-balance": {
    category: "MENOPAUSE",
    title: "Stress Relief & Flow",
    description: "Mobility and breathing to balance cortisol levels.",
    exercises: [
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Move with your breath to mobilize the spine.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Deep breathing focus for stress reduction.", duration: 90 },
      { name: "Pigeon Stretch", img: "exercises/pigeon-stretch.jpg", desc: "Release hip tension where cortisol 'hides'.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Improve digestive and hormonal flow.", duration: 60 },
      { name: "Knees-to-Chest", img: "exercises/knees-to-chest.jpg", desc: "Lower back decompression.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Foundational pelvic circulation.", duration: 45 },
      { name: "Nerve Flossing", img: "exercises/nerve-flossing.jpg", desc: "Release neural tension.", duration: 60 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Gentle leg release.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Mindful core control.", duration: 45 },
      { name: "Knee Fall-Outs", img: "exercises/knee-fallout.jpg", desc: "Gentle hip mobility.", duration: 45 }
    ]
  },

  // --- OFFICE RECOVERY CATEGORY ---
  "sciatica-relief": {
    category: "OFFICE RECOVERY",
    title: "Sciatica & Nerve Relief",
    description: "Decompression and nerve gliding for leg pain.",
    exercises: [
      { name: "Nerve Flossing", img: "exercises/nerve-flossing.jpg", desc: "Seated, glide the sciatic nerve.", duration: 60 },
      { name: "Pigeon Stretch", img: "exercises/pigeon-stretch.jpg", desc: "Lower torso over front leg to open hips.", duration: 60 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Mobilize the spine to reduce disc pressure.", duration: 60 },
      { name: "Cobra Pose", img: "exercises/cobra.jpg", desc: "Gently arch to decompress lower discs.", duration: 60 },
      { name: "Knees-to-Chest", img: "exercises/knees-to-chest.jpg", desc: "Hug knees to decompress lower back.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Gentle rotation to release lumbar tension.", duration: 60 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Relieve tension along the nerve path.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Subtle SI joint mobilization.", duration: 45 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core stability without back strain.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Final spinal relaxation.", duration: 90 }
    ]
  },
  "neck-shoulder": {
    category: "OFFICE RECOVERY",
    title: "Neck & Shoulder Fix",
    description: "Correct tech-neck and open the thoracic spine.",
    exercises: [
      { name: "Wall Slides", img: "exercises/shoulder-mobility.jpg", desc: "Slide arms up wall to open the chest.", duration: 60 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Focus on upper back (thoracic) movement.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Stabilize scapula and core.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Strengthen upper back extensors.", duration: 45 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Shoulder girdle stability.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Open chest and rotate mid-back.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Stretch upper lats and shoulders.", duration: 90 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Core control to prevent slouching.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Static posture alignment.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Foundational posture check.", duration: 45 }
    ]
  },
  "lower-back-fix": {
    category: "OFFICE RECOVERY",
    title: "Lower Back Stability",
    description: "Strengthen the deep stabilizers of the spine.",
    exercises: [
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Core and back balance.", duration: 60 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Deep abdominal bracing.", duration: 60 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Strengthen glutes to support the spine.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Total core stability.", duration: 60 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Gentle spinal mobilization.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Back muscle engagement.", duration: 45 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Spinal flexibility.", duration: 60 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic stability training.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Passive recovery.", duration: 90 },
      { name: "Hamstring Stretch", img: "exercises/hamstring-stretch.jpg", desc: "Release posterior tension.", duration: 60 }
    ]
  },

  // --- INJURY REHAB CATEGORY ---
  "knee-stability": {
    category: "INJURY REHAB",
    title: "Knee Stability",
    description: "Joint protection and quad strengthening.",
    exercises: [
      { name: "Knee Extension", img: "exercises/knee-stability.jpg", desc: "Straighten knee fully to engage the muscle.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Lift locked leg to strengthen quads.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Build isometric endurance.", duration: 60 },
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Strengthen the ankle for knee support.", duration: 45 },
      { name: "Clamshells", img: "exercises/clamshells.jpg", desc: "Hip strength for knee tracking.", duration: 45 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Reduce knee load using glutes.", duration: 60 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Functional controlled stepping.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Core stability for alignment.", duration: 60 },
      { name: "Quad Stretch", img: "exercises/quad-stretch.jpg", desc: "Release front thigh pressure.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Rest the lower chain.", duration: 60 }
    ]
  },
  "shoulder-rehab": {
    category: "INJURY REHAB",
    title: "Shoulder Mobility",
    description: "Rebuilding range of motion and scapular strength.",
    exercises: [
      { name: "Wall Slides", img: "exercises/shoulder-mobility.jpg", desc: "Controlled movement for joint health.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Stability for the shoulder blades.", duration: 60 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Building load tolerance.", duration: 60 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Back shoulder engagement.", duration: 45 },
      { name: "Cat-Cow", img: "exercises/cat-cow.jpg", desc: "Mobilize the thoracic spine.", duration: 60 },
      { name: "Spinal Twist", img: "exercises/spinal-twist.jpg", desc: "Improve upper body rotation.", duration: 60 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Gentle shoulder stretch.", duration: 90 },
      { name: "Dead Bug", img: "exercises/dead-bug.jpg", desc: "Maintain torso stability.", duration: 45 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Total posture hold.", duration: 45 },
      { name: "Pelvic Tilts", img: "exercises/pelvic-tilts.jpg", desc: "Base alignment.", duration: 45 }
    ]
  },
  "ankle-foot": {
    category: "INJURY REHAB",
    title: "Ankle & Foot",
    description: "Building stability from the ground up.",
    exercises: [
      { name: "Calf Raises", img: "exercises/ankle-strength.jpg", desc: "Build power in the lower leg.", duration: 60 },
      { name: "Step-Ups", img: "exercises/step-ups.jpg", desc: "Controlled ankle loading.", duration: 60 },
      { name: "Wall Sit", img: "exercises/wall-sit.jpg", desc: "Static strength for tendons.", duration: 60 },
      { name: "Glute Bridge", img: "exercises/glute-bridge.jpg", desc: "Build the whole lower chain.", duration: 60 },
      { name: "Straight Leg Raise", img: "exercises/leg-raise.jpg", desc: "Balance work and stability.", duration: 45 },
      { name: "Plank", img: "exercises/plank.jpg", desc: "Core-foot connection.", duration: 60 },
      { name: "Bird-Dog", img: "exercises/bird-dog.jpg", desc: "Global coordination.", duration: 45 },
      { name: "Superman", img: "exercises/superman.jpg", desc: "Posterior chain engagement.", duration: 45 },
      { name: "Bridge Marching", img: "exercises/bridge-march.jpg", desc: "Dynamic balance training.", duration: 45 },
      { name: "Child's Pose", img: "exercises/childs-pose.jpg", desc: "Final relaxation.", duration: 60 }
    ]
  }
};
