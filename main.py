from flask import Flask, render_template, request
import json

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
    global image_b64
    if request.method == "POST":
        image_b64 = request.values["imageBase64"]
    return json.dumps({
        'digit': '2'
    })
