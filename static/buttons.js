function saveImg() {
    let digit_image = canvas.toDataURL('img/jpeg');

    document.getElementById('result-handler').style.display = 'inline';
    document.getElementById('result-handler').style.visibility = 'visible';
    document.getElementById('text-result').innerHTML = 'Please, wait...';

    $.ajax({
        type: "POST",
        url: "/hook",
        data: {
            imageBase64: digit_image
        }
    }).done(function (response) {
        console.log(response);

        let json = jQuery.parseJSON(response);

        document.getElementById('text-result').innerHTML = 'We think that your digit is ' + json.digit + '. Is it correct?';


    });
}

function clearCanvas() {
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
    document.getElementById('answer-handler').style.visibility = 'visible';
    document.getElementById('answer-handler').style.display = 'inline';
    document.getElementById('rampage').style.visibility = 'visible';
    document.getElementById('rampage').style.display = 'block';
}

function showIncorrectPredictionScreen() {
    document.getElementById('answer-handler').style.visibility = 'visible';
    document.getElementById('answer-handler').style.display = 'inline';
    document.getElementById('epic-fail').style.visibility = 'visible';
    document.getElementById('epic-fail').style.display = 'block';
}