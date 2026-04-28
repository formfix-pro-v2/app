export type Locale = "en" | "sr" | "de" | "es";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  sr: "Srpski",
  de: "Deutsch",
  es: "Español",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: "🇬🇧",
  sr: "🇷🇸",
  de: "🇩🇪",
  es: "🇪🇸",
};

type TranslationKeys = {
  // Navigation
  "nav.dashboard": string;
  "nav.assessment": string;
  "nav.progress": string;
  "nav.shopping": string;
  "nav.plans": string;
  "nav.account": string;
  "nav.signIn": string;

  // Home page
  "home.badge": string;
  "home.title1": string;
  "home.title2": string;
  "home.title3": string;
  "home.subtitle": string;
  "home.cta": string;
  "home.viewPlans": string;
  "home.trusted": string;
  "home.insideReset": string;
  "home.viewDashboard": string;
  "home.feature1": string;
  "home.feature2": string;
  "home.feature3": string;
  "home.feature4": string;
  "home.feature5": string;
  "home.pillar1": string;
  "home.pillar1Desc": string;
  "home.pillar2": string;
  "home.pillar2Desc": string;
  "home.pillar3": string;
  "home.pillar3Desc": string;
  "home.signatureTitle": string;
  "home.nextChapter": string;
  "home.canFeel": string;
  "home.amazing": string;
  "home.beginAssessment": string;
  "home.startAssessment": string;

  // Dashboard
  "dash.title": string;
  "dash.todayFocus": string;
  "dash.startSession": string;
  "dash.nutrition": string;
  "dash.mealCost": string;
  "dash.todayRoutine": string;
  "dash.movements": string;
  "dash.dailyCheckin": string;
  "dash.home": string;
  "dash.unlockMenu": string;
  "dash.upgrade": string;
  "dash.ingredients": string;
  "dash.howToMake": string;

  // Session
  "session.liveSession": string;
  "session.exercise": string;
  "session.of": string;
  "session.complete": string;
  "session.amazingWork": string;
  "session.returnDashboard": string;
  "session.startPosition": string;
  "session.finishPosition": string;
  "session.skip": string;
  "session.next": string;
  "session.finish": string;
  "session.upNext": string;
  "session.lastExercise": string;

  // Auth
  "auth.createAccount": string;
  "auth.welcomeBack": string;
  "auth.signIn": string;
  "auth.signUp": string;
  "auth.email": string;
  "auth.password": string;
  "auth.noAccount": string;
  "auth.hasAccount": string;
  "auth.backHome": string;

  // Common
  "common.loading": string;
  "common.day": string;
  "common.days": string;
  "common.min": string;
  "common.exercises": string;
  "common.calories": string;
  "common.protein": string;
  "common.fiber": string;
  "common.water": string;
};

const en: TranslationKeys = {
  "nav.dashboard": "Dashboard",
  "nav.assessment": "Assessment",
  "nav.progress": "Progress",
  "nav.shopping": "Shopping",
  "nav.plans": "Plans",
  "nav.account": "Account",
  "nav.signIn": "Sign In",

  "home.badge": "Menopause Wellness for Women 40+",
  "home.title1": "Feel Balanced.",
  "home.title2": "Move Gracefully.",
  "home.title3": "Glow Again.",
  "home.subtitle": "Personalized programs for hot flashes, sleep, belly fat and joint stiffness.",
  "home.cta": "Start Free Plan",
  "home.viewPlans": "View Membership",
  "home.trusted": "Trusted by women building strength through midlife.",
  "home.insideReset": "Inside Your Reset:",
  "home.viewDashboard": "View Example Dashboard",
  "home.feature1": "Daily movement sessions",
  "home.feature2": "Menopause symptom support plans",
  "home.feature3": "Posture & confidence routines",
  "home.feature4": "Better sleep reset habits",
  "home.feature5": "Nutrition guidance",
  "home.pillar1": "Hormone Calm",
  "home.pillar1Desc": "Support nervous system balance and reduce daily overwhelm.",
  "home.pillar2": "Lean Strength",
  "home.pillar2Desc": "Gentle strength sessions to improve shape and metabolism.",
  "home.pillar3": "Elegant Energy",
  "home.pillar3Desc": "Restore vitality without punishing workouts.",
  "home.signatureTitle": "Signature Programs",
  "home.nextChapter": "Your Next Chapter",
  "home.canFeel": "Can Feel",
  "home.amazing": "Amazing",
  "home.beginAssessment": "Begin with a personalized assessment today.",
  "home.startAssessment": "Start Assessment",

  "dash.title": "Your Dashboard",
  "dash.todayFocus": "Today's Focus",
  "dash.startSession": "Start Full Session",
  "dash.nutrition": "Personalized Nutrition",
  "dash.mealCost": "Today's Meal Cost",
  "dash.todayRoutine": "Today's Routine",
  "dash.movements": "Movements",
  "dash.dailyCheckin": "Daily Check-In",
  "dash.home": "Home",
  "dash.unlockMenu": "Unlock Your Full Budget Menu",
  "dash.upgrade": "Upgrade to Premium Plan",
  "dash.ingredients": "Ingredients",
  "dash.howToMake": "How to Make",

  "session.liveSession": "Live Session",
  "session.exercise": "Exercise",
  "session.of": "of",
  "session.complete": "Session Complete!",
  "session.amazingWork": "Amazing work today.",
  "session.returnDashboard": "Return to Dashboard",
  "session.startPosition": "Start Position",
  "session.finishPosition": "Finish Position",
  "session.skip": "Skip",
  "session.next": "Next Exercise",
  "session.finish": "Finish Session",
  "session.upNext": "Up Next",
  "session.lastExercise": "Last exercise — you're almost done!",

  "auth.createAccount": "Create Account",
  "auth.welcomeBack": "Welcome Back",
  "auth.signIn": "Sign In",
  "auth.signUp": "Sign Up",
  "auth.email": "Email Address",
  "auth.password": "Password",
  "auth.noAccount": "Don't have an account? Sign up",
  "auth.hasAccount": "Already have an account? Sign in",
  "auth.backHome": "← Back to Home",

  "common.loading": "Loading...",
  "common.day": "Day",
  "common.days": "days",
  "common.min": "min",
  "common.exercises": "Exercises",
  "common.calories": "Calories",
  "common.protein": "Protein",
  "common.fiber": "Fiber",
  "common.water": "Water",
};

