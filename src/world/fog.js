export default game => {
  const { THREE, scene } = game;
  const fog = new THREE.FogExp2(0xeeeeee, 0.0025);
  scene.fog = fog;
  return fog;
};
