export default function walk() {
  let walkSpeed = 1.0
  let startedWalking = 0.0
  let stoppedWalking = 0.0
  let walking = false
  let acceleration = 1.0

  const ex = {};

  ex.render = function(skin){
    const time = Date.now() / 1000
    if (walking && time < startedWalking + acceleration) {
      walkSpeed = (time - startedWalking) / acceleration
    }
    if (!walking && time < stoppedWalking + acceleration) {
      walkSpeed = -1 / acceleration * (time - stoppedWalking) + 1
    }

    //skin.head.rotation.y = Math.sin(time * 1.5) / 3 * walkSpeed;
    //skin.head.rotation.z = Math.sin(time) / 2 * walkSpeed;

    skin.rightArm.rotation.z = 2 * Math.cos(0.6662 * time * 10 + Math.PI) * walkSpeed;
    //skin.rightArm.rotation.x = 1 * (Math.cos(0.2812 * time * 10) - 1) * walkSpeed;
    skin.leftArm.rotation.z = 2 * Math.cos(0.6662 * time * 10) * walkSpeed;
    //skin.leftArm.rotation.x = 1 * (Math.cos(0.2312 * time * 10) + 1) * walkSpeed;

    skin.rightLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10) * walkSpeed;
    skin.leftLeg.rotation.z = 1.4 * Math.cos(0.6662 * time * 10 + Math.PI) * walkSpeed;
  }

  ex.startWalking = function () {
    const now = Date.now() / 1000;
    walking = true;
    if (stoppedWalking + acceleration>now){
      var progress = now - stoppedWalking;
      startedWalking = now - (stoppedWalking + acceleration - now);
    } else {
      startedWalking = Date.now() / 1000;
    }
  }
  ex.stopWalking = function () {
    const now = Date.now() / 1000;
    walking = false;
    if (startedWalking + acceleration > now){
      stoppedWalking = now - (startedWalking + acceleration - now);
    } else {
      stoppedWalking = Date.now() / 1000;
    }
  }
  ex.isWalking = function () {
    return walking;
  }

  ex.setAcceleration = function (newA) {
    acceleration = newA;
  }

  return ex;
}
