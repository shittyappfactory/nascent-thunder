import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkSnow from 'voxel-snow';
import player from 'voxel-player';
import fly from 'voxel-fly';
import walk from './multiwalk';

import gameSetup from './gameSetup';
import npc from './npc';

import './world.scss';

export default class World extends Component {
  componentDidMount() {
    const game = gameSetup({
      texturePath: '/assets/',
      materials: [
        ['whitewool', 'dirt', 'grass_dirt'],
        'obsidian',
        'grass',
        'brick'
      ],
      playerSkin: '/assets/player.png',
      startingPosition: [0, 1000, 0],
    });
    const playerWalk = walk();
    const avatar = player(game)('/assets/player.png');
    avatar.possess();
    avatar.yaw.position.set(2, 14, 4);
    const target = game.controls.target();

    window.addEventListener('keydown', function (ev) {
      if (ev.keyCode === 'R'.charCodeAt(0)) avatar.toggle();
    })

    //const nemesis = npc(game)('./assets/player.png');
    //nemesis.yaw.position.set(30, 20, 40);

    game.on('tick', function() {
      playerWalk.render(target.playerSkin);
      const vx = Math.abs(target.velocity.x);
      const vz = Math.abs(target.velocity.z);
      if (vx > 0.001 || vz > 0.001) playerWalk.stopWalking();
      else playerWalk.startWalking();
    });

    game.appendTo(this.refs.viewport);
  }
  render() {
    return (<div className="World">
      <div className="World__viewport" ref="viewport"/>
    </div>);
  }
}
