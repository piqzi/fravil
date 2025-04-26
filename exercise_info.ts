export interface ExerciseInfo {
  name: string;
  description: string;
  links: string[];
}

export const exerciseInfoMap: Record<string, ExerciseInfo> = {
  breathing_exercise: {
    name: "Breathing Exercise",
    description: "Simple deep breathing to calm your mind, reduce anxiety, and improve focus.",
    links: [
      "https://www.healthline.com/health/deep-breathing",
      "https://www.youtube.com/watch?v=EYQsRBNYdPk"
    ]
  },
  core_strength: {
    name: "Core Strength",
    description: "Exercises that target your abdominal and back muscles to build a stronger core.",
    links: [
      "https://www.self.com/gallery/core-exercises-top-trainers",
      "https://www.youtube.com/watch?v=8QcLmygFQJk"
    ]
  },
  dance: {
    name: "Dance",
    description: "A quick freestyle dance session to boost your mood and get your heart pumping.",
    links: [
      "https://www.youtube.com/watch?v=LMfWZz0aM0c",
      "https://www.healthline.com/health/benefits-of-dance"
    ]
  },
  jumping_jacks: {
    name: "Jumping Jacks",
    description: "A basic full-body cardio exercise that raises your heart rate and warms up your muscles.",
    links: [
      "https://www.verywellfit.com/jumping-jack-exercise-3120573",
      "https://www.youtube.com/watch?v=c4DAnQ6DtF8"
    ]
  },
  light_cardio: {
    name: "Light Cardio",
    description: "Low-impact cardio like marching in place or stepping side-to-side to get your blood flowing.",
    links: [
      "https://www.youtube.com/watch?v=Qn2bFSzvVuk",
      "https://www.medicalnewstoday.com/articles/cardio-exercises-at-home"
    ]
  },
  plank: {
    name: "Plank",
    description: "A static core exercise that strengthens your abs, back, and shoulders.",
    links: [
      "https://www.healthline.com/health/fitness-exercise/plank-exercise",
      "https://www.youtube.com/watch?v=B296mZDhrP4"
    ]
  },
  stretching: {
    name: "Stretching",
    description: "Gentle stretches to increase flexibility, reduce stiffness, and relax your body.",
    links: [
      "https://www.youtube.com/watch?v=JJAHGpe0AVU",
      "https://www.nhs.uk/live-well/exercise/flexibility-exercises/"
    ]
  },
  yoga: {
    name: "Yoga",
    description: "A mindful movement practice combining breathing, poses, and relaxation.",
    links: [
      "https://www.yogajournal.com/",
      "https://www.youtube.com/watch?v=v7AYKMP6rOE"
    ]
  }
};
