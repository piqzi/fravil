
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import pickle
import numpy as np

import os
print("Saving files to:", os.getcwd())


# 1. Load Dataset
df = pd.read_csv("C:/Users/mikat/Desktop/fravil2/micro_exercises_dataset_grouped.csv")
print("Dataset Preview:")
print(df.head())

# 2. Encode Categorical Variables
mood_encoder = LabelEncoder()
exercise_encoder = LabelEncoder()

df["mood_encoded"] = mood_encoder.fit_transform(df["mood"])
df["exercise_encoded"] = exercise_encoder.fit_transform(df["exercise"])

# 3. Prepare Features and Target
X = df[["time", "space", "mood_encoded"]]
y = df["exercise_encoded"]

# 4. Split into Train and Test Sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 5. Train the RandomForest Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 6. Evaluate the Model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# 7. Save the Model and Encoders
joblib.dump(model, "C:/Users/mikat/Desktop/fravil2/exercise_rf_model.pkl")
joblib.dump(mood_encoder, "C:/Users/mikat/Desktop/fravil2/mood_encoder.pkl")
joblib.dump(exercise_encoder, "C:/Users/mikat/Desktop/fravil2/exercise_encoder.pkl")

with open("C:/Users/mikat/Desktop/fravil2/micro_exercise_model.pkl", "wb") as f:
    pickle.dump(model, f)


print("Model and encoders saved successfully.")

# 8. Test Prediction
test_time = 10
test_space = 5
test_mood = "happy"

mood_code = mood_encoder.transform([test_mood])[0]
X_sample = np.array([[test_time, test_space, mood_code]])
predicted_label = model.predict(X_sample)[0]
predicted_exercise = exercise_encoder.inverse_transform([predicted_label])[0]

print(f"Prediction for time={test_time}, space={test_space}, mood='{test_mood}': {predicted_exercise}")