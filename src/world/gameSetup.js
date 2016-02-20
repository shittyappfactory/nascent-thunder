import createGame from 'voxel-engine';
import player from 'voxel-player';
import voxel from 'voxel';
import extend from 'extend';
import fly from 'voxel-fly';
import walk from 'voxel-walk';

export default function gameSetup(opts, setup) {
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

  return game;
}
