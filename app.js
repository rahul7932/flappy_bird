// document.addEventListener('DOMContentLoaded', () => { //this makes sure that all the html loads before the js
   const bird = document.querySelector('.bird');
   const gameDisplay = document.querySelector('.game-container');
   const ground = document.querySelector('.ground');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 1;
    isGameOver = false;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    // the set interval method runs a fuction every given time interval
    let gameTimerId = setInterval(startGame, 20);
    // clearInterval(timerId); --> clears the timerId object and stops it

    function control(e) { // e is an event 
        if (e.keyCode === 87) { // 87 is the key code for the w key
            jump() // jump only if we press w key
        }
    }
    function jump() {
        if(birdBottom < 500) { // stop the bird from jumping off the screen
            birdBottom += 30; 
            bird.style.bottom = birdBottom +'px';
        }
    }

    document.addEventListener('keyup', control);

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div'); 
        const topObstacle = document.createElement('div');// creates a div
        if (!isGameOver) {
             obstacle.classList.add('obstacle'); 
             topObstacle.classList.add('topObstacle'); 
        }
        // adds the divs to the gameDisplay
        gameDisplay.appendChild(obstacle); 
        gameDisplay.appendChild(topObstacle);
        

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + 400 + 'px';
         
        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft > 200 && 
                obstacleLeft < 280 &&
                birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 ||
                    birdBottom > obstacleBottom + 200) ||
                birdBottom ===  0) {
                gameOver();
                clearInterval(timerId)
            }

            if (obstacleLeft === -60) {
                clearInterval(timeId); //stops moving it 
                gameDisplay.removeChild(obstacle); //removes the div from the game display
            }
        }
        // move the obstacle every 20 ms
        let timerId = setInterval(moveObstacle, 20);
        // generate new obstacles every 3 seconds if game is not over
        if (!isGameOver) setTimeout(generateObstacle, 3000); 

    }
    
    generateObstacle() 

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control); // remove space bar as a working key
    }


// })