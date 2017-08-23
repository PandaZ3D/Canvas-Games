var drawModule = (function () { 
  //init paint on canvas
  var bodySnake = function(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = "2";
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var apple = function(x, y) {
        ctx.fillStyle = 'white';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }

  var scoreText = function() {
    var score_text = "Score: " + score;
    var high_text = "High: " + high;

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(score_text, 5, h-5);

    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'white';
    ctx.fillText(high_text, w-60, h-5);
  }

  //random methods
  var randCoor = function () {
    return Math.floor((Math.random() * 30) + 1);
  }
  
  //random color generation
  //https://www.paulirish.com/2009/random-hex-color-code-snippets/
  var randColor = function() {
    var n = Math.floor(Math.random()*16777215).toString(16);
    //check for propetly formatted strings
    for(var i = n.length; i<6; i++){
        n = '0' + n;
    }
    return '#'+n;
  }

  //drawing elements
  var drawSnake = function(x, y) {
      var length = 4;
      s = [];
      for (var i = length-1; i>=0; i--) {
          s.push({x:x+i, y:y});
      }
      return s;  
  }
    
  var paint = function(){
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);
      click = true;

      /*
      //check snake player
      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; 
      }

      if (snakeX == -1 || snakeX == w/snakeSize || snakeY == -1 || snakeY == h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);

          click = false;
          score = 0;
          colors.pop();

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
      }
        
      if(snakeX == food.x && snakeY == food.y) {
        var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
        score ++;
        if(score > high) {
          high++;
        }
        createFood(); //Create new food
      } else {
        var tail = snake.pop(); //pops out the last cell
        tail.x = snakeX; 
        tail.y = snakeY;
      }
      //The snake can now eat the food.
      snake.unshift(tail); //puts back the tail as the first cell
      */

      //move enemy snake
      var snakeX = enemy[0].x;
      var snakeY = enemy[0].y;

      if (edir == 'right') { 
        snakeX++; }
      else if (edir == 'left') { 
        snakeX--; }
      else if (edir == 'up') { 
        snakeY--; 
      } else if(edir == 'down') { 
        snakeY++; 
      }

      if (snakeX == -1) {
        edir = "down";
        snakeX++;
      } else if (snakeX == w/snakeSize) {
        edir = "up";
        snakeX--;
      } else if (snakeY == -1) {
        edir = "left";
        snakeY++;
      } else if (snakeY == h/snakeSize) {
        edir = "right";
        snakeY--;   
      }
        
      if(snakeX == food.x && snakeY == food.y) {
        var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
        createFood(); //Create new food
      } else {
        tail = enemy.pop();
        tail.x = snakeX;
        tail.y = snakeY;
      }
      //The snake can now eat the food.
      enemy.unshift(tail); //puts back the tail as the first cell
      /*
      //draw snakes
      for(var i = 0; i < snake.length; i++) {
        bodySnake(snake[i].x, snake[i].y, colors[0]);
      } 
      */
      for(var i = 0; i < enemy.length; i++) {
        bodySnake(enemy[i].x, enemy[i].y, colors[1]);
      } 

      apple(food.x, food.y); 
      scoreText();
  }

  //food initializer
  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      /*for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }*/
  }

  //position and movement
  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var moveEnemy = function () {
    
  }

  var init = function(){
      //initialize snake
      direction = "down";
      //snake = drawSnake(0,0);
      //initialize enemy
      edir = "right";
      colors.push(randColor());
      enemy = drawSnake(randCoor(),randCoor());
      //generate food
      createFood();
      //main game
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };

    
}());