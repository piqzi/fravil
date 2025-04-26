import joblib
import numpy as np

# Load saved model and encoders
model = joblib.load("C:/Users/mikat/Desktop/fravil2/exercise_rf_model.pkl")
mood_encoder = joblib.load("C:/Users/mikat/Desktop/fravil2/mood_encoder.pkl")
exercise_encoder = joblib.load("C:/Users/mikat/Desktop/fravil2/exercise_encoder.pkl")

def recommend_exercise(time, space, mood):
    try:
        mood_encoded = mood_encoder.transform([mood])[0]
        features = np.array([[time, space, mood_encoded]])
        prediction = model.predict(features)[0]
        return exercise_encoder.inverse_transform([prediction])[0]
    except ValueError as e:
        return f"Error: {str(e)}. Mood must be one of: {list(mood_encoder.classes_)}"

if __name__ == "__main__":
    print("🧠 Micro-Exercise Recommender")
    
    try:
        time = int(input("⏱️  How much time do you have (1-30 minutes)? "))
        space = int(input("📏  How much space do you have (1-10)? "))
        mood = input("🧠  What’s your current mood? ").strip().lower()
        
        result = recommend_exercise(time, space, mood)
        print(f"\n💡 Recommended Exercise: {result}")
    except Exception as e:
        print(f"Something went wrong: {str(e)}")