const sr: TranslationKeys = {
  "nav.dashboard": "Kontrolna tabla",
  "nav.assessment": "Procena",
  "nav.progress": "Napredak",
  "nav.shopping": "Kupovina",
  "nav.plans": "Planovi",
  "nav.account": "Nalog",
  "nav.signIn": "Prijava",

  "home.badge": "Wellness za žene 40+",
  "home.title1": "Osećaj se uravnoteženo.",
  "home.title2": "Krećite se graciozno.",
  "home.title3": "Zasijajte ponovo.",
  "home.subtitle": "Personalizovani programi za valunge, san, stomak i ukočenost zglobova.",
  "home.cta": "Započni besplatno",
  "home.viewPlans": "Pogledaj članstvo",
  "home.trusted": "Žene koje grade snagu u srednjim godinama nam veruju.",
  "home.insideReset": "Šta dobijate:",
  "home.viewDashboard": "Pogledaj primer",
  "home.feature1": "Dnevne sesije vežbanja",
  "home.feature2": "Planovi za simptome menopauze",
  "home.feature3": "Rutine za držanje i samopouzdanje",
  "home.feature4": "Navike za bolji san",
  "home.feature5": "Nutritivno vođenje",
  "home.pillar1": "Hormonski mir",
  "home.pillar1Desc": "Podrška nervnom sistemu i smanjenje svakodnevnog stresa.",
  "home.pillar2": "Vitka snaga",
  "home.pillar2Desc": "Nežne vežbe snage za poboljšanje oblika i metabolizma.",
  "home.pillar3": "Elegantna energija",
  "home.pillar3Desc": "Obnovite vitalnost bez iscrpljujućih treninga.",
  "home.signatureTitle": "Programi",
  "home.nextChapter": "Vaše sledeće poglavlje",
  "home.canFeel": "može biti",
  "home.amazing": "neverovatno",
  "home.beginAssessment": "Započnite personalizovanu procenu danas.",
  "home.startAssessment": "Započni procenu",

  "dash.title": "Vaša kontrolna tabla",
  "dash.todayFocus": "Današnji fokus",
  "dash.startSession": "Započni sesiju",
  "dash.nutrition": "Personalizovana ishrana",
  "dash.mealCost": "Cena obroka danas",
  "dash.todayRoutine": "Današnja rutina",
  "dash.movements": "Pokreta",
  "dash.dailyCheckin": "Dnevni check-in",
  "dash.home": "Početna",
  "dash.unlockMenu": "Otključajte kompletan jelovnik",
  "dash.upgrade": "Nadogradite na Premium",
  "dash.ingredients": "Sastojci",
  "dash.howToMake": "Priprema",

  "session.liveSession": "Sesija uživo",
  "session.exercise": "Vežba",
  "session.of": "od",
  "session.complete": "Sesija završena!",
  "session.amazingWork": "Odličan posao danas.",
  "session.returnDashboard": "Nazad na tablu",
  "session.startPosition": "Početni položaj",
  "session.finishPosition": "Završni položaj",
  "session.skip": "Preskoči",
  "session.next": "Sledeća vežba",
  "session.finish": "Završi sesiju",
  "session.upNext": "Sledeće",
  "session.lastExercise": "Poslednja vežba — skoro ste gotovi!",

  "auth.createAccount": "Napravi nalog",
  "auth.welcomeBack": "Dobrodošli nazad",
  "auth.signIn": "Prijavi se",
  "auth.signUp": "Registruj se",
  "auth.email": "Email adresa",
  "auth.password": "Lozinka",
  "auth.noAccount": "Nemate nalog? Registrujte se",
  "auth.hasAccount": "Već imate nalog? Prijavite se",
  "auth.backHome": "← Nazad na početnu",

  "common.loading": "Učitavanje...",
  "common.day": "Dan",
  "common.days": "dana",
  "common.min": "min",
  "common.exercises": "Vežbi",
  "common.calories": "Kalorije",
  "common.protein": "Proteini",
  "common.fiber": "Vlakna",
  "common.water": "Voda",
};

