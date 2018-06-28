function saveImg() {
    let digit_image = canvas.toDataURL('img/jpeg');

    document.getElementById('result-handler').style.visibility = 'visible';
    document.getElementById('answer-handler').style.visibility = 'visible';

    document.getElementById('text-result').innerHTML = 'Please, wait...';

    $.ajax({
        type: "POST",
        url: "/hook",
        data: {
            imageBase64: digit_image
        }
    }).done(function (response) {
        console.log(response);
        document.getElementById('result-handler').style.visibility = 'visible';
        document.getElementById('answer-handler').style.visibility = 'visible';

        // let result = document.getElementById('result');

        let json = jQuery.parseJSON(response);
        // result.alt = json.digit;
        // result.src = json.image;

        document.getElementById('text-result').innerHTML = 'We think that your digit is ' + json.digit + '. Is it correct?';


    });
}
