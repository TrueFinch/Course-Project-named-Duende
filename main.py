from flask import Flask, render_template, request
from Model import Model
import json
import os
import base64

app = Flask(__name__)


@app.route('/')
@app.route('/index.html')
def index():
    return render_template("index.html")


@app.route('/about.html')
def about():
    return render_template('about.html')


@app.route("/hook", methods=["POST", "GET"])
def get_image():
    global prediction
    if request.method == 'POST':
        image_b64 = request.values['imageBase64']
        image_encoded = image_b64.split(',')[1]
        image = base64.decodebytes(image_encoded.encode('utf-8'))
        prediction = Model.predict(image)

    return json.dumps(prediction)