const de: TranslationKeys = {
  "nav.dashboard": "Dashboard",
  "nav.assessment": "Bewertung",
  "nav.progress": "Fortschritt",
  "nav.shopping": "Einkaufen",
  "nav.plans": "Pläne",
  "nav.account": "Konto",
  "nav.signIn": "Anmelden",

  "home.badge": "Wellness für Frauen ab 40",
  "home.title1": "Fühle dich ausgeglichen.",
  "home.title2": "Bewege dich anmutig.",
  "home.title3": "Strahle wieder.",
  "home.subtitle": "Personalisierte Programme für Hitzewallungen, Schlaf, Bauchfett und Gelenksteifheit.",
  "home.cta": "Kostenlos starten",
  "home.viewPlans": "Mitgliedschaft ansehen",
  "home.trusted": "Vertraut von Frauen, die in der Lebensmitte Stärke aufbauen.",
  "home.insideReset": "In Ihrem Reset:",
  "home.viewDashboard": "Beispiel ansehen",
  "home.feature1": "Tägliche Bewegungseinheiten",
  "home.feature2": "Menopause-Symptom-Pläne",
  "home.feature3": "Haltung & Selbstvertrauen",
  "home.feature4": "Bessere Schlafgewohnheiten",
  "home.feature5": "Ernährungsberatung",
  "home.pillar1": "Hormonelle Ruhe",
  "home.pillar1Desc": "Unterstützung des Nervensystems und Reduzierung täglicher Überforderung.",
  "home.pillar2": "Schlanke Stärke",
  "home.pillar2Desc": "Sanfte Kraftübungen zur Verbesserung von Form und Stoffwechsel.",
  "home.pillar3": "Elegante Energie",
  "home.pillar3Desc": "Vitalität wiederherstellen ohne anstrengende Workouts.",
  "home.signatureTitle": "Programme",
  "home.nextChapter": "Ihr nächstes Kapitel",
  "home.canFeel": "kann sich",
  "home.amazing": "großartig anfühlen",
  "home.beginAssessment": "Beginnen Sie heute mit einer personalisierten Bewertung.",
  "home.startAssessment": "Bewertung starten",

  "dash.title": "Ihr Dashboard",
  "dash.todayFocus": "Heutiger Fokus",
  "dash.startSession": "Sitzung starten",
  "dash.nutrition": "Personalisierte Ernährung",
  "dash.mealCost": "Heutige Mahlzeitkosten",
  "dash.todayRoutine": "Heutige Routine",
  "dash.movements": "Übungen",
  "dash.dailyCheckin": "Täglicher Check-In",
  "dash.home": "Startseite",
  "dash.unlockMenu": "Vollständiges Menü freischalten",
  "dash.upgrade": "Auf Premium upgraden",
  "dash.ingredients": "Zutaten",
  "dash.howToMake": "Zubereitung",

  "session.liveSession": "Live-Sitzung",
  "session.exercise": "Übung",
  "session.of": "von",
  "session.complete": "Sitzung abgeschlossen!",
  "session.amazingWork": "Tolle Arbeit heute.",
  "session.returnDashboard": "Zurück zum Dashboard",
  "session.startPosition": "Startposition",
  "session.finishPosition": "Endposition",
  "session.skip": "Überspringen",
  "session.next": "Nächste Übung",
  "session.finish": "Sitzung beenden",
  "session.upNext": "Als Nächstes",
  "session.lastExercise": "Letzte Übung — fast geschafft!",

  "auth.createAccount": "Konto erstellen",
  "auth.welcomeBack": "Willkommen zurück",
  "auth.signIn": "Anmelden",
  "auth.signUp": "Registrieren",
  "auth.email": "E-Mail-Adresse",
  "auth.password": "Passwort",
  "auth.noAccount": "Kein Konto? Registrieren",
  "auth.hasAccount": "Bereits ein Konto? Anmelden",
  "auth.backHome": "← Zurück zur Startseite",

  "common.loading": "Laden...",
  "common.day": "Tag",
  "common.days": "Tage",
  "common.min": "Min",
  "common.exercises": "Übungen",
  "common.calories": "Kalorien",
  "common.protein": "Protein",
  "common.fiber": "Ballaststoffe",
  "common.water": "Wasser",
};

