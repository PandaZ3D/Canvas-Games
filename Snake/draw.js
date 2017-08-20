// Module pattern to draw objects
var drawModule = (function () { 
    var bodySnake = function(x, y) {
        // snake body is made of single squares
        ctx.fillStyle = 'green'; 
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // this is border of square
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    var apple = function(x, y) {
        // this is the border of the food
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // this is a single square 
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    }

    var scoreText = function() {
        // how much did the snake eat
        var score_text = "Score: " + score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
    }

    /* Snake body made of empty array with elements pushed onto chain */ 
    var drawSnake = function() {
        // initial snake body length = 5
        var length = 4;
        snake = [];
        // push 5 elements into array with for loop
        // elements will have x = 0 and y = index
        for (var i = length; i>=0; i--) {
            snake.push({x:i, y:0});
        }  
    }

    var paint = function () {
        // draw snake's movemement space
        ctx.fillStyle = 'lightgrey';
        ctx.fillRect(0, 0, w, h);

        // border
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, w, h);

        // disable button _start_ while playing
        btn.setAttribute('disabled', true);

        var snakeX = snake[0].x;
        var snakeY = snake[0].y;

        /*
        Make the snake move.
        Use a variable ('direction') to control the movement.
        To move the snake, pop out the last element of the array and shift it on the top as first element.
        */
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }

        /*
        If the snake touches the canvas path or itself, it will die!
        Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
        If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again. 
        */
        if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || check_collision(snakeX, snakeY, snake)) {
            //Stop the game.

            //Make the start button enabled again.
            btn.removeAttribute('disabled', true);

            //Clean up the canvas.
            ctx.clearRect(0, 0, w, h);
            gameloop = clearInterval(gameloop);
            return;
        }

        //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
        if (snakeX == food.x && snakeY == food.y) {
            //Create a new square instead of moving the tail.
            var tail = {
                x: snakeX,
                y: snakeY
            };
            score++;

            //Create new food.
            createFood();
        } else {

            //Pop out the last cell.
            var tail = snake.pop();
            tail.x = snakeX;
            tail.y = snakeY;
        }

        //Puts the tail as the first cell.
        snake.unshift(tail);

        //For each element of the array create a square using the bodySnake function we created before.
        for (var i = 0; i < snake.length; i++) {
            bodySnake(snake[i].x, snake[i].y);
        }

        //Create food using the _pizza_ function.
        apple(food.x, food.y);

        //Put the score text.
        scoreText();
    }

    // Food random squares on canvas. Sqaure is obj (x,y)
    var createFood = function() {
          food = {
            // random numbers for position
            x: Math.floor((Math.random() * 30) + 1),
            y: Math.floor((Math.random() * 30) + 1)
        }
        
        // change rand location if position same as snake's
        for (var i=0; i>snake.length; i++) {
            var snakeX = snake[i].x;
            var snakeY = snake[i].y;
            
             if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 30) + 1);
                food.y = Math.floor((Math.random() * 30) + 1);
            }
        }
    }

    // We must then consider when a snake collides with itself
    var checkCollision = function(x, y, array) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].x === x && array[i].y === y)
            return true;
        } 
        return false;
    }

    var init = function () {
      direction = 'down';
      drawSnake();
      createFood();
      gameloop = setInterval(paint, 80);
    }

      //You need to return only the _init_ function at the end of the Module.
      return {
          init: init
      };

      //Close the Module.    
    }());