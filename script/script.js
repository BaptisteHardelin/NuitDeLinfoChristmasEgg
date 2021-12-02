const rescueBoat = document.getElementById('rescueBoat');
const brokenBoat = document.getElementById('brokenBoat');
const rock = document.getElementById('rock');
let restartCheck = document.getElementById('restartCheck');
let boutonEnvoyer = document.getElementById('restart');
let para = document.createElement('p');
let gameOver = false;

function jump(event) {
    var jump = event.keyCode;
    if(jump == 32) {
        if(rescueBoat.classList != 'jump') {
            // On ajoute au rescueBoat notre animation
            rescueBoat.classList.add('jump');
            setTimeout(function() {
                rescueBoat.classList.remove('jump');
            }, 300);
        }
    }
}


function addBlock(element) {
    brokenBoat.classList.add(element);
}

function block(element) {
    brokenBoat.classList.remove(element);
}

addBlock();

function fGameOver(element) {
    gameOver = true;
    block(element);
    para.textContent = 'Vous avez perdu !';
}

let isAlive = setInterval(function() {
    // On la position courante du boat en Y
    let boatTop = parseInt(window.getComputedStyle(rescueBoat).getPropertyValue('top'));
    // On la position courante du rescueBoat en X
    let brokenBoatLeft = parseInt(window.getComputedStyle(brokenBoat).getPropertyValue('left'));
    let rockLeft = parseInt(window.getComputedStyle(rock).getPropertyValue('left'));

    // On regarde si les 2 se touchent
    if(brokenBoatLeft < 50 && brokenBoatLeft < 0 && boatTop >= 140) {
        // On arrête l'animation du bateau
        fGameOver('brokenBoatAnim');
    }

    if(rockLeft < 50 && rockLeft < 0 && boatTop >= 140) {
        fGameOver('rockAnim');
    }
}, 10);

document.addEventListener('keydown', function(event) {
    jump(event);
});

boutonEnvoyer.addEventListener('click', function() {
    if(restartCheck.value == 'oui') {
        addBlock('brokenBoatAnim');
        //addBlock('rockAnim');
        para.textContent = '';
    }
});


document.body.appendChild(para);