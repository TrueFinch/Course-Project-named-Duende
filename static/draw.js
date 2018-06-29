// set canvas id to variable
let canvas = document.getElementById('drawpad');

// get canvas 2D context and set it to the correct size
let context = canvas.getContext('2d');

// add event listeners to specify when functions should be triggered
document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', setPosition);
document.addEventListener('mouseenter', setPosition);

// last known position
let pos = {x: 0, y: 0};

// new position from mouse events
function setPosition(e) {
    pos.x = e.clientX - canvas.getBoundingClientRect().left;
    pos.y = e.clientY - canvas.getBoundingClientRect().top;
}

function draw(e) {

    if (e.buttons !== 1) return; // if mouse is pressed.....

    let color = "#ffffff";

    context.beginPath(); // begin the drawing path

    context.lineWidth = 10; // width of line
    context.lineCap = 'round'; // rounded end cap
    context.strokeStyle = color; // hex color of line

    context.moveTo(pos.x, pos.y); // from position
    setPosition(e);
    context.lineTo(pos.x, pos.y); // to position

    context.stroke(); // draw it!
}