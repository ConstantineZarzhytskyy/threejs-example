window.onload = init;

var scene, camera, render, earth;

function init() {
  if (!Detector.webgl) {
    var warning = Detector.getWebGLErrorMessage();
    warning.innerHTML = 'WebGL not supported';
    return document.body.appendChild(warning);
  }

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(65, window.innerWidth/window.innerHeight, 0.1, 10000);
  camera.position.set(0, 0, 1000);

  render = new THREE.WebGLRenderer();
  render.setSize(window.innerWidth, window.innerHeight);

  var geometry = new THREE.SphereGeometry(300, 100, 100);
  var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.2 });
  earth = new THREE.Mesh(geometry, material);
  earth.rotation.x +=0.1;
  earth.rotation.y +=0.1;

  scene.add(earth);

  document.body.appendChild(render.domElement);
  animate();
}

function animate() {
  earth.rotation.x += 0.01;
  earth.rotation.y += 0.02;
  earth.rotation.z += 0.03;

  requestAnimationFrame( animate );
  render.render( scene, camera );
}
