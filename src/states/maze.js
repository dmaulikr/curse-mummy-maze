import PhaserGameState from 'phaser-game-state';
import PhaserGame from 'phaser-game';
import Phaser from 'phaser';
import PhaserTouchControl from 'phaser-touch-control';
import Map from '../objects/map';

var cursors, space;

class Preload extends PhaserGameState{
  constructor(game) {
    this.game = game;
  }

  create() {
    this.map = new Map(this);

    this.touchControl = this.game.plugins.add(PhaserTouchControl);
    this.touchControl.settings.singleDirection = true;
    this.touchControl.settings.maxDistanceInPixels = 50;
    this.touchControl.inputEnable();

    cursors = this.input.keyboard.createCursorKeys();
    space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.game.sound.play('music', 1, true);
  }

  update() {
    if (this.map.enemyMoves <= 1) {
      if (cursors.up.isDown || this.touchControl.cursors.up) {
        this.map.player.move('up');
      } else if (cursors.down.isDown || this.touchControl.cursors.down) {
        this.map.player.move('down');
      } else if (cursors.right.isDown || this.touchControl.cursors.right) {
        this.map.player.move('right');
      } else if (cursors.left.isDown || this.touchControl.cursors.left) {
        this.map.player.move('left');
      } else if (space.isDown) {
        this.map.player.move('skip');
      }
    }
  }
};

export default Preload;