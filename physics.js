////////////////////////////////////////////////////////////////
// add a "ground" object in the world which is represented by a rectangle
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
// draw the ground at the bottom of the canvas
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}

////////////////////////////////////////////////////////////////
// add a "propeller" in the worl and make it static suspended at some height from the ground
function setupPropeller(){
  // your code here
  propeller = Bodies.rectangle(150, 480, 200, 15, {
    isStatic: true,
    angle: angle
  });
  World.add(engine.world, [propeller]);
}

////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  fill(255);
  drawVertices(propeller.vertices);
  pop();
}

////////////////////////////////////////////////////////////////
// add "bird" object in the world everytime this function is called
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}

////////////////////////////////////////////////////////////////
// draw birds on the screen as the current mouse location and remove the birds which are outside the canvas
function drawBirds(){
  push();
  // //your code here
  for (var i = 0; i < birds.length; i++) {
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    } else {
      fill("red");
      drawVertices(birds[i].vertices);
    }
  }
  pop();
}

////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 6; j++) {
      var box = Bodies.rectangle(700 + i * 80, 100 + j * 80, 80, 80);
      boxes.push(box);
      colors.push(color(0, random(50, 200), random(50, 200)));
    }
  }
  World.add(engine.world, boxes);
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i = 0; i < boxes.length; i++) {
    push();
    fill(colors[i]);
    drawVertices(boxes[i].vertices);
    pop();
  }
  pop();

  // remove boxes from the array as soon as they leave the canvas
  for (var i = 0; i < boxes.length; i++) {
    if (isOffScreen(boxes[i])) {
      removeFromWorld(boxes[i]);
      boxes.splice(i, 1);
      i--;
    }
  }
  
}

////////////////////////////////////////////////////////////////
function setupSlingshot(){
// define a slingshot bird that will be added in the world
slingshotBird = Bodies.circle(250, 200, 20, {
  friction: 0,
  restitution: 0.95,
  mass: 10
});

// define a sling that will be added in the world and is attached to the SlingShotBird
slingshotConstraint = Constraint.create({
  bodyA: slingshotBird,
  pointB: {x:250, y:200},
  stiffness: 0.01,
  damping: 0.0001
});

// adding slingshotConstraint and slingShotBird
World.add(engine.world, [slingshotBird, slingshotConstraint]);
}

////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill(200,30,0);
  drawVertices(slingshotBird.vertices);
  drawConstraint(slingshotConstraint);
  pop();
}

/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
