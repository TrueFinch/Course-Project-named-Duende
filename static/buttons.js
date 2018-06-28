let last_answer;

function saveImg() {
    let digit_image = canvas.toDataURL('img/jpg');

    document.getElementById('result-handler').style.display = 'inline';
    document.getElementById('result-handler').style.visibility = 'visible';
    document.getElementById('text-result').innerHTML = 'Please, wait...';

    document.getElementsByName('yes_btn')[0].disabled = true;
    document.getElementsByName('no_btn')[0].disabled = true;
    // document.getElementsByName('detect')[0].disabled = true;
    // TODO: add check if image is empty

    $.ajax({
        type: "POST",
        url: "/hook",
        data: {
            imageBase64: digit_image
        }
    }).done(function (response) {
        console.log(response);
        document.getElementsByName('yes_btn')[0].disabled = false;
        document.getElementsByName('no_btn')[0].disabled = false;
        let json = jQuery.parseJSON(response);
        last_answer = json.answer;
        document.getElementById('text-result').innerText = 'Detected digit is ' + last_answer;

        document.getElementById("fnn1").style.color = 'black';
        document.getElementById("fnn2").style.color = 'black';
        document.getElementById("fnn3").style.color = 'black';
        document.getElementById("fnn_t1").style.color = 'black';
        document.getElementById("fnn_t2").style.color = 'black';
        document.getElementById("fnn_t3").style.color = 'black';

        document.getElementById("fnn1").innerHTML = json.fnn_original[0];
        document.getElementById("fnn2").innerHTML = json.fnn_original[1];
        document.getElementById("fnn3").innerHTML = json.fnn_original[2];
        document.getElementById("fnn_t1").innerHTML = json.fnn_trained[0];
        document.getElementById("fnn_t2").innerHTML = json.fnn_trained[1];
        document.getElementById("fnn_t3").innerHTML = json.fnn_trained[2];

        document.getElementById('result-table').style.display = 'block';
    });
}

function clearCanvas() {
    document.getElementsByName('yes_btn')[0].disabled = false;
    document.getElementsByName('no_btn')[0].disabled = false;
    document.getElementsByName('detect')[0].disabled = false;
    document.getElementById('btn-conf').disabled = false;
    document.getElementById('drawpad').getContext('2d').clearRect(0, 0, 200, 200);
    document.getElementById('result-handler').style.visibility = 'hidden';
    document.getElementById('result-handler').style.display = 'none';
    document.getElementById('answer-handler').style.visibility = 'hidden';
    document.getElementById('answer-handler').style.display = 'none';
    document.getElementById('rampage').style.visibility = 'hidden';
    document.getElementById('rampage').style.display = 'none';
    document.getElementById('epic-fail').style.visibility = 'hidden';
    document.getElementById('epic-fail').style.display = 'none';
}

function showCorrectPredictionScreen() {
    document.getElementsByName('yes_btn')[0].disabled = true;
    document.getElementsByName('no_btn')[0].disabled = true;
    // document.getElementsByName('detect')[0].disabled = true;
    document.getElementById('answer-handler').style.visibility = 'visible';
    document.getElementById('answer-handler').style.display = 'inline';
    document.getElementById('rampage').style.visibility = 'visible';
    document.getElementById('rampage').style.display = 'block';
    train(last_answer);
}

function showIncorrectPredictionScreen() {
    document.getElementsByName('yes_btn')[0].disabled = true;
    document.getElementsByName('no_btn')[0].disabled = true;
    // document.getElementsByName('detect')[0].disabled = true;
    document.getElementById('answer-handler').style.visibility = 'visible';
    document.getElementById('answer-handler').style.display = 'inline';
    document.getElementById('epic-fail').style.visibility = 'visible';
    document.getElementById('epic-fail').style.display = 'block';
}

function sendToTrain() {
    // document.getElementById('btn-conf').disabled = true;
    let answer = '';
    let radio_buttons = document.getElementsByName('optradio');
    for (let i = 0; i < radio_buttons.length; ++i) {
        if (radio_buttons[i].checked) {
            answer = radio_buttons[i].value;
            break;
        }
    }
    train(answer);
}

function train(digit) {
    let digit_image = canvas.toDataURL('img/jpg');
    document.getElementById('status').innerText = 'training';
    $.ajax({
        type: "POST",
        url: "/hook_train",
        data: {
            imageBase64: digit_image,
            answer: digit
        }
    }).done(function (response) {
        console.log(response);
        document.getElementById('status').innerText = 'trained';
        // TODO: display status: detecting, detected, training, trained
    });
}