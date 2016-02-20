import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkSnow from 'voxel-snow';
import player from 'voxel-player';
import fly from 'voxel-fly';
import walk from './multiwalk';
import addFog from './fog';

import gameSetup from './gameSetup';
import npc from './npc';

import './world.scss';

export default class World extends Component {
  componentDidMount() {
    const game = gameSetup({
      texturePath: '/assets/',
      materials: [
        ['whitewool', 'dirt', 'grass_side_snowed'],
        'obsidian',
        'grass',
        'brick'
      ],
      generate: (x, y, z) => {
        if (y < 0) return (Math.abs(x) < 5 && Math.abs(z) < 5) ? 4 : 1;
        if (y < 5) {
          if (Math.abs(x) < 5 && Math.abs(z) < 5 && y < 1) return 1;
          return ((x+5) % 10 === 0 && (z + 5) % 10 === 0) ? 2 : 0;
        }
        return 0;
      },
      skyColor: 0xeeeeee,
      statsDisabled: true,
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

    const nemesis = npc(game)('./assets/player_red.png');
    const nemesisWalk = walk();
    nemesisWalk.startWalking();
    console.log({ nemesis, avatar });

    const snow = mkSnow({
      game,
      count: 2000,
      size: 20,
      speed: 0.1,
      drift: 1,
    });

    addFog(game);

    game.on('tick', () => {
      const now = Date.now() / 1000;
      snow.tick();
      playerWalk.render(target.playerSkin);
      nemesis.mesh.position.set(10*Math.cos(0.2 * now), 0, 10*Math.sin(0.2 * now));
      nemesis.mesh.rotation.set(0, Math.atan2(Math.cos(0.2*now), Math.sin(0.2*now)) + Math.PI / 2, 0);
      nemesisWalk.render(nemesis);
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
