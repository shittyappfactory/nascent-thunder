import React, { Component } from 'react';

import createEngine from 'voxel-engine';
import createTerrain from 'voxel-perlin-terrain';
import mkPlayer from 'voxel-player';
import mkSnow from 'voxel-snow';

import './world.scss';

export default class World extends Component {
  componentDidMount() {
    var createGame = require('voxel-engine')

function sphereWorld(x, y, z) {
  // return the index of the material you want to show up
  // 0 is air
	if (x*x + y*y + z*z > 15*15) return 0
  return 3
}

function flatWorld(i,j,k) {
  return j < 1 ? 1 : 0;
}

function swordfishII(prev, curr){
	var voxels = [
    [-6, 1, -1, 2],
    [-5, 1, -1, 2],
    [-4, 1, -1, 2],
    [-3, 1, -1, 2],
    [-2, 1, -1, 2],
    [-1, 1, -1, 2],
    [0, 1, -1, 2],
    [1, 1, -1, 2],
    [-5, 1, 0, 2],
    [-5, 1, -2, 2],
    [-4, 1, 0, 2],
    [-3, 1, 0, 2],
    [-3, 1, -2, 2],
    [-4, 1, -2, 2],
    [-2, 1, -3, 2],
    [-1, 1, -3, 2],
    [0, 1, -3, 2],
    [-2, 1, 1, 2],
    [-1, 1, 1, 2],
    [0, 1, 1, 2],
    [1, 1, -4, 2],
    [1, 1, -5, 2],
    [1, 1, -6, 2],
    [1, 1, -7, 2],
    [1, 1, -8, 2],
    [1, 1, 2, 2],
    [1, 1, 3, 2],
    [1, 1, 4, 2],
    [1, 1, 5, 2],
    [1, 1, 6, 2],
    [0, 1, 7, 2],
    [-1, 1, 7, 2],
    [0, 1, -9, 2],
    [-1, 1, -9, 2],
    [2, 1, -9, 2],
    [1, 1, -9, 2],
    [2, 1, -7, 2],
    [2, 1, -8, 2],
    [2, 1, -6, 2],
    [2, 1, -5, 2],
    [2, 1, -4, 2],
    [2, 1, 2, 2],
    [2, 1, 3, 2],
    [2, 1, 4, 2],
    [2, 1, 5, 2],
    [2, 1, 6, 2],
    [2, 1, 7, 2],
    [1, 1, 7, 2],
    [-9, 2, -1, 2],
    [-8, 2, -1, 2],
    [-7, 2, -1, 2],
    [-6, 2, -1, 2],
    [-5, 2, -1, 2],
    [-4, 2, -1, 2],
    [-3, 2, -1, 2],
    [-4, 3, -1, 2],
    [-3, 3, -1, 2],
    [-3, 2, 0, 2],
    [-3, 2, -2, 2],
    [3, 1, 0, 2],
    [3, 1, -1, 2],
    [3, 1, -2, 2],
    [4, 1, 0, 2],
    [4, 1, -1, 2],
    [4, 1, -2, 2],
    [4, 2, 0, 2],
    [4, 2, -1, 2],
    [4, 2, -2, 2],
    [4, 2, -3, 2],
    [4, 3, 0, 2],
    [4, 3, -1, 2],
    [4, 3, -2, 2],
    [4, 2, 1, 2],
    [2, 1, 1, 2],
    [2, 1, 0, 2],
    [2, 1, -1, 2],
    [2, 1, -2, 2],
    [2, 1, -3, 2],
    [1, 1, 1, 2],
    [1, 1, 0, 2],
    [1, 1, -2, 2],
    [1, 1, -3, 2],
    [0, 1, -2, 2],
    [-1, 1, -2, 2],
    [-2, 1, -2, 2],
    [-2, 1, 0, 2],
    [-1, 1, 0, 2],
    [0, 1, 0, 2],
    [-2, 2, 1, 2],
    [-1, 2, 1, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 2],
    [2, 2, 0, 2],
    [2, 2, -1, 2],
    [2, 2, -2, 2],
    [1, 2, -3, 2],
    [0, 2, -3, 2],
    [-1, 2, -3, 2],
    [-2, 2, -3, 2],
    [3, 2, 0, 2],
    [3, 2, -1, 2],
    [3, 2, -2, 2]
  ];
	var dimensions = [13,3,16]
	var size = game.cubeSize
  voxels.map(function(voxel) {

	});
	voxels.map(function(voxel) {
    game.setBlock({x: prev.x + voxel[0] * size, y: prev.y + voxel[1] * size, z: prev.z + voxel[2] * size}, 0)
  	game.setBlock({x: curr.x + voxel[0] * size, y: curr.y + voxel[1] * size, z: curr.z + voxel[2] * size}, voxel[3])
	});
}

var game = createGame({
  generate: sphereWorld,//flatWorld,
  startingPosition: [0, 1000, 0], // x, y, z
  materials: [['grass', 'dirt', 'grass_dirt'], 'brick', 'dirt', 'obsidian', 'bedrock'],
  cubeSize: 25
})

// rotate camera to look straight down
game.controls.pitchObject.rotation.x = -1.5

//game.createBlock({x:0, y:50, z:0}, 3);
//game.createBlock({x:0, y:99, z:0}, 4);

var curr = {x: 20, y: 600, z: 0}
  , prev = {x: 20, y: 600, z: 0}

setInterval(function(){
  prev.x = curr.x;
  prev.y = curr.y;
  prev.z = curr.z;

  curr.x -= 1;
  swordfishII(prev, curr);
}, 100)

    game.appendTo(this.refs.viewport);
  }
  render() {
    return (<div className="World">
      <div className="World__viewport" ref="viewport"/>
    </div>);
  }
}
