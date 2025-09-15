import os
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image

# Flask 애플리케이션 초기화
app = Flask(__name__)

class DogClassifier:
    def __init__(self, model_path, class_names, img_size=(224, 224)):
        self.img_size = img_size
        self.class_names = class_names
        self.model_path = model_path
        self.model = self._load_model()

    def _load_model(self):
        """모델 로드"""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file not found: {self.model_path}")
        return tf.keras.models.load_model(self.model_path)

    def predict(self, img):
        """이미지 예측"""
        img = tf.image.resize(img, self.img_size)
        img = tf.keras.applications.mobilenet_v2.preprocess_input(img)
        img = np.expand_dims(img, axis=0)
        predictions = self.model.predict(img, verbose=0)  # verbose=0으로 출력 제거
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        return {
            "class": self.class_names[predicted_class],
            "confidence": round(confidence * 100, 2)
        }

# 모델 경로 및 클래스 정의
model_path = "./dog_classifier.keras"
class_names = ["not_dog", "dog"]
dog_classifier = None

try:
    dog_classifier = DogClassifier(model_path, class_names)
except Exception as e:
    print(f"Error initializing classifier: {e}")

@app.route("/is_dog", methods=["POST"])
def is_dog():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    file = request.files["file"]
    try:
        img = Image.open(file.stream).convert("RGB")
        img_array = np.array(img)
        result = dog_classifier.predict(img_array)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    try:
        app.run(host="0.0.0.0", port=5001, debug=False, use_reloader=False)
    except Exception as e:
        print(f"Error starting Flask server: {e}")
