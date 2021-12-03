const rescueBoat = document.getElementById('rescueBoat');
const brokenBoat = document.getElementById('brokenBoat');
const rock = document.getElementById('rock');
const game = document.getElementsByClassName('.game');
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
            }, 1000);
        }
    }
}

let styleLeftRock = rock.style.left;
let styleLeftGame = rock.style.left;
if(styleLeftRock > styleLeftGame) {
    rock.style.display = 'none';
} else {
    rock.style.display = 'block';
}


function addBlockBrokenBoat() {
    brokenBoat.classList.add('brokenBoatAnim');
}

function blockBrokenBoat() {
    brokenBoat.classList.remove('brokenBoatAnim');
}

function addBlockRock() {
    rock.classList.add('rockAnim');
}

function blockBrokenRock() {
    rock.classList.remove('rockAnim');
}

addBlockBrokenBoat();
addBlockRock()

function fGameOverBrokenBoat() {
    gameOver = true;
    blockBrokenBoat();
    para.textContent = 'Vous avez perdu !';
}

function fGameOverRock() {
    gameOver = true;
    blockBrokenRock();
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
        fGameOverBrokenBoat();
        fGameOverRock();
    }

    if(rockLeft < 50 && rockLeft < 0 && boatTop >= 140) {
        fGameOverRock();
        fGameOverBrokenBoat();
    }

}, 10);

document.addEventListener('keydown', function(event) {
    jump(event);
});

boutonEnvoyer.addEventListener('click', function() {
    if(restartCheck.value == 'oui') {
        addBlockBrokenBoat();
        addBlockRock();
        para.textContent = '';
    }
});

document.body.appendChild(para);