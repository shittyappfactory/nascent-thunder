import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkSnow from 'voxel-snow';
import player from 'voxel-player';
import fly from 'voxel-fly';
import haikume from 'haiku.js';
import walk from './multiwalk';
import addFog from './fog';

import constants, { ACTIONS } from '../constants';
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

    const nemeses = {};

    const updateNemeses = () => {
      const { players } = this.props.game;
      Object.keys(players).forEach(username => {
        const nemData = players[username];
        let nem = nemeses[username];
        if (!nem) {
          nem = nemeses[username] = npc(game)('./assets/player_red.png');
          nem.walk = walk();
          nem.isWalking = null;
        }
        nem.mesh.position.set(nemData.location.x, nemData.location.y, nemData.location.z);
        nem.mesh.rotation.set(0, nemData.yaw, 0);
        nem.head.rotation.set(0, 0, nemData.pitch);
        nem.walk.render(nem);
        if (nemData.isWalking !== nem.isWalking) {
          if (nemData.isWalking) {
            nem.walk.startWalking();
          } else {
            nem.walk.stopWalking();
          }
        }
        nem.isWalking = nemData.isWalking;
      });
    };

    nemesisWalk.startWalking();
    console.log({ nemesis, avatar });

    const snow = mkSnow({
      game,
      count: 2000,
      size: 20,
      speed: 0.1,
      drift: 1,
    });

    function round(n, d = 2) {
      const e = Math.pow(10, d);
      return Math.round(n * e) / e;
    }

    addFog(game);
    let counter = 0;
    let delta = 0;
    let lastNow = 0;

    this.props.dispatch({
      type: ACTIONS.INIT_SELF,
      username: this.props.location.query.username || haikume(),
    });

    game.on('tick', () => {
      updateNemeses();
      const now = Date.now();
      delta = now - lastNow;
      lastNow = now;
      counter += delta;

      snow.tick();
      playerWalk.render(target.playerSkin);
      nemesis.mesh.position.set(10*Math.cos(0.2e-3 * now), 0, 10*Math.sin(0.2e-3 * now));
      nemesis.mesh.rotation.set(0, Math.atan2(Math.cos(0.2e-3*now), Math.sin(0.2e-3*now)) + Math.PI / 2, 0);
      nemesisWalk.render(nemesis);
      const vx = Math.abs(target.velocity.x);
      const vz = Math.abs(target.velocity.z);
      const isWalking = vx > 0.001 || vz > 0.001;
      if (isWalking) playerWalk.stopWalking();
      else playerWalk.startWalking();
      if (counter > constants.FIREBASE_REFRESH_INTERVAL) {
        counter = 0;
        this.props.dispatch({
          type: ACTIONS.UPDATE_SELF,
          properties: {
            location: {
              x: round(avatar.position.x),
              y: round(avatar.position.y),
              z: round(avatar.position.z),
            },
            velocity: {
              x: round(target.velocity.x, 4),
              y: round(target.velocity.y, 4),
              z: round(target.velocity.z, 4),
            },
            yaw: round(avatar.rotation.y),
            pitch: round(avatar.pitch.rotation.x),
            isWalking,
          }
        });
      }
    });

    game.appendTo(this.refs.viewport);
  }

  handleTick() {

  }

  render() {
    return (<div className="World">
      <div className="World__viewport" ref="viewport"/>
    </div>);
  }
}