const es: TranslationKeys = {
  "nav.dashboard": "Panel",
  "nav.assessment": "Evaluación",
  "nav.progress": "Progreso",
  "nav.shopping": "Compras",
  "nav.plans": "Planes",
  "nav.account": "Cuenta",
  "nav.signIn": "Iniciar sesión",

  "home.badge": "Bienestar para mujeres de 40+",
  "home.title1": "Siéntete equilibrada.",
  "home.title2": "Muévete con gracia.",
  "home.title3": "Brilla de nuevo.",
  "home.subtitle": "Programas personalizados para sofocos, sueño, grasa abdominal y rigidez articular.",
  "home.cta": "Empezar gratis",
  "home.viewPlans": "Ver membresía",
  "home.trusted": "Mujeres que construyen fuerza en la mediana edad confían en nosotras.",
  "home.insideReset": "Dentro de tu Reset:",
  "home.viewDashboard": "Ver ejemplo",
  "home.feature1": "Sesiones diarias de movimiento",
  "home.feature2": "Planes de apoyo para síntomas",
  "home.feature3": "Rutinas de postura y confianza",
  "home.feature4": "Hábitos para dormir mejor",
  "home.feature5": "Guía nutricional",
  "home.pillar1": "Calma Hormonal",
  "home.pillar1Desc": "Apoyo al sistema nervioso y reducción del estrés diario.",
  "home.pillar2": "Fuerza Esbelta",
  "home.pillar2Desc": "Sesiones suaves de fuerza para mejorar la forma y el metabolismo.",
  "home.pillar3": "Energía Elegante",
  "home.pillar3Desc": "Restaura la vitalidad sin entrenamientos agotadores.",
  "home.signatureTitle": "Programas",
  "home.nextChapter": "Tu próximo capítulo",
  "home.canFeel": "puede sentirse",
  "home.amazing": "increíble",
  "home.beginAssessment": "Comienza con una evaluación personalizada hoy.",
  "home.startAssessment": "Iniciar evaluación",

  "dash.title": "Tu Panel",
  "dash.todayFocus": "Enfoque de hoy",
  "dash.startSession": "Iniciar sesión",
  "dash.nutrition": "Nutrición personalizada",
  "dash.mealCost": "Costo de comida hoy",
  "dash.todayRoutine": "Rutina de hoy",
  "dash.movements": "Movimientos",
  "dash.dailyCheckin": "Check-in diario",
  "dash.home": "Inicio",
  "dash.unlockMenu": "Desbloquea el menú completo",
  "dash.upgrade": "Actualizar a Premium",
  "dash.ingredients": "Ingredientes",
  "dash.howToMake": "Preparación",

  "session.liveSession": "Sesión en vivo",
  "session.exercise": "Ejercicio",
  "session.of": "de",
  "session.complete": "¡Sesión completada!",
  "session.amazingWork": "Increíble trabajo hoy.",
  "session.returnDashboard": "Volver al panel",
  "session.startPosition": "Posición inicial",
  "session.finishPosition": "Posición final",
  "session.skip": "Saltar",
  "session.next": "Siguiente ejercicio",
  "session.finish": "Terminar sesión",
  "session.upNext": "Siguiente",
  "session.lastExercise": "Último ejercicio — ¡casi terminas!",

  "auth.createAccount": "Crear cuenta",
  "auth.welcomeBack": "Bienvenida de nuevo",
  "auth.signIn": "Iniciar sesión",
  "auth.signUp": "Registrarse",
  "auth.email": "Correo electrónico",
  "auth.password": "Contraseña",
  "auth.noAccount": "¿No tienes cuenta? Regístrate",
  "auth.hasAccount": "¿Ya tienes cuenta? Inicia sesión",
  "auth.backHome": "← Volver al inicio",

  "common.loading": "Cargando...",
  "common.day": "Día",
  "common.days": "días",
  "common.min": "min",
  "common.exercises": "Ejercicios",
  "common.calories": "Calorías",
  "common.protein": "Proteína",
  "common.fiber": "Fibra",
  "common.water": "Agua",
};

export const translations: Record<Locale, TranslationKeys> = { en, sr, de, es };
