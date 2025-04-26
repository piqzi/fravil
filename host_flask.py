from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and encoders
model = joblib.load("./model/exercise_rf_model.pkl")
mood_encoder = joblib.load("./model/mood_encoder.pkl")
exercise_encoder = joblib.load("./model/exercise_encoder.pkl")


allowed_moods = list(mood_encoder.classes_)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    try:
        time = int(data["time"])
        space = int(data["space"])
        mood = data["mood"]

        if mood not in allowed_moods:
            return jsonify({"error": f"Mood must be one of: {allowed_moods}"}), 400

        mood_code = mood_encoder.transform([mood])[0]
        input_array = np.array([[time, space, mood_code]])
        predicted_label = model.predict(input_array)[0]
        predicted_exercise = exercise_encoder.inverse_transform([predicted_label])[0]

        return jsonify({"exercise": predicted_exercise})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
