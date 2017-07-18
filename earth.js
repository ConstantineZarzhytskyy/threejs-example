window.onload = init;

var scene, camera, render, arrowUp;

function init() {
  if (!Detector.webgl) {
    var warning = Detector.getWebGLErrorMessage();
    warning.innerHTML = 'WebGL not supported';
    return document.body.appendChild(warning);
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  render = new THREE.WebGLRenderer();
  render.setSize(window.innerWidth, window.innerHeight);

  var material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
  var geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
  geometry.vertices.push(new THREE.Vector3(0, 10, 0));
  geometry.vertices.push(new THREE.Vector3(10, 0, 0));

  arrowUp = new THREE.Line(geometry, material);

  scene.add(arrowUp);

  document.body.appendChild(render.domElement);
  animate();
}

function animate() {
  requestAnimationFrame( animate );
  render.render( scene, camera );
}
