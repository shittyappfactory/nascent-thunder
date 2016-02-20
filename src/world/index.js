import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkPlayer from 'voxel-player';
import mkSnow from 'voxel-snow';
import hello from 'voxel-hello-world';

import './world.scss';

export default class World extends Component {
  componentDidMount() {
    const game = hello({
      texturePath: '/assets/',
      materials: [
          'obsidian',
          ['whitewool', 'dirt', 'grass_dirt'],
          'grass',
          'brick'
        ],
        playerSkin: '/assets/player.png',
        startingPosition: [0, 1000, 0],
    });
    game.appendTo(this.refs.viewport);
  }
  render() {
    return (<div className="World">
      <div className="World__viewport" ref="viewport"/>
    </div>);
  }
}
