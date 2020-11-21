document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')

    let birdLeft = 315
    let birdBottom = 100
    let gravity = 3
    isGameOver = false
    let gap = 500
    

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)
    
    function control (e) {
        if (e.keyCode === 32) { //key code 32 is the spacebar, makes it so only spacebar activates jump
            jump()
        }
    }

    function jump() {
        if( birdBottom < 470) {
            birdBottom += 70
        }
        bird.style.bottom = birdBottom + 'px' 
        console.log('bird jump at ',birdBottom)  //tells how many px above ground
    }
    document.addEventListener('keydown', control)  //use jump instead of control to allow any button hit

    function generateObstacle() {
        let obstacleLeft = 750
        let randomHeight = Math.random() * 100
        let obstacleBottom = randomHeight
        console.log('obstacle bottom is ', obstacleBottom)

        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {  //to make sure to stop creating obstacles once the game is over
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            if (!isGameOver){
                obstacleLeft -= 2
            }
            
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            
            if (obstacleLeft === -83) {  //83 is the width of the pipe, once out of view remove it
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }

            if (birdBottom <= 0 ||  //if the bird touches the ground (bottom of sky grid)
                obstacleLeft > 215 && obstacleLeft < 378 && birdLeft === 315 && // if bird hits an obstacle  --> the values came from where any part of the pipe can hit the bird
                (birdBottom < obstacleBottom + 155 || birdBottom > obstacleBottom + gap - 220)) {  // this allows for the bird to fly over an obstacle
                    gameOver()
                    clearInterval(timerId)
                }
        }
        let timerId = setInterval(moveObstacle, 20)
        if (!isGameOver) {
            setTimeout(generateObstacle, 2000)
        }
    }
    generateObstacle()


    function gameOver() {
        clearInterval(gameTimerId)
        console.log('gameover')
        isGameOver = true
        document.removeEventListener('keydown', control)  //disallow using the spacebar to jump once a game over is reached
    }

})