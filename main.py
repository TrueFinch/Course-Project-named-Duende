from flask import Flask, render_template, request
from Model import Model
import json
import base64

app = Flask(__name__)
model = Model()


@app.route('/')
@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/about.html')
def about():
    return render_template('about.html')


@app.route("/hook", methods=["POST", "GET"])
def detect_digit():
    global prediction
    if request.method == 'POST':
        image_b64 = request.values['imageBase64']
        image_encoded = image_b64.split(',')[1]
        my_image = base64.decodebytes(image_encoded.encode('utf-8'))
        prediction = model.predict(my_image)

    ans = json.dumps(prediction)
    return ans


@app.route("/hook_train", methods=["POST", "GET"])
def train_net():
    if request.method == 'POST':
        image_b64 = request.values['imageBase64']
        image_encoded = image_b64.split(',')[1]
        my_image = base64.decodebytes(image_encoded.encode('utf-8'))
        digit = request.values['answer']
        model.train(my_image, digit, 100)
    return 'Trained'
