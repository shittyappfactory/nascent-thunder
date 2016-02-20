var skin = require('minecraft-skin');

module.exports = function (game) {
    var mountPoint;

    return function (img, skinOpts) {
        if (!skinOpts) {
          skinOpts = {};
        }
        skinOpts.scale = skinOpts.scale || new game.THREE.Vector3(0.04, 0.04, 0.04);
        var playerSkin = skin(game.THREE, img, skinOpts);
        var player = playerSkin.mesh;
        game.scene.add(player);
        return playerSkin;
    }
};

function parseXYZ (x, y, z) {
    if (typeof x === 'object' && Array.isArray(x)) {
        return { x: x[0], y: x[1], z: x[2] };
    }
    else if (typeof x === 'object') {
        return { x: x.x || 0, y: x.y || 0, z: x.z || 0 };
    }
    return { x: Number(x), y: Number(y), z: Number(z) };
}
