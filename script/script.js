const rescueBoat = document.getElementById('rescueBoat');
const brokenBoat = document.getElementById('brokenBoat');

function jump() {
    if(rescueBoat.classList != 'jump') {
        // On ajoute au rescueBoat notre animation
        rescueBoat.classList.add('jump');
        setTimeout(function() {
            rescueBoat.classList.remove('jump');
        }, 300);
    }
}

let isAlive = setInterval(function() {
    // On la position courante du boat en Y
    let boatTop = parseInt(window.getComputedStyle(rescueBoat).getPropertyValue('top'));
    // On la position courante du rescueBoat en X
    let brokenBoatLeft = parseInt(window.getComputedStyle(brokenBoat).getPropertyValue('left'));

    // On regarde si les 2 se touchent
    if(brokenBoatLeft < 50 && brokenBoatLeft < 0 && boatTop >= 140) {
        alert('Game over !');
    }

    console.log(brokenBoatLeft);
    console.log(boatTop);
}, 10);


document.addEventListener('keydown', function(event) {
    jump();
});