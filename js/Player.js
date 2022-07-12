class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.rank = 0;
    this.points = 0;
    this.fuel = 185;
    this.points = 0;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 100;
    } else {
      this.positionX = width / 2 + 100;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      points: this.points
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
  update () {
  var index_do_jogador= 'players/player' + this.index;
  database.ref (index_do_jogador).update({
  positionX: this.positionX,
  positionY: this.positionY,
  rank: this.rank,
  points: this.points
  })
  }
  getDistance () {
 var distance_de_referencia= database.ref('players/player' + this.index);
 distance_de_referencia.on('value', data => {
   var data= data.val ();
   this.positionX = data.positionX;
   this.positionY = data.positionY;
 })
}
}
