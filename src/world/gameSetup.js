import createGame from 'voxel-engine';
import player from 'voxel-player';
import voxel from 'voxel';
import extend from 'extend';
import fly from 'voxel-fly';
import walk from 'voxel-walk';

export default function gameSetup(opts, setup) {
  setup = setup || defaultSetup;
  const defaults = {
    generate: voxel.generator['Hill'],
    chunkDistance: 2,
    worldOrigin: [0, 0, 0],
    controls: { discreteFire: true }
  };
  opts = extend({}, defaults, opts || {});

  // setup the game and add some trees
  const game = createGame(opts);

  if (game.notCapable()) return game;

  const createPlayer = player(game);

  // create the player from a minecraft skin file and tell the
  // game to use it as the main player
  const avatar = createPlayer(opts.playerSkin || 'player.png');
  avatar.possess();
  avatar.yaw.position.set(2, 14, 4);

  setup(game, avatar);

  return game;
}

export function defaultSetup(game, avatar) {

  const makeFly = fly(game);
  const target = game.controls.target();
  game.flyer = makeFly(target);

  // toggle between first and third person modes
  window.addEventListener('keydown', function (ev) {
    if (ev.keyCode === 'R'.charCodeAt(0)) avatar.toggle();
  })

  game.on('tick', function() {
    walk.render(target.playerSkin);
    const vx = Math.abs(target.velocity.x);
    const vz = Math.abs(target.velocity.z);
    if (vx > 0.001 || vz > 0.001) walk.stopWalking();
    else walk.startWalking();
  })

}
