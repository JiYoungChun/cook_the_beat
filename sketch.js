var p = 1;
var speed = 0;
var angle = 0;
var n = 1;
var mouse1 = 0;
var mouse2 = 0;


function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
}

function draw() {
    background(255);
    mouse1 = map(mouseY, 0, height, 0.9, 1.1);
    mouse2 = map(mouseX, 0, width, 0.9, 1.1);
    //console.log(mouse2);


    //rose pattern
    p = map(mouseX, 0, width, 0, 1000);

    translate(width / 2, height / 2 - 55);
    rotate(angle);
    beginShape();
    for (var a = 0; a < TWO_PI * 500 / n; a += 0.5) {


        var r = 350 * cos(p * a);
        var x = r * cos(a);
        var y = r * sin(a);
        stroke(0);
        strokeWeight(0.03);
        noFill();
        vertex(x, y);
    }

    endShape(CLOSE);

    //rotation speed 
    speed = map(mouseY, 0, height, -0.1, 0.1);
    angle += speed;

}


//beat making set 

var kit = new Tone.MultiPlayer({
    "kick": "https://tonejs.github.io/examples/audio/505/kick.mp3",
    "snare": "https://tonejs.github.io/examples/audio/505/snare.mp3",
    "hh": "https://tonejs.github.io/examples/audio/505/hh.mp3"
}, function() {
    Tone.Transport.start()
}).toMaster()

function drum() {
    var drumPattern = new Tone.Pattern(function(time, note) {
        kit.start(note, time)
    }, ["kick", "hh", "hh", "hh", "hh", "hh", "hh", "hh"], 'up').start()
}

function drum2() {
    var drumPattern = new Tone.Pattern(function(time, note) {
        kit.start(note, time)
    }, ["kick", "hh", "snare", "hh", "hh", "kick", "snare", "hh"], 'up').start()
}


var synth = new Tone.DuoSynth().toMaster()

//create a loop
function loop1() {
    var loop = new Tone.Loop(function(time) {
        synth.triggerAttackRelease("C2", .1, time)
    }, "2n").start()
}

function loop2() {
    var loop = new Tone.Loop(function(time) {
        synth.triggerAttackRelease("E3", .1, time)
    }, "1n").start()
}

function loop3() {
    var loop3 = new Tone.Loop(function(time) {
        synth.triggerAttackRelease("G3", .1, time)
    }, "1n").start()
}

function loop4() {
    var loop4 = new Tone.Loop(function(time) {
        synth.triggerAttackRelease("B2", 0.5, time)
    }, "1n").start()
}

function soundPattern() {
    var synthPattern = new Tone.Pattern(function(time, note) {
        synth.triggerAttackRelease(note, 0.1, time)
    }, ["C2", "E2", "G2", "B1"], 'up').start()
}

function soundPattern2() {
    var synthPattern = new Tone.Pattern(function(time, note) {
        synth.triggerAttackRelease(note, .1, time)
    }, ["C3", "E3", "G3", "B2"], 'randomOnce').start()
}

var hh = "https://tonejs.github.io/examples/audio/505/hh.mp3";

var hhplayer = new Tone.Player(hh).toMaster();
var kick = "https://tonejs.github.io/examples/audio/505/kick.mp3";

var kickplayer = new Tone.Player(kick).toMaster();

function hh() {
    hhplayer.start();
}

function kick() {
    kickplayer.start();
}


function start() {
    Tone.Transport.start('+0.1')
}

function stop() {
    Tone.Transport.stop()
}