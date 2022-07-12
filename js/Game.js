class Game {
  constructor() {
  this.resetTitulo= createElement ('h2');
  this.resetButton= createButton ('');
  this.rankings= createElement ('h2');
  this.leader1= createElement ('h2');
  this.leader2= createElement ('h2');
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    fuels= new Group ();
  coins= new Group ();
  obstacles= new Group ();
  // sprites pode ser qualquer objeto, essa função é GENÉRICA
  this.addSprites (fuels, 4, fuels_Img, 0.05);
  this.addSprites (coins, 18, coins_Img, 0.09);

  this.addSprites (obstacles, 4, obstacles_Img, 0.05);
  
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.resetTitulo.html('reiniciar');
    this.resetTitulo.class("resetText");
    this.resetButton.class('resetButton');
    this.resetButton.position (width / 2 + 230, 100 );
    this.rankings.html ('placar');
    this.rankings.class ('resetText');
    this.rankings.position (width/3 - 700, 40);
    this.leader1.class ('leadersText');
    this.leader1.position (width/3 - 50, 80);
    this.leader2.class ('leadersText');
    this.leader2.position (width/3 - 50, 130);
  }

  play() {
    this.handleElements();
    this.buttonClick ();
    Player.getPlayersInfo();
    
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);
      this.showLeadres ();
      var index= 0;
      //plr é a matriz da posição dos jogadores
      for (var plr in allPlayers) {
        index= index + 1;
        var x= allPlayers[plr].positionX;
        var y= height-allPlayers[plr].positionY;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if (index == player.index ) {
        fill ('blue');
        ellipse(x,y,60,60);
        camera.position.x= cars[index -1].position.x;
        camera.position.y= cars[index -1].position.y
        }
      }

      this.controls();
      drawSprites();
    }
  }
  controls () {
    if (keyIsDown(UP_ARROW)) {
  player.positionY= player.positionY + 5;
  player.update();
  
    }
    if (keyIsDown(LEFT_ARROW)) {
      player.positionX= player.positionX - 5;
      player.update();
      
        }

        if (keyIsDown(RIGHT_ARROW)) {
          player.positionX= player.positionX + 5;
          player.update();
          
            }
  }
// a var player vai armazenar o valor do objeto all Players
  showLeadres () {
  var leader2;
  var leader1;
  var players = Object.values (allPlayers);
  
  if (players [0].rank == 0 && players [1].rank == 0 || players [0].rank == 1) {
    //&emsp significa espaço na programação
   leader1= players [0].rank + "&emsp;" + players [0].name + "&emsp;" + players [0].points;
   leader2= players [1].rank + "&emsp;" + players [1].name + "&emsp;" + players [1].points;
  }

  this.leader1.html (leader1);
  this.leader2.html (leader2);
  }
  buttonClick () {
    this.resetButton.mousePressed (
    ()=> {
      // '/' é diretório raiz
      database.ref ('/').set ({
        gameState: 0,
        playerCount: 0,
        players: {}
      })
      window.location.reload ();
    }
    )
  }
  
  addSprites (spritesGroup, num, spritesImg, scaleSprites ) {
  for (var i = 0; i < num; i++) {
    var x= random (width/2 + 150, width/2 - 150 )
    var y= random (-height*4.5, height - 400)}
    var sprite= createSprite (x, y);
    sprite.addImage (spritesImg);
    sprite.scale = scaleSprites;
    spritesGroup.add (sprite);
  }
}
