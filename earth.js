window.onload = init;

var scene, camera, render, cube;

function init() {
  if (!Detector.webgl) {
    var warning = Detector.getWebGLErrorMessage();
    warning.innerHTML = 'WebGL not supported';
    return document.body.appendChild(warning);
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  render = new THREE.WebGLRenderer();
  render.setSize(window.innerWidth, window.innerHeight);

  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.2 });
  cube = new THREE.Mesh(geometry, material);
  cube.rotation.x +=0.1;
  cube.rotation.y +=0.1;

  scene.add(cube);

  document.body.appendChild(render.domElement);
  animate();
}

function animate() {
  cube.rotation.x +=0.01;
  cube.rotation.y +=0.02;
  cube.rotation.z +=0.03;

  requestAnimationFrame( animate );
  render.render( scene, camera );
}
