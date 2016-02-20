import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkPlayer from 'voxel-player';
import mkSnow from 'voxel-snow';

import './world.scss';

export function mkGame() {
  const game = createEngine({
    generateVoxelChunk: createTerrain({ scaleFactor: 10 }),
    chunkDistance: 2,
    materials: [
      'obsidian',
      ['whitewool', 'dirt', 'grass_dirt'],
      'grass',
      'plank'
    ],
    texturePath: '/assets/',
    worldOrigin: [0, 0, 0],
    controls: { discreteFire: true }
  });

  const createPlayer = mkPlayer(game);
  const player = createPlayer('/assets/player.png');
  player.yaw.position.set(0, 0, 0);
  player.possess();

  const snow = mkSnow({
    game: game,
    count: 2000,
    size: 20
  });

  game.on('tick', function() {
    snow.tick();
  });

  return game;
}

export function appendTo(game, el) {
  game.appendTo(el);
}

export default class World extends Component {
  componentDidMount() {
    const game = mkGame();
    appendTo(game, this.refs.viewport);
  }
  render() {
    return (<div className="World">
      <div className="World__viewport" ref="viewport"/>
    </div>);
  }
}
