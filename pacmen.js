var pos = 0;
const pacArray = [
    ['./images/pacman1.png', './images/pacman2.png'],
    ['./images/pacman3.png', './images/pacman4.png'] // Corrected the typo here
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(200);
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0][0];
    newimg.width = 100;
    newimg.style.left = position.x + 'px';
    newimg.style.top = position.y + 'px';
    game.appendChild(newimg);

    return {
        position,
        velocity,
        newimg,
        imgIndex: 0,  // Keep track of the current image index
        direction: 0  // Keep track of the direction
    }
}

function update() {
    pacMen.forEach((item) => {
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

        
        item.imgIndex = (item.imgIndex + 1) % 2; // Cycle between 0 and 1
        item.newimg.src = pacArray[item.direction][item.imgIndex];
    });
    setTimeout(update, 200); 
}

function checkCollisions(item) {
    if (item.position.x + item.velocity.x < 0 || item.position.x + item.velocity.x > window.innerWidth - item.newimg.width) {
        item.velocity.x = -item.velocity.x;
        item.direction = item.direction === 0 ? 1 : 0; // Change direction
    }
    if (item.position.y + item.velocity.y < 0 || item.position.y + item.velocity.y > window.innerHeight - item.newimg.height) {
        item.velocity.y = -item.velocity.y;
    }
}

function makeOne() {
    pacMen.push(makePac());
}


