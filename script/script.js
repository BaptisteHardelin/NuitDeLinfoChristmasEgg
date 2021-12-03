
/** @type {*} On récupère une référence vers notre image rescueBoat du fichier html */
const rescueBoat = document.getElementById('rescueBoat');
/** @type {*} On récupère une référence vers notre image brokenBoat du fichier html*/
const brokenBoat = document.getElementById('brokenBoat');
/** @type {*} On récupère une référence vers notre image rock du fichier html*/
const rock = document.getElementById('rock');
/** @type {*} On récupère une référence vers notre classe d'une div du fichier html*/
const game = document.getElementsByClassName('.game');
/** @type {*} On récupère une référence vers notre input qui vaut tourjous oui*/
let restartCheck = document.getElementById('restartCheck');
/** @type {*} On récupère une référence vers notre bouton pour rénitialiser la partie*/
let boutonEnvoyer = document.getElementById('restart');
/** @type {*} On créé un nouveau paragraphe*/
let para = document.createElement('p');
/** @type {boolean} On regarde si on a perdu (par défaut à false)*/
let gameOver = false;
let gameWidth = 600;

let demoCalc = window.getComputedStyle(rock).getPropertyValue('left');
console.log(demoCalc);
var pixelsX = (parseFloat(demoCalc) / 100 * rock.offsetWidth) + 'px';
var pixelsY = (parseFloat(demoCalc) / 100 * rock.offsetHeight) + 'px';
console.log(pixelsX);


/**
 * La fonction jump permet de faire sauter le personnage dans notre environnement grâce à la bar espace.
 * On appel l'animation de saut depuis le CSS (utilisation des classList)
 * @param {number} event Permet de savoir si on a appuyé sur la touche espace (code 32) si c'est on appel l'animation de saut de notre personnage
 */
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




/**
 * Fonction qui permet d'ajouter l'animation de déplacement
 * au broken boat
 */
function addBlockBrokenBoat() {
    brokenBoat.classList.add('brokenBoatAnim');
}

/**
 * Fonction qui permet de retirer l'animation de déplacement
 * du broken boat
 */
function blockBrokenBoat() {
    brokenBoat.classList.remove('brokenBoatAnim');
}

/**
 * Fonction qui permet d'ajouter l'animation de déplacement
 * au rock
 */
function addBlockRock() {
    rock.classList.add('rockAnim');
}

/**
 * Fonction qui permet de retirer l'animation de déplacement
 * du rock
 */
function blockBrokenRock() {
    rock.classList.remove('rockAnim');
}

addBlockBrokenBoat();
addBlockRock()


/**
 * Fonction qui permet de savoir si on a été touché par le borken boat
 * si c'est le cas on affiche 'Vous avez perdu'
 */
function fGameOverBrokenBoat() {
    gameOver = true;
    blockBrokenBoat();
    para.textContent = 'Vous avez perdu !';
}

/**
 * Fonction qui permet de savoir si on a été touché par le rock
 * si c'est le cas on affiche 'Vous avez perdu'
 */
function fGameOverRock() {
    gameOver = true;
    blockBrokenRock();
    para.textContent = 'Vous avez perdu !';
}


/** @type {void} Si on n'a pas touché le broken boat ou le rock alors on ne déclanche pas les éléments de fin de partie, on regarde cela toute les 10ms*/
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

/**
 * On regarde si on a appuyé sur une touche(la touche espace) et on fais un saut
 */
document.addEventListener('keydown', function(event) {
    jump(event);
});

/**
 * On regarde si on a appuyé sur le bouton restart alors on rénitialise 
 * la partie
 */
boutonEnvoyer.addEventListener('click', function() {
    if(restartCheck.value == 'oui') {
        addBlockBrokenBoat();
        addBlockRock();
        para.textContent = '';
    }
});

/**
 * On ajoute le paragraphe généré plus haut au body
 */
document.body.appendChild(para);